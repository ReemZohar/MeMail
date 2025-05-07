#ifndef BAD_ACTION
#define BAD_ACTION

#include "IAction.h"
#include "IUserOutput.h"
#include "IUserInput.h"
#include "OutputToClient.h"
#include <string>

//represents bad user action in our program (invalid syntax requests)
class BadAction : public IAction {
    public:

    //returns an IUserOutput object pointer that contains the output of a user's bad action
    std::shared_ptr<IUserOutput> getOutput() override;

    private:

    //class doesn't perform any action, so the method's visibillity is set to private
    void performAction(const std::shared_ptr<IUserInput>& userInput) override;

    std::string message = "400 Bad Request\n";
};

#endif