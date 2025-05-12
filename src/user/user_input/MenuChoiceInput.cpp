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
    char buffer[BUFFER_LEN] = {0}; // Buffer to store incoming data from the client
    std::string userSelection;

    memset(buffer, 0, sizeof(buffer)); // Clear the buffer before reading
    int valread = read(client_socket, buffer, sizeof(buffer)); // Read data from the socket

    if (valread <= 0) {
        return false; // Connection closed or read failed
    }

    userSelection = std::string(buffer, valread); // Convert buffer to string
    currInput = userSelection; // Store the received input
    return true; // Indicate successful read
}


string MenuChoiceInput::getInput() const {
    return currInput;
}