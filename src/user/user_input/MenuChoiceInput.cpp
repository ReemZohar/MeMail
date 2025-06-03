#include "MenuChoiceInput.h"

using namespace std;

MenuChoiceInput::MenuChoiceInput() : currInput("") {};

MenuChoiceInput::MenuChoiceInput(const string& input) : currInput(input) {}

void MenuChoiceInput::takeInput() {
    string action;

    //loop take a line of input representing the chosen user action and iterates until the choice is valid.
    do {
        getline(cin, action);
    } while(VALIDATE_USER_INPUT::isChoiceSpaceURLInputValid(action) == false);

    currInput = action;
}

bool MenuChoiceInput::takeMenuChoiceFromSocket(int client_socket) {
    std::string request;
    char ch;
    while (true) {
        ssize_t bytesRead = read(client_socket, &ch, 1);
        if (bytesRead <= 0) {
            return false;
        }
        if (ch == '\n') break;
        if (ch != '\r') request += ch; // skip '\r' if it's \r\n
    }
    currInput = request;
    return true;
}


string MenuChoiceInput::getInput() const {
    return currInput;
}