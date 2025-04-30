#include <gtest/gtest.h>
#include <fstream>
#include <string>
#include <filesystem>
#include "initializeBLSystem.h"

using namespace std;
namespace fs = std::filesystem; 
namespace ibls = initializeBLSystem;

//PGAPP-7
/*tests if saveBLToFile funciton succefully saves a blacklist to the bloom filter file when receiving a valid path,
 and does nothing if the path doesn't exist*/
TEST(saveBLToFileTest, fileExistanceTest) {
    fs::path testDir = fs::temp_directory_path() / "existing_file_test";
    fs::create_directories(testDir);
    fs::path validPath = testDir / "non_exist_file_test";
    fs::path nonExistPath = NULL; //non existing path
    vector<bool> blacklist = {true};
    AddURLToBL validObj = AddURLToBL::AddURLToBL(blacklist, validPath);
    AddURLToBL invalidObj = AddURLToBL::AddURLToBL(blacklist, nonExistPath);


    EXPECT_TRUE(validObj.saveBLToFile()); //should save the blacklist to the file successfully
    EXPECT_FALSE(invalidObj.saveBLToFile()); //should not save to blacklist successully since the file doesn't exist 
}

//tests that the bloom filter file contains the updated blacklist after a save was made
TEST(saveBLToFileTest, fileUpdateTest) {
    fs::path testDir = fs::temp_directory_path() / "bl_file_update_test";
    fs::create_directories(testDir);
    //bloomfilter paths
    fs::path path1 = testDir / "bl1";
    fs::path path2 = testDir / "bl2";
    fs::path path3 = testDir / "bl3";
    //blacklist sizes
    string size1 = "4", size2 = "3", size3 = "7";
    //vectors that represent a blacklist
    vector<bool> bl1 = {true, true, false ,false};
    vector<bool> bl2 = {true, true, true};
    vector<bool> bl3 = {false, false, false ,false, true, false, true};
    vector<bool> fileBL1, fileBL2, fileBL3;
    //action objects
    AddURLToBL obj1 = AddURLToBL::AddURLToBL(bl1, path1);
    AddURLToBL obj2 = AddURLToBL::AddURLToBL(bl2, path2);
    AddURLToBL obj3 = AddURLToBL::AddURLToBL(bl3, path3);
    
    //initializes the bloom filter files
    ibls::createNewBLFile(size1, path1);
    ibls::createNewBLFile(size2, path2);
    ibls::createNewBLFile(size3, path3);

    //files should be updated successfully
    EXPECT_TRUE(obj1.saveBLToFile());
    EXPECT_TRUE(obj2.saveBLToFile());
    EXPECT_TRUE(obj3.saveBLToFile());

    //we get the updated blacklists from the bloom filter file
    fileBL1 = ibls::getBLFromBLFile(path1);
    fileBL2 = ibls::getBLFromBLFile(path2);
    fileBL3 = ibls::getBLFromBLFile(path3);

    //blacklists from the file should be the same as the blacklists we created after the save was made
    EXPECT_EQUAL(fileBL1, bl1);
    EXPECT_EQUAL(fileBL2, bl2);
    EXPECT_EQUAL(fileBL3, bl3);
}