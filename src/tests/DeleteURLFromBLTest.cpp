#include <gtest/gtest.h>
#include <string>
#include <vector>
#include <filesystem>
#include <set>
#include "DeleteURLFromBL.h"
#include "BloomFilter.h"
#include "initializeBLSystem.h"
#include "ActionFactory.h"
#include "IAction.h"
#include "IHasher.h"
#include "HashRepeats.h"
#include "MenuChoiceInput.h"
#include "IUserInput.h"

namespace fs = std::filesystem;
namespace af = ActionFactory;
using namespace std;

//creates a valid bloomfilter object that will be passed as an argument to the action objects
Bloomfilter initBf(string testName) {
    fs::path testDir = fs::temp_directory_path() / "delete_url_from_bl_test";
    fs::create_directories(testDir);
    fs::path validPath = testDir / testName;
    vector<bool> blacklist = {false, false, false, false, false, false, false, false};
    string size = "8"; //blacklist's size
    vector<shared_ptr<IHasher>> hashVec;
    hashVec.push_back(make_shared<HashRepeats>(hash<string>{}, 3));
}

//returns a shared pointer vector to valid user input objects
vector<shared_ptr<IUserInput>> createUserInputs() {
    //valid URL's
    string url1 = "http://example.com/page?search=Exam#ple";
    string url2 = "http://example.com/page.html";
    string url3 = "https://www.example.com";
    //valid addition commands
    string command1 = "1 http://example.com/page?search=Exam#ple";
    string command2 = "1 http://example.com/page.html";
    string command3 = "1 https://www.example.com";
    //matching input objects vector
    vector<shared_ptr<IUserInput>> userInputs = {make_shared<MenuChoiceInput>(command1), make_shared<MenuChoiceInput>(command2),
         make_shared<MenuChoiceInput>(command3)};

    return userInputs;     
}

//returns a vector that consists of elements that can add a valid URL to the bloomfilter
vector<shared_ptr<IAction>> addToBL(BloomFilter& bf) {
    vector<shared_ptr<IUserInput>> userInputs = createUserInputs();
    vector<shared_ptr<IAction>> additions;

    //creates a fitting action object for each user input and adds it to the actions vector
    for(shared_ptr<IUserInput> input : userInputs) {
        additions.push_back(af.create(input));
    }

    return additions;
}

