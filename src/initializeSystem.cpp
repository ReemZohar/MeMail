#include "initializeSystem.h"
using namespace std;
#include <vector>
#include <string>
#include <iostream>
#include <fstream>
#include <filesystem>

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