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
    string url;
    istringstream iss(actionLine);

    //loop saves the last substring of the action line to the url variable
    while(iss >> url) {}

    return url;
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