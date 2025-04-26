#include <gtest/gtest.h>
#include "../initializeBLSystem.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <cstdio>
#include <set>
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
    testFile << "1 0 1\n"; 
    testFile.close();

    vector<bool> expected = {true, false, true};
    vector<bool> result = getBLFromBLFile(filePath);

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
    vector<bool> result = createNewBLArr(length, filePath); 
    ASSERT_EQ(result.size(), 4);
    for (bool val : result) {
        EXPECT_FALSE(val); 
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
// Sanity:
TEST(loadBLFromFileTest, LoadsFromFile) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    ofstream file(filePath);
    file << "5\n";
    file << "0 0 0 0 0\n";
    file.close();

    vector<bool> result = loadBLFromFile("5", filePath);

    EXPECT_EQ(result.size(), 5);
    for (bool val : result) {
        EXPECT_FALSE(val); 
    }

    fs::remove_all(testDir);
}
TEST(loadBLFromFileTest, CreatesNewFile) {
    fs::path testDir = fs::temp_directory_path() / "test_data";
    fs::create_directories(testDir);
    fs::path filePath = testDir / "BLFile.txt";

    if (fs::exists(filePath)) fs::remove(filePath);

    vector<bool> result = loadBLFromFile("5", filePath);

    EXPECT_TRUE(fs::exists(filePath));

    ifstream file(filePath);
    string line1, line2;
    getline(file, line1);
    getline(file, line2);
    file.close();

    EXPECT_EQ(line1, "5");
    EXPECT_EQ(line2, "0 0 0 0 0");

    EXPECT_EQ(result.size(), 5);
    for (bool val : result) {
        EXPECT_FALSE(val); 
    }

    fs::remove_all(testDir);
}



//PGAPP-60 (tests for PGAPP-59)
    //Make the file
    void createTempFile(const fs::path& path, const std::vector<std::string>& lines) {
        std::ofstream file(path);
        for (const auto& line : lines) {
            file << line << "\n";
        }
        file.close();
    }
    TEST(getBLURLsSetFromFileTest, EmptyFileReturnsEmptySet) {
        fs::path path = "temp_empty.txt";
        createTempFile(path, {});  //An empty file
        auto result = getBLURLsSetFromFile (path);
        EXPECT_TRUE(result.empty());
        fs::remove(path);
    }
    TEST(getBLURLsSetFromFileTest, OnlyTwoLinesReturnsEmptySet) {
        fs::path path = "temp_two_lines.txt";
        createTempFile(path, {"header line", "another header"});
        auto result = getBLURLsSetFromFile (path);
        EXPECT_TRUE(result.empty());
        fs::remove(path);
    }
    TEST(getBLURLsSetFromFileTest, URLsParsedCorrectly) {
        fs::path path = "temp_urls.txt";
        createTempFile(path, {
            "Header1", "Header2", 
            "http://bad.com", 
            "https://evil.org", 
            "http://bad.com" //double URL
        });
        std::set<std::string> expected = {
            "http://bad.com",
            "https://evil.org"
        };
        std::set<std::string> result = getBLURLsSetFromFile (path);
        EXPECT_EQ(result, expected);
        fs::remove(path);
    }
    TEST(getBLURLsSetFromFileTest, SkipsEmptyLines) {
        fs::path path = "temp_with_empty_lines.txt";
        createTempFile(path, {
            "Header1", "Header2",
            "",
            "http://example.com",
            "",
            "http://example.org"
        });

        std::set<std::string> expected = {
            "http://example.com",
            "http://example.org"
        };
        std::set<std::string> result = getBLURLsSetFromFile (path);
        EXPECT_EQ(result, expected);
        fs::remove(path);
    }
    TEST(getBLURLsSetFromFileTest, FileNotFoundReturnsEmptySet) {
        fs::path tempPath = "non_existing_file.txt";
        std::set<std::string> result = getBLURLsSetFromFile (tempPath);
        EXPECT_TRUE(result.empty());
    }

    
//PGAPP-64(tests for PGAPP-63)
// Sanity Test: Valid file with integer length in first line
TEST(GetBitArrLengthTest, ValidFile) {
    fs::path filePath = "temp_valid.txt";
    createTempFile(filePath, {"8", "0 0 1 0 1 0 0 1"});
    EXPECT_EQ(getBitArrLengthFromFile(filePath), 8);
    fs::remove(filePath);
}
TEST(GetBitArrLengthTest, FileDoesNotExist) {
    fs::path filePath = "nonexistent.txt";
    EXPECT_EQ(getBitArrLengthFromFile(filePath), -1);
}
TEST(GetBitArrLengthTest, EmptyFile) {
    fs::path filePath = "empty.txt";
    createTempFile(filePath, {});
    EXPECT_THROW({
        getBitArrLengthFromFile(filePath);
    }, std::invalid_argument);
    fs::remove(filePath);
}


//PGAPP-95 (tests for PGAPP-94)
// Sanity:
TEST(CreateFalseBoolVecTest, CorrectSize) {
    EXPECT_EQ(createFalseBoolVec(5).size(), 5);
    EXPECT_EQ(createFalseBoolVec(0).size(), 0);
    EXPECT_EQ(createFalseBoolVec(10).size(), 10);
}
TEST(CreateFalseBoolVecTest, InitializedWithFalse) {
    vector<bool> arr = createFalseBoolVec(5);
    for (bool val : arr) {
        EXPECT_FALSE(val);
    }
}
// Edge:
TEST(CreateFalseBoolVecTest, EmptyArray) {
    vector<bool> arr = createFalseBoolVec(0);
    EXPECT_TRUE(arr.empty());
}