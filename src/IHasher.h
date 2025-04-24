#include <string>

//PGAPP-84
//interface determining the neccessary methods for hashing a url
class IHasher {
    public:
    //hashes a string
    virtual std::size_t hash(const std::string& url) = 0;
};