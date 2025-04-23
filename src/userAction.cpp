#include "userAction.h"

using namespace std;

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