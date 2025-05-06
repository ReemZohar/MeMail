#include <gtest/gtest.h>
#include <string>
#include <vector>
#include <filesystem>
#include "IAction.h"
#include "AddURLToBL.h"
#include "CheckURLInBL.h"
#include "BadAction.h"
#include "DeleteURLFromBL.h"
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
    string addActInput = "POST https://example.com"; //user has chosen to add a URL to the blacklist
    string checkActInput = "GET http://example.com/PAGE.HTML"; //user has chosen to check if a URL is blacklisted
    string delActInput = "DELETE ftp://ftp.example.com/file.txt";
    string badActInput1 = "abc http://example.com/PAGE.HTML";
    string badActInput2 = "1 www.example.com0";
    string className1, className2, className3, className4, className5;
    string actualClassName1, actualClassName2, actualClassName3, actualClassName4, actualClassName5;
    //matching user input objects
    shared_ptr<IUserInput> mci1 = make_shared<MenuChoiceInput>(addActInput);
    shared_ptr<IUserInput> mci2 = make_shared<MenuChoiceInput>(checkActInput);
    shared_ptr<IUserInput> mci3 = make_shared<MenuChoiceInput>(delActInput);
    shared_ptr<IUserInput> mci4 = make_shared<MenuChoiceInput>(badActInput1);
    shared_ptr<IUserInput> mci5 = make_shared<MenuChoiceInput>(badActInput2);
    shared_ptr<IAction> actionObj;
   
    //dummy bloomfilter object initiallization
    fs::path testDir = fs::temp_directory_path() / "action_factory_test";
    fs::create_directories(testDir);
    fs::path path = testDir / "bloomfilter_path";
    vector<bool> blacklist = {false};
    vector<shared_ptr<IHasher>> hashVec;
    hashVec.push_back(make_shared<HashRepeats>(hash<string>{}, 1));
    BloomFilter bf(blacklist, path, hashVec);
    //matching action objects
    shared_ptr<IAction> actionObj1 = make_shared<AddURLToBL>(bf);
    shared_ptr<IAction> actionObj2 = make_shared<CheckURLInBL>(bf);
    shared_ptr<IAction> actionObj3 = make_shared<DeleteURLFromBL>(bf);
    shared_ptr<IAction> actionObj4 = make_shared<BadAction>(bf);
    shared_ptr<IAction> actionObj5 = make_shared<BadAction>(bf);

    //we use typeid to get the actual classes names
    className1 = typeid(actionObj1).name();
    className2 = typeid(actionObj2).name();
    className3 = typeid(actionObj3).name();
    className4 = typeid(actionObj4).name();
    className5 = typeid(actionObj5).name();

    actionObj = ActionFactory::create(bf, mci1); //should create an AddURLToBL object
    actualClassName1 = typeid(actionObj).name();

    actionObj = ActionFactory::create(bf, mci2); //should create a CheckURLInBL object 
    actualClassName2 = typeid(actionObj).name();

    actionObj = ActionFactory::create(bf, mci3); //should create a DeleteURLFromBL object 
    actualClassName3 = typeid(actionObj).name();

    actionObj = ActionFactory::create(bf, mci4); //should create a BadAction object 
    actualClassName4 = typeid(actionObj).name();

    actionObj = ActionFactory::create(bf, mci5); //should create a BadAction object 
    actualClassName5 = typeid(actionObj).name();

    EXPECT_EQ(className1, actualClassName1);
    EXPECT_EQ(className2, actualClassName2);
    EXPECT_EQ(className3, actualClassName3);
    EXPECT_EQ(className4, actualClassName4);
    EXPECT_EQ(className5, actualClassName5);
}

