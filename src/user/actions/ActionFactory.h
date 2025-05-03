#ifndef ACTION_FACTORY
#define ACTION_FACTORY
#define ADD_URL "1"
#define CHECK_URL "2"

#include "IAction.h"
#include "AddURLToBL.h"
#include "CheckBlackListAction.h"
#include "IUserInput.h"
#include "BloomFilter.h"
#include <string>
#include <stdexcept>

class ActionFactory {
    public:
    //creates an action object based on the user's input
    static shared_ptr<IAction> create(BloomFilter& bf, const shared_ptr<IUserInput>& userInput);

    private:
    //we don't want this class to have any object instances, so we set it's constructor to be private
    ActionFactory();

    //returns the action's (selected by the user) index
    static std::string getAction(const std::string& inputString);
    
};
#endif