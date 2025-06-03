#ifndef ADD_URL_TO_BL
#define ADD_URL_TO_BL

#include "IAction.h"
#include "IUserInput.h"
#include "initializeBLSystem.h"
#include "BloomFilter.h"
#include "runHashOnURL.h"
#include "userAction.h"
#include "IUserOutput.h"
#include "OutputToClient.h"
#include <fstream>
#include <string>
#include <filesystem>
#include <vector>
#include <mutex>

namespace fs = std::filesystem;

class AddURLToBL : public IAction {
    public:
    //constructor
    AddURLToBL(BloomFilter& bf);
    
    //adds a URL to the blacklist
    void performAction(const std::shared_ptr<IUserInput>& userInput) override;
    //updates the bloom filter file to contain the updated blacklist
    bool saveBLToFile();
    //updates the bloom filter file to contain the newly blacklisted URL
    bool saveURLToFile(const std::string& URL);
    //returns an IUserOutput object pointer that contains the output of the URL addition action
    std::shared_ptr<IUserOutput> getOutput() override;

    private:
    BloomFilter& bf;
    std::string message = "201 Created\n";
    std::mutex blMutex; //for locking in threads

};

#endif
