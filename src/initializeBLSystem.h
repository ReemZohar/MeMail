#ifndef INITIALIZE_SYSTEM
#define INITIALIZE_SYSTEM

#include <vector>
#include <string>
#include <filesystem>
#include <set>

// PGAPP-34
std::vector<int> getBLFromBLFile(const std::filesystem::path& filePath);

// PGAPP-35
std::vector<int> createNewBLArr(const std::string& length, const std::filesystem::path& filePath);

// PGAPP-53
std::vector<int> createZerosIntVec(int length);

// PGAPP-55
void createNewBLFile(const std::string& length, const std::filesystem::path& filePath);

// PGAPP-57
std::vector<int> loadBLFromFile(const std::string& length, const std::filesystem::path& filePath);

// PGAPP-59
std::set<std::string> getBLURLsSetFromFile(const std::filesystem::path& filePath);

// PGAPP-63
int getBitArrLengthFromFile(const std::filesystem::path& filePath);

#endif