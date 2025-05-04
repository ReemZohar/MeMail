#include <gtest/gtest.h>
#include "HashRepeats.h"
#include "runHashOnURL.h"
#include "IHasher.h"

using namespace std;

//PGAPP-79
//hashes a string for the passed amount of repeats
size_t hashTarget(size_t target, int repeats) {
    size_t result = target;
    string temp = to_string(result);

    for(int i = 0; i < repeats; i++) {
        temp = to_string(hash<string>{}(temp));
    }

    result = static_cast<size_t>(stoull(temp));

    return result;
}

//tests the abillity of an HashRepeats object to hash a valid URL
TEST(hashTests, hashTest) {
    string url1 = "https://example.com";
    string url2 = "https://www.alpha-beta.com/login";
    string url3 = "http://example.com/page?Search=Exam#PLE";
    string url4 = "http://example.com/page.html";

    int size1 = 2;
    int size2 = 6;
    int size3 = 1;
    int size4 = 48;

    //creating the matching HashRepeats objects
    HashRepeats obj1 = HASH_REPEATS::HashRepeats(hash<string>{}, size1);
    HashRepeats obj2 = HASH_REPEATS::HashRepeats(hash<string>{}, size2);
    HashRepeats obj3 = HASH_REPEATS::HashRepeats(hash<string>{}, size3);
    HashRepeats obj4 = HASH_REPEATS::HashRepeats(hash<string>{}, size4);

    EXPECT_EQ((obj1.hash(url1)), hashTarget(hash<string>{}(url1), size1 - 1));
    EXPECT_EQ((obj2.hash(url2)), hashTarget(hash<string>{}(url2), size2 - 1));
    EXPECT_EQ((obj3.hash(url3)), hashTarget(hash<string>{}(url3), size3 - 1));
    EXPECT_EQ((obj4.hash(url4)), hashTarget(hash<string>{}(url4), size4 - 1));
}

//PGAPP-80
//returns a vector of all hash repetitions of HashRepeats objects in the passed vector
vector<int> getRepeatCountVec(vector<shared_ptr<IHasher>> hashRepeats) {
    vector<int> repeatCountVec;

    for(int i=0;i<hashRepeats.size();i++){
        repeatCountVec.push_back(hashRepeats.at(i)->getRepeatCount());
    }

    return repeatCountVec;
}

//tests the conversion of the first valid user input into a vector of HashRepeats objects
TEST(convInputToHRVecTest, convValidInputTest) {
    string input1 = "14 5";
    string input2 = "100 1 2 3 4 5 6";
    string input3 = "10 10 10 10 10 10 10 10 10 10 10";
    string input4 = "   2 33 11 ";
    string input5 = "1   7 4  6";

    //number of hash functions for each user input
    int size1 = 1, size2 = 6, size3 = 10, size4 = 2, size5 = 3;

    //expected output doesn't include the first number since it's the desired blacklist size
    vector<int> expectedOutput1 = {5};
    vector<int> expectedOutput2 = {1, 2, 3, 4, 5, 6};
    vector<int> expectedOutput3 = {10, 10, 10, 10, 10, 10, 10, 10, 10, 10};
    vector<int> expectedOutput4 = {33, 11};
    vector<int> expectedOutput5 = {7, 4, 6};
    vector<int> realOutput1, realOutput2, realOutput3, realOutput4, realOutput5;
    vector<shared_ptr<IHasher>> v1, v2, v3, v4, v5;

    //converts the input to HashRepeats vector
    v1 = convInputToHashRepeatsVec(input1, RUN_HASH_ON_URL::createHashVec(size1));
    v2 = convInputToHashRepeatsVec(input2, RUN_HASH_ON_URL::createHashVec(size2));
    v3 = convInputToHashRepeatsVec(input3, RUN_HASH_ON_URL::createHashVec(size3));
    v4 = convInputToHashRepeatsVec(input4, RUN_HASH_ON_URL::createHashVec(size4));
    v5 = convInputToHashRepeatsVec(input5, RUN_HASH_ON_URL::createHashVec(size5));

    //vectors of repetition numbers stored within each HashRepeats vector's object
    realOutput1 = getRepeatCountVec(v1);
    realOutput2 = getRepeatCountVec(v2);
    realOutput3 = getRepeatCountVec(v3);
    realOutput4 = getRepeatCountVec(v4);
    realOutput5 = getRepeatCountVec(v5);

    EXPECT_EQ(realOutput1, expectedOutput1); //regular valid input
    EXPECT_EQ(realOutput2, expectedOutput2); //regular valid input
    EXPECT_EQ(realOutput3, expectedOutput3); //regular valid input
    EXPECT_EQ(realOutput4, expectedOutput4); //valid input with spaces
    EXPECT_EQ(realOutput5, expectedOutput5); //valid input with spaces
}