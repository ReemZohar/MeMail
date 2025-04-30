#include "BloomFilter.h"

using namespace std;

BloomFilter::BloomFilter(std::vector<bool>& blackList, const std::filesystem::path& filePath, const std::vector<IHasher> hasher) :
    blackList(blackList), filePath(filePath), hasher(hasher) {}

vector<bool> BloomFilter::getBlackList(){
    return blackList;
}

filesystem::path BloomFilter::getFilePath(){
    return filePath;
}

vector<IHasher> BloomFilter::getHasher(){
    return hasher;
}

void BloomFilter::setBlackList(const std::vector<bool>& newBlackList){
    blackList=newBlackList;
}
