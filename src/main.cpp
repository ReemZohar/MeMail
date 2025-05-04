#include <iostream>
#include "initializeBLSystem.h"
#include "FirstUserInput.h"
#include "MenuChoiceInput.h"
#include "runHashOnURL.h"
#include "BloomFilter.h"
#include "ActionFactory.h"
#include <vector>
#include "userAction.h"
#include "IHasher.h"
#include "HashRepeats.h"
using namespace std;

int main() {
    //FirstUser input for initialization
    FirstUserInput userInput; 
    userInput.takeInput();
    std::string inputLine = userInput.getInput(); 

    //initialize system
    fs::path testDir = fs::current_path() / "data";  // Use project directory + data
    fs::create_directories(testDir);                 // Create 'data' if it doesn't exist
    fs::path filePath = testDir / "BLFile.txt";      // Path to final file
      
    int sizeBl = USER_ACTION::convStringToArr(inputLine).at(0);
    std::vector<bool> blList = INITIALIZE_SYSTEM::loadBLFromFile(std::to_string(sizeBl),filePath);
    
    vector<function<size_t(size_t)>> funcs = createHashVec(sizeBl);
    vector<shared_ptr<IHasher>> hasher = convInputToHashRepeatsVec(inputLine, funcs);
 
    //Create bloomFilter object
    BloomFilter bl(blList, filePath,hasher);
    //take input from user
    MenuChoiceInput mc;

    while (true)
    {
        mc.takeInput();
        std::string inputLine = mc.getInput();
        shared_ptr<IUserInput> mci1 = make_shared<MenuChoiceInput>(inputLine);

        shared_ptr<IAction> actionObj = ActionFactory::create(bl, mci1);
        actionObj->performAction(mci1);
    }
    return 0;
}
