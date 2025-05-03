#ifndef CHECKBLACKLISTACTION_H
#define CHECKBLACKLISTACTION_H
#include "IAction.h"
#include "userAction.h"
#include "runHashOnURL.h"
#include "initializeBLSystem.h"
#include <string>
#include <vector>
#include <filesystem>
#include "../user_output/UserOutput.h"
//#include "../user_input/FirstUserInput.h"
#include "../initialization/initializeBLSystem.h"
//#include "FirstUserInput.h"

//#include "IUserInput.h"
using namespace std;
namespace fs = std::filesystem;

// PGAPP-89
// Implements IAction interface to check if a given URL is blacklisted
class CheckBlacklistAction : public IAction {
private:
    vector<HashRepeats> hashFuncs;
    int BLSize;
    vector<bool> BlkList;
    fs::path filePath;

public:
    // Constructor
    CheckBlacklistAction(vector<HashRepeats> hf, int blSize, vector<bool> bl, const fs::path& path);

    // Overrides performAction from IAction
    void performAction(const IUserInput& userInput) override;
    bool isBlackListedByFile(const std::string& url);
    bool isBlackListedByInnerList(const std::string& url);
    std::string getURLFromInput(const std::string &input);

private:
    // Checks whether the given URL is blacklisted
    bool isBlackListed(const string& url);
};

#endif // CHECKBLACKLISTACTION_H