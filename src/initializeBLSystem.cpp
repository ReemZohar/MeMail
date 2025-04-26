#include "initializeBLSystem.h"
using namespace std;
namespace fs = std::filesystem; 

// PGAPP-34
// The function gets an existing file path and returns the BlackList from there as a boolean vector
vector<bool> getBLFromBLFile(const fs::path& filePath) {
    ifstream file(filePath);

    if (!file.is_open()) {
        cerr << "Error: Could not open file " << filePath << endl;
        return {};
    }

    vector<bool> blacklist;
    string line1, line2;
    getline(file, line1); //Skip the 1st line
    getline(file, line2); //Blacklist values

    stringstream secLine(line2);
    int value;
    while (secLine >> value) {
        if(value == 1)
        {
            blacklist.push_back(true);
        }
        else {        
            blacklist.push_back(false);
        }
    }

    return blacklist;
}


//PGAPP-35
//The function gets a length and a filepath, creates a new BL file and a new BL vector and returns it
vector<bool> createNewBLArr(const string& length, const fs::path& filePath) {
    createNewBLFile(length, filePath);
    return createFalseBoolVec(stoi(length));
}


//PGAPP-53:
//The function gets a length and create a new vector of the defined length initialized with zeros
vector<int> createZerosIntVec(int length) {
    return vector<int>(length, 0);
}


//PGAPP-55:
//The function gets a length of a new BL and a file path and creates a new file initialized with this length and a new zeros BL
void createNewBLFile(const string& length, const fs::path& filePath) {
    fs::path dataDir = filePath.parent_path();

    if (!fs::exists(dataDir)) {
        if (!fs::create_directory(dataDir)) {
            cerr << "Can't create data directory: " << dataDir << endl;
            return;
        }
    }
    bool temp = false;
    ofstream file(filePath);
    int len = stoi(length);

    if (!file) {
        cerr << "Can't create file at: " << filePath << endl;
        return;
    }

    file << length << endl;
    for (int i = 0; i < len; i++) {
        file << temp;
        if (i != len - 1) file << " ";
    }
    file << endl;
}


//PGAPP-57:
//The function gets a string and a path and load the BL fron the file accordingly. If the file doesn't exists it creates one
vector<bool> loadBLFromFile(const string& length, const fs::path& filePath) {
    if (fs::exists(filePath) && fs::is_regular_file(filePath)) {
        return getBLFromBLFile(filePath);
    }
    return createNewBLArr(length, filePath);
}


// PGAPP-59:
//The function gets a file path and returns the URLs Black List from there as a set.
std::set<string> getBLURLsSetFromFile (const fs::path& filePath){
    ifstream file(filePath);
    if (!file.is_open()) {
        cerr << "Error: Could not open file " << filePath << endl;
        return {};
    }
    set<string> URLBlackList;
    string line1, line2, urlLine;
    getline(file, line1); //Skip the 1st line
    getline(file, line2); //Skip the 2nd line
    while (getline(file, urlLine)) {
        if (!urlLine.empty()) {
            URLBlackList.insert(urlLine);
        }
    }
    return URLBlackList;
}


// PGAPP-63
//The function gets a file path and returns the bits array length (which is in the 1st line of the file)
//returns -1 if there's a problem
int getBitArrLengthFromFile(const fs::path& filePath){
    ifstream file(filePath);
    if (!file.is_open()) {
        cerr << "Error: Could not open file " << filePath << endl;
        return -1;
    }
    string line1;
    getline(file, line1); //Get the 1st line
    return stoi(line1);
}

// PGAPP-94
std::vector<bool> createFalseBoolVec(int length){
    return vector<bool>(length, false);
    }
