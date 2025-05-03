#include <gtest/gtest.h>
#include <string>
#include <vector>
#include <filesystem>
#include "IAction.h"
#include "AddURLToBL.h"
#include "CheckBlackListAction.h"
#include "MenuChoiceInput.h"
#include "BloomFilter.h"
#include "HashRepeats.h"
#include "ActionFactory.h"

using namespace std;
namespace fs = std::filesystem;

//PGAPP-90
/*tests Action factory's abillity to create the right action object for each possible scenario.
there's no need for invalid user input tests since it's already handled before this class usage.*/
TEST(ActionFactoryTest, objectCreationTest) {
    //valid user input strings
    string firstActionInput = "1 https://example.com"; //user has chosen to add a URL to the blacklist
    string secActionInput = "2 http://example.com/PAGE.HTML"; //user has chosen to check if a URL is blacklisted
    string className1, className2, actualClassName1, actualClassName2;
    //matching user input objects
    shared_ptr<IUserInput> mci1 = make_shared<MenuChoiceInput>(firstActionInput);
    shared_ptr<IUserInput> mci2 = make_shared<MenuChoiceInput>(secActionInput);
    shared_ptr<IAction> actionObj;
   
    //dummy bloomfilter object initiallization
    fs::path testDir = fs::temp_directory_path() / "action_factory_test";
    fs::create_directories(testDir);
    fs::path path = testDir / "bloomfilter_path";
    vector<bool> blacklist = {false};
    vector<shared_ptr<IHasher>> hashVec;
    hashVec.push_back(make_shared<HashRepeats>(hash<size_t>{}, 1));
    BloomFilter bf(blacklist, path, hashVec);
    //matching action objects
    shared_ptr<IAction> firstAction = make_shared<AddURLToBL>(bf);
    shared_ptr<IAction> secAction = make_shared<CheckBlacklistAction>(bf);

    //we use typeid to get the actual classes names
    className1 = typeid(firstAction).name();
    className2 = typeid(secAction).name();

    actionObj = ActionFactory::create(bf, mci1); //should create an AddURLToBL object
    actualClassName1 = typeid(actionObj).name();

    actionObj = ActionFactory::create(bf, mci2); //should create an CheckBlackListAction object 
    actualClassName2 = typeid(actionObj).name();

    EXPECT_EQ(className1, actualClassName1);
    EXPECT_EQ(className2, actualClassName2);
}

