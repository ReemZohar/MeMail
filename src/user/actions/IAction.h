#ifndef IACTION
#define IACTION

#include "IUserInput.h"

//PGAPP-88
//interface determining the neccessary methods for an action in our program
class IAction {
    public:
    //performs an action using a IUserInput object
    virtual void performAction(const IUserInput& userInput) = 0;
};
#endif