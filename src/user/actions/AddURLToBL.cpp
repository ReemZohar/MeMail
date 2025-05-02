#include "AddURLToBL.h"

using namespace std;
namespace fs = std::filesystem;

AddURLToBL::AddURLToBL(BloomFilter& bf) : bf(bf) {}

void AddURLToBL::performAction(const IUserInput& userInput) {} //to be added

bool AddURLToBL::saveBLToFile() {
    //blacklist's string representation
    string blStr = convBLToString(), line;
    //the blacklist's line position in our file
    int blStrPos = 1;
    fstream blFile;
    vector<string> fileLines;
    
    //file path doesn't exist scenario, therefore a save can't be made
    if(!fs::exists(bf.getFilePath())) {
        return false;
    }

    //opens the file in reading mode
    blFile.open(bf.getFilePath(), ios::in);
    if(blFile.is_open()) {
        //loop pushes all the lines in the file to the fileLines vector
        while(getline(blFile, line)) {
            fileLines.push_back(line);
        }
        blFile.close();
    }

    //opens the file in writing mode
    blFile.open(bf.getFilePath(), ios::out);
    //file opened successfully scenario
    if(blFile.is_open()) {
        //loop writes all the file previous lines aside from the blacklist line, which we update to the current one.
        for(int i = 0; i < fileLines.size(); i++) {
            //line isn't the blacklist line scenario
            if (i != blStrPos) {
                blFile << fileLines.at(i) << endl;
            } else { //blacklist line scenario, we write the updated blacklist to the file
                blFile << blStr << endl;
            }
        }
        blFile.close();

        return true;
    } else { //file could not be opened scenario
        return false;
    }
}

bool AddURLToBL::saveURLToFile(const string& URL) {
    fstream file;
    
    //opens the file in appending mode
    file.open(bf.getFilePath(), ios::app);
    //file opens successfully scenario
    if(file.is_open()) {
        file << URL << endl;
        file.close();

        return true;
    } else { //file could not be opened scenario
        return false;
    }
}

string AddURLToBL::convBLToString() {
    string blStr = "", isTrue = "1", isFalse = "0";
    int blSize = getBitArrLengthFromFile(bf.getFilePath());
    vector<bool> blacklist = bf.getBlackList();

    for(int i = 0; i < blSize; i++) {
        //blacklist's ith elements is true scenario
        if(blacklist.at(i) == true) {
            blStr.append(isTrue);
        } else { //blacklist's ith element is false scenario
            blStr.append(isFalse);
        }
        if(i != blSize - 1) {
            blStr.append(" ");
        }
    }

    return blStr;
}