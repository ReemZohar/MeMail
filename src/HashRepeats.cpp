#include "HashRepeats.h"

using namespace std;

HashRepeats::HashRepeats(function<size_t(size_t)> hashFunc, int count)
        : hashFunc(hashFunc), repeatCount(count) {}

int HashRepeats::getRepeatCount() const {
    return repeatCount;
}

size_t HashRepeats::hash(const string& target) const{
    size_t result = std::hash<string>{}(target), skipFirstStr = 1;
    
    //loop hashes the URL (which is hashed once already) for as many times as passed by the user
    for(int i = 0; i < HashRepeats::repeatCount - skipFirstStr; i++) {
        result = hashFunc(result);
    }

    return result;
}