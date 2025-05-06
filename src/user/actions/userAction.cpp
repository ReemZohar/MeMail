#include "userAction.h"

using namespace std;

vector<int> convStringToArr(const string& userInput) {
    vector<int> userChoices;
    string sub;
    istringstream iss(userInput);

    //loop separates each substring within the string, converts it to an int and pushes it as an element in the vector
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

string convBLToString(vector<bool> blacklist) {
    string blStr = "", isTrue = "1", isFalse = "0";
    int blSize = blacklist.size();

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