#include "runHashOnURL.h"

using namespace std;

vector<HashRepeats> convInputToHashRepeatsVec(const string& userInput, vector<function<size_t(size_t)>>hashFuncs) {
    vector<HashRepeats> hashRepeatsVec;
    //creates a vector of all the integers in the user input
    vector<int> inputIntVec = USER_ACTION::convStringToArr(userInput);
    int skipBLSize = 1;

    //each loop iteration creates an HashRepeats object and appends it to the hashRepeats vector
    for(int i = 0; i < hashFuncs.size(); i++) {
        hashRepeatsVec.push_back(HASH_REPEATS::HashRepeats(hashFuncs.at(i), inputIntVec.at(i + skipBLSize)));
    }

    return hashRepeatsVec;
}

vector<function<size_t(size_t)>> createHashVec(int size) {
    vector<function<size_t(size_t)>> hashFuncsVec;

    //loop creates a vector of hash function in a matching order to their HashRepeats objects
    for(int i = 0; i < size; i++) {
        hashFuncsVec.push_back(hash<size_t>{});
    }

    return hashFuncsVec;
}