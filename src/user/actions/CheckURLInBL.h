#ifndef CheckURLInBL_H
#define CheckURLInBL_H

#include "IAction.h"
#include "userAction.h"
#include "runHashOnURL.h"
#include "BloomFilter.h"
#include "initializeBLSystem.h"
#include "IUserOutput.h"
#include "OutputToClient.h"
#include <string>
#include <vector>
#include <iostream>
#include <filesystem>
#include <set>
#include <stdexcept>

namespace fs = std::filesystem;

// PGAPP-89
// Implements IAction interface to check if a given URL is blacklisted
class CheckURLInBL : public IAction {
private:
    BloomFilter& blFilter;
    std::string checkResult;
    std::string message = "200 Ok\n\n";

public:
    // Constructor
    CheckURLInBL(BloomFilter& blFilter);

    // Overrides performAction from IAction
    void performAction(const std::shared_ptr<IUserInput>& userInput) override;
    bool isBlackListedByFile(const std::string& url);
    bool isBlackListedByInnerList(const std::string& url);
    std::string getURLFromInput(const std::string &input);
    std::string getURLFromInputSocket(const std::string& input);
    std::shared_ptr<IUserOutput> getOutput() override;
};

#endif // CheckURLInBL_H