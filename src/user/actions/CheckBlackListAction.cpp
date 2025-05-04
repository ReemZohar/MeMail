#include "CheckBlackListAction.h"
#include <iostream>

//Constructor for the class
CheckBlacklistAction::CheckBlacklistAction(BloomFilter& blFilter): 
blFilter(blFilter) {}

//PGAPP-8 - Check if URL is black listed
//Implement prformAction of IAction
void CheckBlacklistAction::performAction(const shared_ptr<IUserInput>& userInput) {
    const std::string &url = getURLFromInput(userInput->getInput());
    bool isBLByInnerList = isBlackListedByInnerList(url);
    if(isBLByInnerList == false) {
        UserOutput::printToConsole("false");
    }
    else{
        UserOutput::printToConsole("true");
        std::cout << " ";
        bool isBLByFile = CheckBlacklistAction::isBlackListedByFile(url);
        UserOutput::printToConsole(isBLByFile ? "true" : "false");
    }
    std::cout << endl;
}

// This function is written for use in CheckBlackListAction.
std::string CheckBlacklistAction::getURLFromInput(const std::string &input) {
    if (!isChoiceSpaceURLInputValid(input)) {
        throw std::runtime_error("Invalid input for choice-space-URL");
    }

    // Find the first space that separates the number and the URL
    size_t spacePos = input.find(' ');
    if (spacePos == std::string::npos) {
        throw std::runtime_error("Input does not contain a space separating the number and the URL.");
    }

    // Find the start of the URL part (skip any additional spaces)
    size_t urlStart = input.find_first_not_of(' ', spacePos);
    if (urlStart == std::string::npos) {
        throw std::runtime_error("No URL found after the number.");
    }

    // The URL continues until the end (trim any trailing spaces if needed)
    size_t urlEnd = input.find_last_not_of(' ');

    // Extract the URL substring
    std::string url = input.substr(urlStart, urlEnd - urlStart + 1);

    return url;
}


//Help function for performAction: check if the given URL is Black listd by the inner list  
bool CheckBlacklistAction::isBlackListedByInnerList(const string& url) {
    vector<bool> result = RUN_HASH_ON_URL::runHashOnURL(url, blFilter.getHasher(), blFilter.getBlackList().size());
    // Print the result vector
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
bool CheckBlacklistAction::isBlackListedByFile(const string& url){
    std::set<string> setOfBLURLS = getBLURLsSetFromFile(blFilter.getFilePath());
    return setOfBLURLS.find(url) != setOfBLURLS.end();
}
