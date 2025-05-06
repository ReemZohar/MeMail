
#ifndef CHECKBLACKLISTACTION_H
#define CHECKBLACKLISTACTION_H
#include "IAction.h"
#include "userAction.h"
#include "runHashOnURL.h"
#include "BloomFilter.h"
#include "initializeBLSystem.h"
#include <string>
#include <vector>
#include <iostream>
#include <filesystem>
#include <set>
#include <stdexcept>

namespace fs = std::filesystem;

// PGAPP-89
// Implements IAction interface to check if a given URL is blacklisted
class CheckBlacklistAction : public IAction {
private:
    BloomFilter& blFilter;
    std::string checkResult;

public:
    // Constructor
    CheckBlacklistAction(BloomFilter& blFilter);

    // Overrides performAction from IAction
    void performAction(const std::shared_ptr<IUserInput>& userInput) override;
    bool isBlackListedByFile(const std::string& url);
    bool isBlackListedByInnerList(const std::string& url);
    std::string getURLFromInput(const std::string &input);

private:
    // Checks whether the given URL is blacklisted
    bool isBlackListed(const std::string& url);
};

#endif // CHECKBLACKLISTACTION_H