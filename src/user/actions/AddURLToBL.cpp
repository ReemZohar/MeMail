#include "AddURLToBL.h"

using namespace std;

AddURLToBL::AddURLToBL(vector<bool>& blacklist, const fs::path& filePath) :
    blacklist(blacklist), filePath(filePath) {}

void AddURLToBL::performAction(const IUserInput& userInput) {} //to be added

bool AddURLToBL::saveBLToFile() {return false} //to be added

bool AddURLToBL::saveURLToFile(string URL) {return false} //to be added