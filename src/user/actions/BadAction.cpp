#include "BadAction.h"

using namespace std;

shared_ptr<IUserOutput> BadAction::getOutput() {
    //creates a shared pointer to an OutputToClient object that shares the class message
    shared_ptr<IUserOutput> userOutput = make_shared<OutputToClient>(message);

    return userOutput;
}

void BadAction::performAction(const shared_ptr<IUserInput>& userInput) {}