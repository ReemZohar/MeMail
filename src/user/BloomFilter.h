#ifndef BLOOM_FILTER_CLASS
#define BLOOM_FILTER_CLASS


#include <vector>
#include <filesystem>
#include "IHasher.h"
#include <string>


class BloomFilter {

    public:
    //Constructor
    BloomFilter(std::vector<bool>& blackList, const std::filesystem::path& filePath,
         const std::vector<std::shared_ptr<IHasher>>& hasher);


    //class getters
    std::vector<bool> getBlackList() const;
    std::filesystem::path getFilePath() const;
    std::vector<std::shared_ptr<IHasher>> getHasher() const;

    //class setters
    void setBlackList(const std::vector<bool>& newBlackList);


private:
std::vector<bool> blackList;
const std::filesystem::path filePath;
const std::vector<std::shared_ptr<IHasher>> hasher;
};

#endif