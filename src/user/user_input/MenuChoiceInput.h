#ifndef MENU_CHOICE_INPUT
#define MENU_CHOICE_INPUT

#include "IUserInput.h"
#include "validateUserInput.h"
#include <string>
#include <iostream>

class MenuChoiceInput : public IUserInput {
    //constructor
    MenuChoiceInput();
    
    //constructor for tests
    MenuChoiceInput(const std::string& input);

    //lets the user to select the action he'd like to perform
    void takeInput() override;

    //class getter
    std::string getInput() const override;

    private:
    std::string currInput;
};

#endif