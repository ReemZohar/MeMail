#ifndef USER_ACTION
#define USER_ACTION
#define ADD_URL_TO_BL 1
#define CHECK_IF_URL_IS_BL 2

#include "validateUserInput.h"
#include <string>
#include <vector>
#include <iostream>

//PGAPP-70
//returns the line of input given by the user in the format: [blacklistSize] [hash1 repetitions] ... [hashN repetitions]
std::string firstUserSelection();

//PGAPP-16
//lets the user to select the action he'd like to perform and executes it.
void selectAction();

//performs the action selected by the user
void performAction(std::size_t action, const std::string& url);

//PGAPP-65
//takes the user line of input and converts it to an integer vector
std::vector<int> convStringToArr(const std::string& userInput);

//PGAPP-76
//saves the URL from the action input line to a string and returns it.
std::string getURL(std::string actionLine);

//finds the index of the URL start within the action line string
int findURLStartIndex(std::string actionLine);

#endif