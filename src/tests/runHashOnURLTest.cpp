#include "gtest/gtest.h"

using namespace std;

//PGAPP-79
//tests the abillity of an HashRepeats object to hash a valid URL
TEST(hashTests, hashTest) {
    string url1 = "https://example.com";
    string url2 = "https://www.alpha-beta.com/login";
    string url3 = "http://example.com/page?Search=Exam#PLE";
    string url4 = "http://example.com/page.html"

    int size1 = 2;
    int size2 = 6;
    int size3 = 1;
    int size4 = 48;

    HashRepeats obj1 = HashRepeats(&hash, size1);
    HashRepeats obj1 = HashRepeats(&hash, size2);
    HashRepeats obj1 = HashRepeats(&hash, size3);
    HashRepeats obj1 = HashRepeats(&hash, size4);

    EXPECT_EQ(obj1.hash(url1), hashTarget(hash(url1), size1 - 1))
    EXPECT_EQ(obj2.hash(url2), hashTarget(hash(url2), size2 - 1))
    EXPECT_EQ(obj3.hash(url3), hashTarget(hash(url3), size3 - 1))
    EXPECT_EQ(obj4.hash(url4), hashTarget(hash(url4), size4 - 1))
}

//hashes an integer for the passed amount of repeats
int hashTarget(int target, int repeats) {
    int result = target;

    for(int i = 0; i < repeats; i++) {
        result = hash(result);
    }

    return result;
}