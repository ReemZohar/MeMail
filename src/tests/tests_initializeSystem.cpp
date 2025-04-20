#include "gtest/gtest.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <vector>
#include <cstdio> //??
using namespace std;


//PGAPP 54 (tests for PGAPP-53)
//Sanity:
TEST(createZerosIntVecTest, CorrectSize) {
    EXPECT_EQ(createZerosIntVec(5).size(), 5);
    EXPECT_EQ(createZerosIntVec(0).size(), 0);
    EXPECT_EQ(createZerosIntVec(10).size(), 10);
}
TEST(createZerosIntVecTest, InitializedWithZero) {
    vector<int> arr = createZerosIntVec(5);
    for (int i = 0; i < 5; ++i) {
        EXPECT_EQ(arr[i], 0);
    }
}
// Edge:
TEST(createZerosIntVecTest, EmptyArray) {
    vector<int> arr = createZerosIntVec(0);
    EXPECT_TRUE(arr.empty());
}


//GPAPP-56: Tests for createNewBLFile (GPAPP-55)
//Sanity:
TEST(createNewBLFileTest, CreatesCorrectFile) {
    string testLength = "8";
    string expectedPath = "../data/BLFile.txt";

    // Run the function
    createNewBLFile(testLength);

    // Check if the file exists and can be opened
    ifstream file(expectedPath);
    ASSERT_TRUE(file.is_open()) << "Failed to open the output file.";

    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    //First line should match the input length
    EXPECT_EQ(line1, testLength);

    //Second line should contain '0' separated by spaces
    stringstream st(line2);
    vector<string> values;
    string temp;
    while (st >> temp) {
        values.push_back(temp);
    }

    ASSERT_EQ(values.size(), stoi(testLength));
    for (const auto& val : values) {
        EXPECT_EQ(val, "0");
    }

    //Clean
    remove(expectedPath.c_str());
}
//Edge:
TEST(createNewBLFileTest, HandlesZeroLength) {
    string testLength = "0";
    string expectedPath = "../data/BLFile.txt";

    createNewBLFile(testLength);

    ifstream file(expectedPath);
    ASSERT_TRUE(file.is_open());

    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, testLength);
    EXPECT_TRUE(line2.empty());

    remove(expectedPath.c_str());
}