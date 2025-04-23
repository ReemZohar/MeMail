#include <gtest/gtest.h>
#include "../userAction.h"

using namespace std;

//PGAPP 68: convStringToArr tests
/*there are string validations made before this function,
 so there's no need to test invalid strings since the string passed as an argument is always valid*/
TEST(convStringToArrTest, standardArrTest) {
    //valid vectors
    vector<int> v1 = {11, 3, 5 ,17, 91};
    vector<int> v2 = {15, 2};
    vector<int> v3 = {103, 14, 5 ,18 ,3, 7, 15};
    
    string s1 = "11 3 5 17 91";
    string s2 = "15, 2";
    string s3 = "103 14 5 18 3 7 15";
    
    EXPECT_EQ(convStringToArr(s1), v1); //regular vector test
    EXPECT_EQ(convStringToArr(s2), v2); //short vector test
    EXPECT_EQ(convStringToArr(s3), v3); //regular vector test
}

//tests the conversion of a string with more than 1 spaces between the integers to a vector
TEST(convStringToArrTest, spacesTest) {
    vector<int> vSpaces1 = {6, 11 ,4 ,401};
    vector<int> vSpaces2 = {7, 2};
    vector<int> vSpaces3 = {17, 73, 73};
    vector<int> vSpaces4 = {15, 13, 45, 8, 90, 73};
    
    string sSpaces1 = "6    11  4 401";
    string sSpaces2 = "       7 2";
    string sSpaces3 = "17 73 73        ";
    string sSpaces4 = "   15 13  45  8    90 73     ";

    EXPECT_EQ(convStringToArr(sSpaces1), vSpaces1); //string with spaces at the middle
    EXPECT_EQ(convStringToArr(sSpaces2), vSpaces2); //string with spaces at the start
    EXPECT_EQ(convStringToArr(sSpaces3), vSpaces3); //string with spaces at the end
    EXPECT_EQ(convStringToArr(sSpaces4), vSpaces4); //string with space at the start, middle and end
}

//tests the conversion to a large vector and to a vector with large values
TEST(convStringToArrTest, largeValOrArrTest) {
    vector<int> v1 = {1000000, 2000000};
    vector<int> v2 = {1234, 56, 78910, 11121314};
    vector<int> vLong;

    string s1 = "1000000 2000000";
    string s2 = "1234, 56, 78910, 11121314";
    string sLong = "";

    //sets a vector with 1000 elements valued 5 and a string with 1000 5's and spaces
    for(int i = 0; i < 1000; i++) {
        vLong.push_back(5);
        sLong.push_back('5');
        sLong.push_back(' ');
    }

    EXPECT_EQ(convStringToArr(s1), v1); //vector with large values
    EXPECT_EQ(convStringToArr(s2), v2); //vector with large values
    EXPECT_EQ(convStringToArr(sLong), vLong); //large vector
}