#ifndef HASH_REPEATS
#define HASH_REPEATS

#include <string>
#include <functional>
#include "IHasher.h"

class HashRepeats : public IHasher {
    public:
    //constructor
    HashRepeats(std::function<std::size_t(std::string)> hashFunc, int count);

    //activates the hash function on the given string and returns the result
    std::size_t hash(const std::string& target) const override;

    //class getter
    int getRepeatCount() const override;

    private:
    //class fields    
    std::function<std::size_t(std::string)> hashFunc; //the hash function we'll use
    int repeatCount; //how many times the hash function is repeated
};
#endif