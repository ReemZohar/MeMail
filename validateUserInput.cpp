#include "validateUserInput.h"
#include <string>
#include <vector>
#include <algorithm>

//PGAPP-23:
//The function gets a user's choice and a valid choices vector and checks if the user's choice is valid
bool isMenuChoiceValid(const std::string &choice, const std::vector<std::string>& validChoices) {
    if(choice.empty()){
        return false;
    }
    return std::find(validChoices.begin(), validChoices.end(), choice) != validChoices.end();
}