#include <string>

//PGAPP-83
//interface determining the neccessary methods for handling user input
class IUserInput {
    public:
    //takes input from the user
    virtual void takeInput() = 0;

    //gets the current input from the class
    virtual std::string getInput() = 0;
}