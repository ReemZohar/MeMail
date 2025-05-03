#include <gtest/gtest.h>
#include "CheckBlackListAction.h"
#include "CheckBlackListAction.h"
#include "initializeBLSystem.h"

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
    vector<HashRepeats> dummyHashFuncs;
    dummyHashFuncs.emplace_back(std::hash<std::size_t>{}, 1);

    vector<bool> dummyBL = getBLFromBLFile(filePath); 
    int blSize = dummyBL.size();

    CheckBlacklistAction action(dummyHashFuncs, blSize, dummyBL, filePath);

    //The file is empty so the URL is not in the black list
    EXPECT_FALSE(action.isBlackListedByFile("2 www.something.com"));
    EXPECT_FALSE(action.isBlackListedByInnerList("2 www.something.com"));


    // cleaning
    fs::remove_all(testDir);
}

//TODO: add sanity check after implementing PGAPP-2 - Add URL to Black list