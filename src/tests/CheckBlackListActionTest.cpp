#include <gtest/gtest.h>
#include "CheckBlackListAction.h"
#include "initializeBLSystem.h"
#include "AddURLToBL.h"
#include "FirstUserInput.h"

using namespace std;
//AGAPP - 10
//Write tests for CheckBlackListAction class 
//Sanity test - should check if the black list file contains URL
TEST(CheckBlacklistActionTest, WorksWithNewBLFile) {
    //Initilize file eith 5 zero
    string testLength = "5";
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    createNewBLFile(testLength, filePath);

    //initialize HashRepeats vector 
    vector<shared_ptr<IHasher>> dummyHashFuncs;
    dummyHashFuncs.push_back(make_shared<HashRepeats>(hash<size_t>{}, 1));

    vector<bool> dummyBL = getBLFromBLFile(filePath); 
    BloomFilter bl(dummyBL,filePath,dummyHashFuncs);
    CheckBlacklistAction action(bl);

    //The file is empty so the URL is not in the black list
    EXPECT_FALSE(action.isBlackListedByFile("2 www.something.com"));
    EXPECT_FALSE(action.isBlackListedByInnerList("2 www.something.com"));


    // cleaning
    fs::remove_all(testDir);
}

//Test if the black list file contains URL after adding it to the black list
TEST(CheckBlacklistActionTest, WorksWithAddingToFile) {
    //Initilize file eith 5 zero
    string testLength = "5";
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    createNewBLFile(testLength, filePath);

    //initialize HashRepeats vector 
    vector<shared_ptr<IHasher>> dummyHashFuncs;
    dummyHashFuncs.push_back(make_shared<HashRepeats>(hash<size_t>{}, 1));

    vector<bool> dummyBL = getBLFromBLFile(filePath); 

    BloomFilter bl(dummyBL,filePath,dummyHashFuncs);
    CheckBlacklistAction action(bl);

    //The file is empty so the URL is not in the black list
    EXPECT_FALSE(action.isBlackListedByFile("2 www.something.com"));
    EXPECT_FALSE(action.isBlackListedByInnerList("2 www.something.com"));

    AddURLToBL obj1 = AddURLToBL(bl);

    FirstUserInput uinput("1 www.something.com");

    obj1.AddURLToBL::performAction(uinput);

    EXPECT_TRUE(action.isBlackListedByFile("www.something.com"));
    EXPECT_TRUE(action.isBlackListedByInnerList("www.something.com"));


    // cleaning
    fs::remove_all(testDir);
}