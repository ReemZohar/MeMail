#include "gtest/gtest.h"
#include "initializeSystem.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <cstdio> //??
using namespace std;
namespace fs = std::filesystem; 

//PGAPP-45 (tests for PGAPP-34)
TEST(getBLFromBLFileTest, ReadsCorrectBlacklist) {
    //Get the path
    fs::path filePath = fs::current_path().parent_path() / "data" / "BLFile.txt";

    //Create the directory if it doesn't exist
    fs::create_directories(filePath.parent_path());

    //Create a test file
    ofstream testFile(filePath);
    testFile << "3\n";
    testFile << "2 45 6\n";
    testFile.close();

    vector<int> expected = {2, 45, 6};
    vector<int> result = getBLFromBLFile("BLFile.txt");

    ASSERT_EQ(result.size(), expected.size());
    for (size_t i = 0; i < expected.size(); ++i) {
        EXPECT_EQ(result[i], expected[i]);
    }

    //Clean
    remove(filePath.string().c_str());
}


//PGAPP-46 (tests for PGAPP-35)
TEST(CreateNewBLArrTest, ReturnsCorrectVectorAndCreatesFile) {
    string length = "4";
    vector<int> result = createNewBLArr(length);

    ASSERT_EQ(result.size(), 4);
    for (int val : result) {
        EXPECT_EQ(val, 0);
    }
    fs::path currentPath = fs::current_path();
    fs::path filePath = currentPath.parent_path().parent_path() / "data" / "BLFile.txt";
    ifstream file(filePath);
    ASSERT_TRUE(file.is_open());

    string firstLine;
    getline(file, firstLine);
    EXPECT_EQ(firstLine, length);

    string secondLine;
    getline(file, secondLine);
    EXPECT_EQ(secondLine, "0 0 0 0");

    file.close();

    //Clean
    fs::remove(filePath);
}

//PGAPP46 (tests for PGAPP-35)
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

    createNewBLFile(testLength);

    fs::path currentPath = fs::current_path();
    fs::path filePath = currentPath.parent_path().parent_path() / "data" / "BLFile.txt";

    ifstream file(filePath);
    ASSERT_TRUE(file.is_open()) << "Failed to open the output file.";

    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, testLength);

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

    fs::remove(filePath);
}

//Edge:
TEST(createNewBLFileTest, HandlesZeroLength) {
    string testLength = "0";

    createNewBLFile(testLength);

    fs::path currentPath = fs::current_path();
    fs::path filePath = currentPath.parent_path().parent_path() / "data" / "BLFile.txt";

    ifstream file(filePath);
    ASSERT_TRUE(file.is_open());

    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, testLength);
    EXPECT_TRUE(line2.empty());

    fs::remove(filePath);
}