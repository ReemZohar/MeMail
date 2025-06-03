#ifndef DELETE_URL_FROM_BL
#define DELETE_URL_FROM_BL
#define DEL_SUCCESS_MSG "204 No Content\n"
#define DEL_FAIL_MSG "404 Not Found\n"

#include "IAction.h"
#include "IUserInput.h"
#include "IUserOutput.h"
#include "initializeBLSystem.h"
#include "BloomFilter.h"
#include "OutputToClient.h"
#include "userAction.h"
#include <string>
#include <set>
#include <fstream>

//this class is in charge of deleting a URL from the bloomfilter's URL list
class DeleteURLFromBL : public IAction {
    public:
    //constructor
    DeleteURLFromBL(BloomFilter& bf);

    //deletes a URL from the bloomfilter's URL list (if possible)
    void performAction(const std::shared_ptr<IUserInput>& userInput) override;
    //returns an IUserOutput object holding the fitting action message
    std::shared_ptr<IUserOutput> getOutput() override;
    //returns the class message (used only in the tests of the class)
    std::string getMessage();

    private:
    //class fields
    BloomFilter& bf;
    std::string message;
    bool validDel;
    std::mutex blMutex; //for locking in threads

    //returns true if a URL is in our bloomfilter's URL list and false otherwise
    bool isURLInBL(std::string url);
};

#endif