#ifndef ACTION_FACTORY
#define ACTION_FACTORY
#define ADD_URL "POST"
#define CHECK_URL "GET"
#define DEL_URL "DELETE"

#include "IAction.h"
#include "AddURLToBL.h"
#include "CheckURLInBL.h"
#include "DeleteURLFromBL.h"
#include "BadAction.h"
#include "IUserInput.h"
#include "BloomFilter.h"
#include <string>
#include "validateUserInput.h"

class ActionFactory {
    public:
    //creates an action object based on the user's input
    static std::shared_ptr<IAction> create(BloomFilter& bf, const std::shared_ptr<IUserInput>& userInput);

    private:
    //we don't want this class to have any object instances, so we set it's constructor to be private
    ActionFactory();

    //returns the action's (selected by the user) index
    static std::string getAction(const std::string& inputString);
    
};
#endif