#include "FirstUserInput.h"

using namespace std;\

FirstUserInput::FirstUserInput() : currInput("") {};

void FirstUserInput::takeInput() {
    string userSelection;

    /*loop take a line of input representing the black list size and hash functions selected by the user,
     and iterates until the choice is valid.*/
    do {
        getline(cin, userSelection);
    } while(VALIDATE_USER_INPUT::isBLSizeSpaceHashsInputValid(userSelection) == false);

    currInput = userSelection;
}

string FirstUserInput::getInput() const {
    return currInput;
}

