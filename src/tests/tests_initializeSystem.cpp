#include "gtest/gtest.h"
#include <vector>
using namespace std;


//PGAPP 54 (tests for PGAPP-53)
//Sanity:
TEST(createZerosIntVecTest, CorrectSize) {
    EXPECT_EQ(createZerosIntVec(5).size(), 5);
    EXPECT_EQ(createZerosIntVec(0).size(), 0);
    EXPECT_EQ(createZerosIntVec(10).size(), 10);
}
TEST(createZerosIntVecTest, InitializedWithZero) {
    vector<int> arr = createZerosIntVec(5);
    for (int i = 0; i < 5; ++i) {
        EXPECT_EQ(arr[i], 0);
    }
}
// Edge:
TEST(createZerosIntVecTest, EmptyArray) {
    vector<int> arr = createZerosIntVec(0);
    EXPECT_TRUE(arr.empty());
}
