#include "userAction.h"

using namespace std;

string firstUserSelection() {
    string userSelection;

    /*loop take a line of input representing the black list size and hash functions selected by the user,
     and iterates until the choice is valid.*/
    do {
        getline(cin, userSelection);
    } while(VALIDATE_USER_INPUT::isBLSizeSpaceHashsInputValid(userSelection) == false);

    return userSelection;
}

vector<int> convStringToArr(const string& userInput) {
    vector<int> userChoices;
    string n = "", init = "";

    /*loop iterates through all chars in the string,
     and adds each number in the string as an element in the user choices vector.*/
    for(char c : userInput) {
        //char is a number scenario
        if(c != ' ') {
            n.push_back(c);
        } else { //char is a space scenario
            //there's an element that should be added to the vector scenario
            if(n != init) {
                userChoices.push_back(stoi(n));
            }
            //resets the next element value to 0
            n = init;
        }
    }
    //user input ended without a space scenario
    if(n != init) {
        userChoices.push_back(stoi(n));
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