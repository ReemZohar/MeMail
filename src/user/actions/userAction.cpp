#include "userAction.h"

using namespace std;

vector<int> convStringToArr(const string& userInput) {
    vector<int> userChoices;
    string sub;
    istringstream iss(userInput);

    while(iss >> sub) {
        userChoices.push_back(stoi(sub));
    }

    return userChoices;
}

string getURL(string actionLine) {
    int urlStartIndex = findURLStartIndex(actionLine);
    size_t urlEndIndex = actionLine.find_last_not_of(' ');
    string url;

    //loop finds the start of the url, since there could be extra spaces after the user chosen action and required space.
    while(actionLine.at(urlStartIndex) == ' ') {
        urlStartIndex++;
    }

    //save the URL into this variable using the URL start and end indices found beforehand
    url = actionLine.substr(urlStartIndex, urlEndIndex - urlStartIndex + 1);

    return url;
}

int findURLStartIndex(string actionLine) {
    int index = 0;
    bool actionFound = false;
    
    //loop iterates through characters in the action line string and breaks when it reaches the action instruction
    for(char c : actionLine) {
        //URL start found scenario
        if((c != ' ') && (actionFound == true)) {
            break;
        }
        //action instruction found scenario
        else if(c != ' ') {
            actionFound = true;
        }
        index++;
    }

    return index;
}