#ifndef INITIALIZE_SYSTEM
#define INITIALIZE_SYSTEM
using namespace std;
#include <vector>
#include <string>

//PGAPP-34
vector<int> getBLFromBLFile(string fileName);
    
//PGAPP-35
vector<int> createNewBLArr(string length);

//PGAPP-53
vector<int> createZerosIntVec(int length);

//PGAPP-55
void createNewBLFile(string length);

//PGAPP-57
std::vector<int> LoadBLFromFile(const std::string& length, const fs::path& filePath);

#endif