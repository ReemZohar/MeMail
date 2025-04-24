#ifndef USER_ACTION
#define USER_ACTION

#include "validateUserInput.h"
#include <string>
#include <vector>

//PGAPP-65
//takes the user line of input and converts it to an integer vector
std::vector<int> convStringToArr(const std::string& userInput);

//PGAPP-76
//saves the URL from the action input line to a string and returns it.
std::string getURL(std::string actionLine);

//finds the index of the URL start within the action line string
int findURLStartIndex(std::string actionLine);

#endif