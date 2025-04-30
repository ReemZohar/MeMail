#include "AddURLToBL.h"

using namespace std;

AddURLToBL::AddURLToBL(const vector<bool>& blacklist, const fs::path& filePath) :
    blacklist(blacklist), filePath(filePath) {}

void AddURLToBL::performAction(const IUserInput& userInput) {} //to be added

bool AddURLToBL::saveBLToFile() {return false;} //to be added

bool AddURLToBL::saveURLToFile(string URL) {
    fstream file;
    
    //opens the file in appending mode
    file.open(filePath, ios::app);
    //file opens successfully scenario
    if(file.is_open()) {
        file << URL << endl;
        file.close();

        return true;
    } else { //file could not be opened scenario
        return false;
    }
}