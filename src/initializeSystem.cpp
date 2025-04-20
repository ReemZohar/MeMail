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
    namespace fs = std::filesystem;
    fs::path dataDir = fs::current_path().parent_path() / "data";

    //If the folder 'data' doesn't exists - make it
    if (!fs::exists(dataDir)) {
        if (!fs::create_directory(dataDir)) {
            cerr << "Can't create data directory!" << endl;
            return;
        }
    }

    string path = dataDir / "BLFile.txt";
    ofstream file(path);
    int len=stoi(length);

    //If there's an error with creating the file
    if(!file){
        cerr << "Can't create a new BlackList data File in:" << path <<endl;
        return;
    }
    file << length << endl; //Write the length in the 1st line of the file

    //Writing the new BlackList array in the 2nd line of the file
    for(int i=0; i<len; i++){
        file << "0";
        if(i!=len-1){
            file << " ";
        }
    }
    file << endl; //Next line
    file.close();
}