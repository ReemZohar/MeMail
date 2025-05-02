#include "BloomFilter.h"

using namespace std;

BloomFilter::BloomFilter(vector<bool>& blackList, const filesystem::path& filePath,
     const vector<shared_ptr<IHasher>>& hasher) :
    blackList(blackList), filePath(filePath), hasher(hasher) {}

vector<bool> BloomFilter::getBlackList() {
    return blackList;
}

filesystem::path BloomFilter::getFilePath() {
    return filePath;
}

vector <shared_ptr<IHasher>> BloomFilter::getHasher() {
    return hasher;
}

void BloomFilter::setBlackList(std::vector<bool> newBlackList){
    blackList=newBlackList;
}
