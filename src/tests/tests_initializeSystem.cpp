#include "gtest/gtest.h"
#include <vector>
using namespace std;


//PGAPP 54 (tests for PGAPP-53)
//Sanity:
TEST(createZerosIntArrTest, CorrectSize) {
    EXPECT_EQ(createZerosIntArr(5).size(), 5);
    EXPECT_EQ(createZerosIntArr(0).size(), 0);
    EXPECT_EQ(createZerosIntArr(10).size(), 10);
}
TEST(createZerosIntArrTest, InitializedWithZero) {
    vector<int> arr = createZerosIntArr(5);
    for (int i = 0; i < 5; ++i) {
        EXPECT_EQ(arr[i], 0);
    }
}
// Edge:
TEST(createZerosIntArrTest, EmptyArray) {
    vector<int> arr = createZerosIntArr(0);
    EXPECT_TRUE(arr.empty());
}
