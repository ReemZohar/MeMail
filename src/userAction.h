#ifndef USER_ACTION
#define USER_ACTION

#include "validateUserInput.h"
#include <string>
#include <vector>
#include <iostream>

//PGAPP-65
//takes the user line of input and converts it to an integer vector
std::vector<int> convStringToArr(const std::string& userInput);

//PGAPP-70
//returns the line of input given by the user in the format: [blacklistSize] [hash1 repetitions] ... [hashN repetitions]
std::string firstUserSelection();

#endif