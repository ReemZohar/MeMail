#ifndef IACTION
#define IACTION

#include "IUserInput.h"
#include "IUserOutput.h"
#include <memory>

//PGAPP-88
//interface determining the neccessary methods for an action in our program
class IAction {
    public:
    
    //performs an action using a IUserInput object
    virtual void performAction(const std::shared_ptr<IUserInput>& userInput) = 0;

    //returns an IUserOutput object pointer that represents the current action's output
    virtual std::shared_ptr<IUserOutput> getOutput() = 0;
};

#endif