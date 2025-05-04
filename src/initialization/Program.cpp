#include "Program.h"

using namespace std;
namespace fs = std::filesystem;

void Program::run() {
    //FirstUser input for initialization
    FirstUserInput userInput; 
    userInput.takeInput();
    string inputLine = userInput.getInput(); 

    vector<int> firstInputVec = USER_ACTION::convStringToArr(inputLine);

    //initialize system
    fs::path BlFilePath = fs::path("/data") / "BLFile.txt";  //The path to the file we want to handle
    int sizeBl = firstInputVec.at(0);

    //initiializes the blacklist
    vector<bool> blackList = INITIALIZE_SYSTEM::loadBLFromFile(to_string(sizeBl),BlFilePath);

    //initializes the vector of IHasher objects
    vector<function<size_t(string)>> funcs = createHashVec(firstInputVec.size() - 1);
    vector<shared_ptr<IHasher>> hasher = convInputToHashRepeatsVec(inputLine, funcs);
 
    //Create bloomFilter object
    BloomFilter bl(blackList, BlFilePath,hasher);
    //take input from user
    MenuChoiceInput mc;

    while (true)
    {
        mc.takeInput();
        string inputLine = mc.getInput();
        shared_ptr<IUserInput> mci1 = make_shared<MenuChoiceInput>(inputLine);

        shared_ptr<IAction> actionObj = ActionFactory::create(bl, mci1);
        actionObj->performAction(mci1);
    }
}