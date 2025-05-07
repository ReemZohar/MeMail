#include "DeleteURLFromBL.h"

using namespace std;

DeleteURLFromBL::DeleteURLFromBL(BloomFilter& bf) : bf(bf) {}

void DeleteURLFromBL::performAction(const shared_ptr<IUserInput>& userInput) {
    string url = getURL(userInput->getInput()), line;
    //first URL line index
    int firstURL = 2;
    fstream blFile;
    vector<string> fileLines;
    //current urls in the bloomfilter's file (no duplications)
    set<string> urls = getBLURLsSetFromFile(bf.getFilePath());

    validDel = isURLInBL(url);
    //URL doesn't exist in the bloomfilter's URL list scenario
    if(validDel == false) {
        return;
    } else { //URL exists in our bloomfilter scenario
        //we erase it from the URL set
        urls.erase(url);
    }

    //opens the file in reading mode
    blFile.open(bf.getFilePath(), ios::in);
    if(blFile.is_open()) {
        //loop pushes the length and blacklist lines of the file to the fileLines vector
        for(int i = 0; i < firstURL; i++) {
            getline(blFile, line);
            fileLines.push_back(line);
        }
        blFile.close();
    }

    //opens the file in writing mode
    blFile.open(bf.getFilePath(), ios::out);
    //file opened successfully scenario
    if(blFile.is_open()) {
        //writes the blacklist's length and the blacklist itself to the file
        for(string fileLine : fileLines) {
            blFile << fileLine << endl;
        }
        blFile.close();
    }

    //opens the file in appending mode
    blFile.open(bf.getFilePath(), ios::app);
    //file opens successfully scenario
    if(blFile.is_open()) {
        //writes all remaining urls back to the file
        for(string fileURL : urls) {
            blFile << fileURL << endl;
        }
        blFile.close();
    }    
}

shared_ptr<IUserOutput> DeleteURLFromBL::getOutput() {
    shared_ptr<IUserOutput> userOutput;
    //URL was deleted successfully scenario
    if(validDel == true) {
        message = DEL_SUCCESS_MSG;
    } else { //URL doesn't exist in the bloomfilter scenario
        message = DEL_FAIL_MSG;
    }
    userOutput = make_shared<OutputToClient>(message);

    return userOutput;
}

string DeleteURLFromBL::getMessage() {
    getOutput();
    return message;
}

bool DeleteURLFromBL::isURLInBL(string url) {
    //contains all existing urls in our bloomfilter
    set<string> urls = getBLURLsSetFromFile(bf.getFilePath());

    //1 if the URL exists in the set, 0 otherwise
    return urls.count(url);
}