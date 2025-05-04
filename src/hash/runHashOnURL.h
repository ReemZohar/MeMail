#ifndef RUN_HASH_ON_URL
#define RUN_HASH_ON_URL

#include "HashRepeats.h"
#include "IHasher.h"
#include "userAction.h"
#include <vector>
#include <string>
#include <functional>

//PGAPP-32
//converts the first valid line of user input and a vector of hash functions to a vector of HashRepeats objects
std::vector<std::shared_ptr<IHasher>> convInputToHashRepeatsVec(const std::string& userInput,
    std::vector<std::function<std::size_t(std::size_t)>> hashFuncs);

//creates a vector of hash functions
std::vector<std::function<std::size_t(std::size_t)>> createHashVec(int size);

//PGAPP-30
//filters a URL and returns a vector containing the filtered URL
std::vector<bool> runHashOnURL(const std::string& url, const std::vector<std::shared_ptr<IHasher>>& hashRepeats, int BLSize);

#endif
