#ifndef ADD_URL_TO_BL
#define ADD_URL_TO_BL

#include "IAction.h"
#include <string>
#include <fstream>
#include <filesystem>
#include <vector>
#include <IUserInput.h>

namespace fs = std::filesystem;

class AddURLToBL : public IAction {
    public:
    //constructor
    AddURLToBL(const std::vector<bool>& blacklist, const fs::path& filePath);
    
    //adds a URL to the blacklist
    void performAction(const IUserInput& userInput) override;

    //updates the bloom filter file to contain the updated blacklist
    bool saveBLToFile();

    //updates the bloom filter file to contain the newly blacklisted URL
    bool saveURLToFile(std::string URL);

    private:
    const std::vector<bool> blacklist
    const fs::path filePath;
};

#endif
