#include "CheckURLInBL.h"

using namespace std;

//Constructor for the class
CheckURLInBL::CheckURLInBL(BloomFilter& blFilter): 
blFilter(blFilter) {}

//PGAPP-8 - Check if URL is black listed
//Implement prformAction of IAction
void CheckURLInBL::performAction(const shared_ptr<IUserInput>& userInput) {
    const string &url = getURLFromInput(userInput->getInput());
    bool isBLByInnerList = isBlackListedByInnerList(url);
    if(isBLByInnerList == false) {
        checkResult.append("false");
    }
    else {
        checkResult.append("true ");
        bool isBLByFile = CheckURLInBL::isBlackListedByFile(url);
        checkResult.append(isBLByFile ? "true" : "false");
    }
    checkResult.append("\n");
}

// This function is written for use in CheckURLInBL.
string CheckURLInBL::getURLFromInput(const std::string &input) {
    string url;
    istringstream iss(input);

    if (!isChoiceSpaceURLInputValid(input)) {
        throw runtime_error("Invalid input for choice-space-URL");
    }

    while(iss >> url) {}

    return url;
}


//Help function for performAction: check if the given URL is Black listd by the inner list  
bool CheckURLInBL::isBlackListedByInnerList(const string& url) {
    vector<bool> result = RUN_HASH_ON_URL::runHashOnURL(url, blFilter.getHasher(), blFilter.getBlackList().size());
    
    for (int i = 0; i < result.size(); i++) {
        //If there turnned on bit in the result but not in the BL - it means that it is not Black listted URL
        if (result[i]==true && blFilter.getBlackList()[i]==false) {
            return false;
        }
    }
    //If all the bits are on the BL it means that the URL is in the BL. (It might be false positive, So considr check in isBlackListedByFile)
    return true;
}

//Help function for performAction: check if the given URL is Black listd by the file in which the URLS  
bool CheckURLInBL::isBlackListedByFile(const string& url){
    set<string> setOfBLURLS = getBLURLsSetFromFile(blFilter.getFilePath());
    return setOfBLURLS.find(url) != setOfBLURLS.end();
}

shared_ptr<IUserOutput> CheckURLInBL::getOutput() {
    //no check was made scenario
    if(checkResult.empty()) {
        throw runtime_error("Error: no check was made before sharing the output.\n");
    } else { //successful check scenario
        //appends the check result's string to the action message string
        message += checkResult;
    }

    //creates a shared pointer to an OutputToClient object that shares the class message
    shared_ptr<IUserOutput> userOutput = make_shared<OutputToClient>(message);

    return userOutput;
}
