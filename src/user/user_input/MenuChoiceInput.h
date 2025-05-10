#ifndef MENU_CHOICE_INPUT
#define MENU_CHOICE_INPUT
#define BUFFER_LEN 4096
#include "IUserInput.h"
#include "validateUserInput.h"
#include <string>
#include <iostream>
#include <cstring>
#include <unistd.h>
#include "OutputToClient.h"

class MenuChoiceInput : public IUserInput {
    public:
    //constructor
    MenuChoiceInput();
    
    //constructor for tests
    MenuChoiceInput(const std::string& input);

    //lets the user to select the action he'd like to perform
    void takeInput() override;

    bool takeMenuChoiceFromSocket(int client_socket);

    //class getter
    std::string getInput() const override;

    private:
    std::string currInput;
};

#endif