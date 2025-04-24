#include "MenuChoiceInput.h"

using namespace std;

MenuChoiceInput::MenuChoiceInput() : currInput("") {};

void MenuChoiceInput::takeInput() {
    string action;

    //loop take a line of input representing the chosen user action and iterates until the choice is valid.
    do {
        getline(cin, action);
    } while(VALIDATE_USER_INPUT::isChoiceSpaceURLInputValid(action) == false);

    currInput = action;
}

string MenuChoiceInput::getInput() const {
    return currInput;
}