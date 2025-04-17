#include <gtest/gtest.h>
#include "validateUserInput.h"
#include <string>
#include <vector>

//PGAPP-29: Tests for isMenuChoiceValid (for sprint 1 is 1/2) (PGAPP-23)
//Sanity:
TEST(choiceTest, validChoice){
    std::vector<std::string> choices = {"1", "2"};
    EXPECT_TRUE(isMenuChoiceValid("1", choices));
    EXPECT_TRUE(isMenuChoiceValid("2", choices));
}
//Negative + Egde + Boundary cases:
TEST(choiceTest, inValidChoice){
    std::vector<std::string> choices = {"1", "2"};
    EXPECT_FALSE(isMenuChoiceValid("", choices));
    EXPECT_FALSE(isMenuChoiceValid(" ", choices));
    EXPECT_FALSE(isMenuChoiceValid("12", choices));  //invalid num
    EXPECT_FALSE(isMenuChoiceValid("11111111111", choices));  //invalid num
    EXPECT_FALSE(isMenuChoiceValid("A", choices));  //invalid char
    EXPECT_FALSE(isMenuChoiceValid("a", choices)); //invalid char
    EXPECT_FALSE(isMenuChoiceValid("!", choices)); //invalid char
    EXPECT_FALSE(isMenuChoiceValid("0.1", choices)); //invalid num
    EXPECT_FALSE(isMenuChoiceValid("1.1", choices)); //invalid num
    EXPECT_FALSE(isMenuChoiceValid("-1", choices));  //invalid num
    EXPECT_FALSE(isMenuChoiceValid("0", choices));  //invalid num
    EXPECT_FALSE(isMenuChoiceValid("01", choices));  //invalid num
    EXPECT_FALSE(isMenuChoiceValid("-1111", choices));  //invalid num
    EXPECT_FALSE(isMenuChoiceValid("1.0", choices)); //float num
}