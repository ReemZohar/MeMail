#include "runHashOnURL.h"

using namespace std;

vector<shared_ptr<IHasher>> convInputToHashRepeatsVec(const string& userInput, vector<function<size_t(size_t)>>hashFuncs) {
    vector<shared_ptr<IHasher>> hashRepeatsVec;
    //creates a vector of all the integers in the user input
    vector<int> inputIntVec = USER_ACTION::convStringToArr(userInput);
    int skipBLSize = 1;

    //each loop iteration creates an HashRepeats object and appends it to the hashRepeats vector
    for(int i = 0; i < hashFuncs.size(); i++) {
        hashRepeatsVec->push_back(HashRepeats(hashFuncs.at(i), inputIntVec.at(i + skipBLSize)));
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

vector<bool> runHashOnURL(const string& url, const vector<shared_ptr<IHasher>>& hashRepeats, int BLSize) {
    vector<bool> result(BLSize, false); // Initialize the bit array to 0 using the chosen blacklist size
    int ind = 0;

    /*the loops filters the given URL. first the outer loop prepares an HashRepeats object.
    then, the inner loop repeats the current hash function as many times as defined in the HashRepeats object,
    and map it to the resuly vector using modulo of the blacklist size.*/
    for (int i = 0; i < hashRepeats.size(); i++) {
        ind = hashRepeats.at(i)->hash(url) % BLSize;
        result[ind] = true;
    }

    //a vector containing the filtered URL and 
    return result;
}
