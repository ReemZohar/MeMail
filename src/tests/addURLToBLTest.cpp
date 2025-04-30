#include <gtest/gtest.h>
#include <fstream>
#include <string>
#include <set>
#include <filesystem>
#include "initializeBLSystem.h"
#include "AddURLToBL.h"

using namespace std;
namespace fs = std::filesystem; 

//PGAPP-7
/*tests if saveBLToFile funciton succefully saves a blacklist to the bloom filter file when receiving a valid path,
 and does nothing if the path doesn't exist*/
TEST(saveBLToFileTest, fileExistanceTest) {
    fs::path testDir = fs::temp_directory_path() / "existing_file_test";
    fs::create_directories(testDir);
    fs::path validPath = testDir / "non_exist_file_test";
    fs::path nonExistPath = "fake_path.txt"; //non existing path
    vector<bool> blacklist = {true};
    AddURLToBL validObj = AddURLToBL(blacklist, validPath);
    AddURLToBL invalidObj = AddURLToBL(blacklist, nonExistPath);


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
    AddURLToBL obj1 = AddURLToBL(bl1, path1);
    AddURLToBL obj2 = AddURLToBL(bl2, path2);
    AddURLToBL obj3 = AddURLToBL(bl3, path3);
    
    //initializes the bloom filter files
    createNewBLFile(size1, path1);
    createNewBLFile(size2, path2);
    createNewBLFile(size3, path3);

    //files should be updated successfully
    EXPECT_TRUE(obj1.AddURLToBL::saveBLToFile());
    EXPECT_TRUE(obj2.AddURLToBL::saveBLToFile());
    EXPECT_TRUE(obj3.AddURLToBL::saveBLToFile());

    //we get the updated blacklists from the bloom filter file
    fileBL1 = getBLFromBLFile(path1);
    fileBL2 = getBLFromBLFile(path2);
    fileBL3 = getBLFromBLFile(path3);

    //blacklists from the file should be the same as the blacklists we created after the save was made
    EXPECT_EQ(fileBL1, bl1);
    EXPECT_EQ(fileBL2, bl2);
    EXPECT_EQ(fileBL3, bl3);
}

//PGAPP-100
/*tests the function abillity to successfully save a URL to the bloom filter file.
there's no need for URL validation checks since it already happens before this function is used.*/
TEST(saveURLToFileTest, saveURLToFileTest) {
    fs::path testDir = fs::temp_directory_path() / "url_file_update_test";
    fs::create_directories(testDir);
    //bloomfilter paths
    fs::path path1 = testDir / "test1";
    fs::path path2 = testDir / "test2";
    fs::path path3 = testDir / "test3";
    //URL's to be added to the files
    string url1 = "https://example.com1";
    string url2 = "https://example.com2";
    string url3 = "https://example.com3";
    string url4 = "https://example.com4";
    string url5 = "https://example.com5";
    string url6 = "https://example.com6";
    string url7 = "https://example.com7";
    //sets of the strings as they should be after the first URL addition
    set<string> firstURL1 = {"https://example.com1"};
    set<string> firstURL2 = {"https://example.com7"};
    set<string> firstURL3 = {"https://example.com2"};
    //sets of the strings that should be included in the final file of each path
    set<string> finalURL1 = {"https://example.com1", "https://example.com4"};
    set<string> finalURL3 = {"https://example.com2", "https://example.com3", "https://example.com5", "https://example.com6"};
    //sets of the bloom filter files URL's
    set<string> realFirstURL1, realFirstURL2, realFirstURL3, realFinalURL1, realFinalURL3;
    //blacklist size (only needed for object creation)
    string size = "1";
    //vector that represent a blacklist
    vector<bool> bl = {false};
    //action objects
    AddURLToBL obj1 = AddURLToBL(bl, path1);
    AddURLToBL obj2 = AddURLToBL(bl, path2);
    AddURLToBL obj3 = AddURLToBL(bl, path3);

    //initializes the bloom filter files
    createNewBLFile(size, path1);
    createNewBLFile(size, path2);
    createNewBLFile(size, path3);

    //saves 1 URL to each bloom filter file, should save successfully
    EXPECT_TRUE(obj1.AddURLToBL::saveURLToFile(url1));
    EXPECT_TRUE(obj2.AddURLToBL::saveURLToFile(url7));
    EXPECT_TRUE(obj3.AddURLToBL::saveURLToFile(url2));

    //updates the sets to contain the URL's in each file
    realFirstURL1 = getBLURLsSetFromFile(path1);
    realFirstURL2 = getBLURLsSetFromFile(path2);
    realFirstURL3 = getBLURLsSetFromFile(path3);

    //testing if the first URL addition was executed successfully
    EXPECT_EQ(realFirstURL1, firstURL1);
    EXPECT_EQ(realFirstURL2, firstURL2);
    EXPECT_EQ(realFirstURL3, firstURL3);

    //saving all remaining URL's to the files, should work successfully
    EXPECT_TRUE(obj1.AddURLToBL::saveURLToFile(url4));
    EXPECT_TRUE(obj3.AddURLToBL::saveURLToFile(url3));
    EXPECT_TRUE(obj3.AddURLToBL::saveURLToFile(url5));
    EXPECT_TRUE(obj3.AddURLToBL::saveURLToFile(url6));

    //updates the sets to contain the URL's in each file
    realFinalURL1 = getBLURLsSetFromFile(path1);
    realFinalURL3 = getBLURLsSetFromFile(path3);

    //testing if the URL additions were executed successfully
    EXPECT_EQ(realFinalURL1, finalURL1);
    EXPECT_EQ(realFinalURL3, finalURL3);
}