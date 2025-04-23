#include <gtest/gtest.h>
#include "../HashRepeats.h"

using namespace std;

//PGAPP-79
//hashes a integer for the passed amount of repeats
size_t hashTarget(size_t target, int repeats) {
    size_t result = target;

    for(int i = 0; i < repeats; i++) {
        result = hash<size_t>{}(result);
    }

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
    HashRepeats obj1 = HASH_REPEATS::HashRepeats(hash<size_t>{}, size1);
    HashRepeats obj2 = HASH_REPEATS::HashRepeats(hash<size_t>{}, size2);
    HashRepeats obj3 = HASH_REPEATS::HashRepeats(hash<size_t>{}, size3);
    HashRepeats obj4 = HASH_REPEATS::HashRepeats(hash<size_t>{}, size4);

    EXPECT_EQ(obj1.hash(hash<string>{}(url1)), hashTarget(hash<string>{}(url1), size1 - 1));
    EXPECT_EQ(obj2.hash(hash<string>{}(url2)), hashTarget(hash<string>{}(url2), size2 - 1));
    EXPECT_EQ(obj3.hash(hash<string>{}(url3)), hashTarget(hash<string>{}(url3), size3 - 1));
    EXPECT_EQ(obj4.hash(hash<string>{}(url4)), hashTarget(hash<string>{}(url4), size4 - 1));
}