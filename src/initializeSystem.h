#ifndef INITIALIZE_SYSTEM
#define INITIALIZE_SYSTEM

#include <vector>
#include <string>
#include <filesystem>

// PGAPP-34
std::vector<int> getBLFromBLFile(const fs::path& filePath);

// PGAPP-35
std::vector<int> createNewBLArr(const std::string& length, const fs::path& filePath);

// PGAPP-53
std::vector<int> createZerosIntVec(int length);

// PGAPP-55
void createNewBLFile(const std::string& length, const fs::path& filePath);

// PGAPP-57
std::vector<int> LoadBLFromFile(const std::string& length, const fs::path& filePath);

#endif