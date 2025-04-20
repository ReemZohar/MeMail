#include "gtest/gtest.h"
#include "initializeSystem.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <cstdio> //??
using namespace std;
namespace fs = std::filesystem; 

//PGAPP 45 (tests for PGAPP-34)
//Sanity:
TEST(getBLFromBLFileTest, ReadsCorrectBlacklist) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    ofstream testFile(filePath);
    testFile << "3\n";
    testFile << "2 45 6\n";
    testFile.close();

    vector<int> expected = {2, 45, 6};
    vector<int> result = getBLFromBLFile(filePath);

    ASSERT_EQ(result, expected);

    fs::remove_all(testDir);
}

//PGAPP 46 (tests for PGAPP-35)
//Sanity:
TEST(CreateNewBLArrTest, ReturnsCorrectVectorAndCreatesFile) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    string length = "4";
    vector<int> result = createNewBLArr(length, filePath);

    ASSERT_EQ(result.size(), 4);
    for (int val : result) {
        EXPECT_EQ(val, 0);
    }

    ifstream file(filePath);
    ASSERT_TRUE(file.is_open());

    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, length);
    EXPECT_EQ(line2, "0 0 0 0");

    fs::remove_all(testDir);
}


//PGAPP 54 (tests for PGAPP-53)
//Sanity:
TEST(createZerosIntVecTest, CorrectSize) {
    EXPECT_EQ(createZerosIntVec(5).size(), 5);
    EXPECT_EQ(createZerosIntVec(0).size(), 0);
    EXPECT_EQ(createZerosIntVec(10).size(), 10);
}
TEST(createZerosIntVecTest, InitializedWithZero) {
    vector<int> arr = createZerosIntVec(5);
    for (int val : arr) {
        EXPECT_EQ(val, 0);
    }
}
// Edge:
TEST(createZerosIntVecTest, EmptyArray) {
    vector<int> arr = createZerosIntVec(0);
    EXPECT_TRUE(arr.empty());
}


//PGAPP-56: Tests for createNewBLFile (PGAPP-55)
//Sanity:
TEST(createNewBLFileTest, CreatesCorrectFile) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    string testLength = "8";
    createNewBLFile(testLength, filePath);

    ifstream file(filePath);
    ASSERT_TRUE(file.is_open());

    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, testLength);

    stringstream ss(line2);
    string val;
    vector<string> values;
    while (ss >> val) {
        values.push_back(val);
    }

    ASSERT_EQ(values.size(), stoi(testLength));
    for (const auto& v : values) {
        EXPECT_EQ(v, "0");
    }

    fs::remove_all(testDir);
}
//Edge:
TEST(createNewBLFileTest, HandlesZeroLength) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    string testLength = "0";
    createNewBLFile(testLength, filePath);

    ifstream file(filePath);
    ASSERT_TRUE(file.is_open());

    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, testLength);
    EXPECT_TRUE(line2.empty());

    fs::remove_all(testDir);
}


// PGAPP-58 (tests for PGAPP-57)
//Sanity:
TEST(LoadBLFromFileTest, LoadsFromFile) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    ofstream file(filePath);
    file << "5\n";
    file << "0 0 0 0 0\n";
    file.close();

    vector<int> result = LoadBLFromFile("5", filePath);

    EXPECT_EQ(result.size(), 5);
    for (int val : result) {
        EXPECT_EQ(val, 0);
    }

    fs::remove_all(testDir);
}
TEST(LoadBLFromFileTest, CreatesNewFile) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    if (fs::exists(filePath)) fs::remove(filePath);

    vector<int> result = LoadBLFromFile("5", filePath);

    EXPECT_TRUE(fs::exists(filePath));

    ifstream file(filePath);
    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, "5");
    EXPECT_EQ(line2, "0 0 0 0 0");

    EXPECT_EQ(result.size(), 5);
    for (int val : result) {
        EXPECT_EQ(val, 0);
    }

    fs::remove_all(testDir);
}