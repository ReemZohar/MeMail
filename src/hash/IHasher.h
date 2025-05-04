#ifndef IHASHER
#define IHASHER

#include <string>

//PGAPP-84
//interface determining the neccessary methods for hashing a url
class IHasher {
    public:
    //hashes a string
    virtual std::size_t hash(const std::string& target) const = 0;
    //returns the number associated with the IHasher object
    virtual int getRepeatCount() const = 0;
};
#endif