//PGAPP-109
//tests the class abillity to successully delete an existing URL from the bloomfilter's file
TEST(DeleteURLFromBLTest, validDeletion) {
    int firstURLInd = 0, secURLInd = 1, thirdURLInd = 2, numAdditions = 7;
    //creates a bloomfilter for the test
    BloomFilter bf = initBf("valid_deletion");
    vector<shared_ptr<IUserInput>> userInputs = createUserInputs();
    vector<shared_ptr<IAction>> additions = addToBL(bf);
    DeleteURLFromBL del1 = DeleteURLFromBL(bf);
    DeleteURLFromBL del2 = DeleteURLFromBL(bf);
    DeleteURLFromBL del3 = DeleteURLFromBL(bf);
    fs::path bfPath = bf.getPath();
    //expected URL's in the bloomfilter's file after deletion
    set<string> expected1 = {};
    set<string> expected2 = {"http://example.com/page?search=Exam#ple", "https://www.example.com"};
    set<string> expected3 = {"https://www.example.com"};
    string expectedMsg = "204 No Content\n";
    vector<bool> originalBL = bf.getBlackList();

    //adds valid URL's to the blacklist
    additions.at(firstURLInd).performAction(userInputs.at(firstURLInd));
    //deletes it
    del1.performAction(userInputs.at(firstURLInd));
    //bloomfilter's file URL set should be empty
    EXPECT_EQ(getBLURLsSetFromFile(bfPath), expected1);
    //blacklist should remain unchanged
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);

    //adds the same URL multiple times to the bloomfilter
    for(int i = 0; i < numAdditions; i++) {
        additions.at(firstURLInd).performAction(userInputs.at(firstURLInd));
    }
    //deletes it
    del1.performAction(userInputs.at(firstURLInd));
    //bloomfilter's file URL set should be empty
    EXPECT_EQ(getBLURLsSetFromFile(bfPath), expected1);
    //blacklist should remain unchanged
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);

    //adds URL's to the bloomfilter
    additions.at(secURLInd).performAction(userInputs.at(secURLInd));
    additions.at(firstURLInd).performAction(userInputs.at(firstURLInd));
    additions.at(thirdURLInd).performAction(userInputs.at(thirdURLInd));
    additions.at(secURLInd).performAction(userInputs.at(secURLInd));
    additions.at(firstURLInd).performAction(userInputs.at(firstURLInd));
    additions.at(thirdURLInd).performAction(userInputs.at(thirdURLInd));

    //deletes the second URL
    del2.performAction(userInputs.at(secURLInd));
    //bloomfilter's URL set should not contain the second URL, but contain the first and the third
    EXPECT_EQ(getBLURLsSetFromFile(bfPath), expected2);
    //blacklist should remain unchanged
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);

    //deletes the third URL
    del3.performAction(userInputs.at(thirdURLInd));
    //bloomfilter's URL set should not contain the second and third URL's, only the first
    EXPECT_EQ(getBLURLsSetFromFile(bfPath), expected3);
    //blacklist should remain unchanged
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);

    //deletes the first URL
    del1.performAction(userInputs.at(firstURLInd));
    //bloomfilter's URL set should be empty
    EXPECT_EQ(getBLURLsSetFromFile(bfPath), expected1);
    //blacklist should remain unchanged
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);

    //tests the class messages, all should be the same since the deletion is valid
    EXPECT_EQ(del1.getMessage(), expectedMsg);
    EXPECT_EQ(del2.getMessage(), expectedMsg);
    EXPECT_EQ(del3.getMessage(), expectedMsg);
}

/*tests the class abillity to display the right message when the user tries to delete a valid URL,
but that URL doesn't exist in the bloomfilter*/
TEST(DeleteURLFromBLTest, invalidDeletion) {
    int firstURLInd = 0, secURLInd = 1;
    //creates a bloomfilter for the test
    BloomFilter bf = initBf("invalid_deletion");
    vector<shared_ptr<IUserInput>> userInputs = createUserInputs();
    vector<shared_ptr<IAction>> additions = addToBL(bf);
    string expectedMsg = "404 Not Found\n";
    DeleteURLFromBL del1 = DeleteURLFromBL(bf);
    DeleteURLFromBL del2 = DeleteURLFromBL(bf);
    fs::path bfPath = bf.getPath();
    vector<bool> originalBL = bf.getBlackList();
    set<string> expected1 = {"http://example.com/page.html"};
    set<string> expected2 = {};

    //trying to delete a URL from an empty bloomfilter test
    del2.performAction(userInputs.at(secURLInd));
    EXPECT_EQ(del2.getMessage(), expectedMsg);
    //blacklist should stay the same
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);

    //adds valid URL's to the blacklist
    additions.at(secURLInd).performAction(userInputs.at(secURLInd));
    //tries to delete the first URL (which isn't in the bloomfilter)
    del1.performAction(userInputs.at(firstURLInd));
    //URL set should only contain the second URL
    EXPECT_EQ(getBLURLsSetFromFile(bfPath), expected1);
    EXPECT_EQ(del1.getMessage(), expectedMsg);
    //blacklist should stay the same
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);

    //deleting twice should always be invalid, since the first deletion deletes all occurences
    del2.performAction(userInputs.at(secURLInd));
    del2.performAction(userInputs.at(secURLInd));
    //URL set should be empty
    EXPECT_EQ(getBLURLsSetFromFile(bfPath), expected2);
    EXPECT_EQ(del2.getMessage(), expectedMsg);
    //blacklist should stay the same
    EXPECT_EQ(getBLFromBLFile(bfPath), originalBL);
}
