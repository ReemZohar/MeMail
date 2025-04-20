#include "initializeSystem.h"
using namespace std;
#include <vector>
#include <string>
#include <iostream>
#include <fstream>
#include <filesystem>

// PGAPP-34
// The function gets an existing file name and returns the BlackList from there as a vector
vector<int> getBLFromBLFile(string fileName) {
    fs::path currentPath = fs::current_path();
    fs::path dataDir = currentPath.parent_path().parent_path() / "data"; 

    string path = (dataDir / fileName).string();
    ifstream file(path);

    // If the file couldn't open return an empty vector
    if (!file.is_open()) {
        cerr << "Error: Could not open file " << path << endl;
        return {};
    }

    vector<int> blacklist;
    string line1, line2;
    getline(file, line1); //Skip the 1st line
    getline(file, line2); //Get the BlackList

    stringstream secLine(line2);
    int value;
    while (secLine >> value) {
        blacklist.push_back(value);
    }

    file.close();
    return blacklist;
}


//PGAPP-35
//The function gets a length and crear=te
vector<int> createNewBLArr(string length) {
    int len=stoi(length);
    createNewBLFile(length);
   return createZerosIntVec(len);
}


//PGAPP-53:
//The function gets a length and create a new vector of the defined length initialized with zeros
vector<int> createZerosIntVec(int length) {
    return vector<int>(length, 0);
}


//PGAPP-55:
//The function gets a length of a new BL and creates a new file initialized with this length and a new zeros BL
void createNewBLFile(string length) {
    fs::path currentPath = fs::current_path();
    fs::path projectRoot = currentPath.parent_path().parent_path();
    fs::path dataDir = projectRoot / "data";
    
    if (!fs::exists(dataDir)) {
        if (!fs::create_directory(dataDir)) {
            cerr << "Can't create data directory!" << endl;
            return;
        }
    }

    string path = dataDir / "BLFile.txt";
    ofstream file(path);
    int len = stoi(length);
    if (!file) {
        cerr << "Can't create a new BlackList data File in:" << path << endl;
        return;
    }

    file << length << endl;

    for (int i = 0; i < len; i++) {
        file << "0";
        if (i != len - 1) {
            file << " ";
        }
    }
    file << endl;
    file.close();
}


//PGAPP-57:
//The function gets a string and a path and load the BL fron the file accordingly. If the file doesn't exists it creates one
vector<int> LoadBLFromFile(const string& length, const fs::path& filePath) {
    if (fs::exists(filePath) && fs::is_regular_file(filePath)) {
        return getBLFromBLFile(filePath);
    }
    return createNewBLArr(length, filePath);
}