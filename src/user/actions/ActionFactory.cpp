#include "ActionFactory.h"

using namespace std;

shared_ptr<IAction> ActionFactory::create(BloomFilter& bf, const shared_ptr<IUserInput>& userInput) {
    string action = ActionFactory::getAction(userInput->getInput());
    shared_ptr<IAction> actionObj;

    if(action == ADD_URL) {
        actionObj = make_shared<AddURLToBL>(bf);
    }
    else if(action == CHECK_URL) {
        actionObj = make_shared<CheckURLInBL>(bf);
    }
    else if(action == DEL_URL) {
        actionObj = make_shared<DeleteURLFromBL>(bf);
    }
    else {
        actionObj = make_shared<BadAction>();
    }

    return actionObj;
}

ActionFactory::ActionFactory() = default;

string ActionFactory::getAction(const string& inputString) {
    string action = "";
    size_t actionStart = 0, actionEnd = 0;

    //finds the index of the first action character
    actionStart = inputString.find_first_not_of(' ');
    
    //loop finds the index of the last action character
    for(size_t i = actionStart; i < inputString.length(); i++) {
        if(inputString.at(i) == ' ') {
            actionEnd = i;
            break;
        }
    }

    //appends all the action letters to the action string
    for(size_t i = actionStart; i < actionEnd; i++) {
        action.push_back(inputString.at(i));
    }

    return action;
}

