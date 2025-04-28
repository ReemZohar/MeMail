#ifndef INITIALIZE_SYSTEM
#define INITIALIZE_SYSTEM

#include <vector>
#include <string>
#include <filesystem>
#include <set>
#include <iostream>
#include <fstream>

// PGAPP-34
// The function gets an existing file path and returns the BlackList from there as a vector
std::vector<int> getBLFromBLFile(const std::filesystem::path& filePath);

// PGAPP-35
//The function gets a length and a filepath, creates a new BL file and a new BL vector and returns it
std::vector<int> createNewBLArr(const std::string& length, const std::filesystem::path& filePath);

// PGAPP-53
//The function gets a length and create a new vector of the defined length initialized with zeros
std::vector<int> createZerosIntVec(int length);

// PGAPP-55
//The function gets a length of a new BL and a file path and creates a new file initialized with this length and a new zeros BL
void createNewBLFile(const std::string& length, const std::filesystem::path& filePath);

// PGAPP-57
//The function gets a string and a path and load the BL fron the file accordingly. If the file doesn't exists it creates one
std::vector<int> loadBLFromFile(const std::string& length, const std::filesystem::path& filePath);

// PGAPP-59
//The function gets a file path and returns the URLs Black List from there as a set.
std::set<std::string> getBLURLsSetFromFile(const std::filesystem::path& filePath);

// PGAPP-63
//The function gets a file path and returns the bits array length (which is in the 1st line of the file)
//returns -1 if there's a problem
int getBitArrLengthFromFile(const std::filesystem::path& filePath);

#endif