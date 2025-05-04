#include "HashRepeats.h"

using namespace std;

HashRepeats::HashRepeats(function<size_t(string)> hashFunc, int count)
        : hashFunc(hashFunc), repeatCount(count) {}

size_t HashRepeats::hash(const string& target) const {
    size_t result = std::hash<string>{}(target), skipFirstStr = 1;
    string temp = to_string(result);
    
    //loop hashes the URL (which is hashed once already) for as many times as passed by the user
    for(int i = 0; i < HashRepeats::repeatCount - skipFirstStr; i++) {
        temp = to_string(hashFunc(temp));
    }

    result = static_cast<size_t>(stoull(temp)); 

    return result;
}

int HashRepeats::getRepeatCount() const {
    return repeatCount;
}