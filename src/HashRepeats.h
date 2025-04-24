#ifndef HASH_REPEATS
#define HASH_REPEATS

#include <string>
#include <functional>

class HashRepeats {
    public:
    //constructor
    HashRepeats(std::function<std::size_t(std::size_t)> hashFunc, int count);

    //getter    
    int getRepeatCount() const;

    //activates the hash function on the given string and returns the result
    std::size_t hash(const std::string& target) const;

    private:
    //class fields    
    std::function<std::size_t(std::size_t)> hashFunc; //the hash function we'll use
    int repeatCount; //how many times the hash function is repeated
};
#endif