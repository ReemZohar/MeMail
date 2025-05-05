#ifndef FIRST_USER_INPUT
#define FIRST_USER_INPUT

#include "IUserInput.h"
#include "validateUserInput.h"
#include <string>
#include <iostream>

class FirstUserInput : public IUserInput {
    public:
    //constructor
    FirstUserInput();
    FirstUserInput(const std::string& input);

    /*saves the line of input given by the user in the format:
     [blacklistSize] [hash1 repetitions] ... [hashN repetitions] to the currInput class field*/
    void takeInput() override;

    //class getter
    std::string getInput() const override;

    private:
    std::string currInput;
};

#endif
