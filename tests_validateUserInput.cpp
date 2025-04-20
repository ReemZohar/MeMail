#include <gtest/gtest.h>
#include "validateUserInput.h"
#include <string>
#include <vector>

//GPAPP-25: Tests for isURLValid (GPAPP-20)
//Sanity:
TEST(URLTest, validURL){
    EXPECT_TRUE(isURLValid("https://example.com"));
    EXPECT_TRUE(isURLValid("www.example.com0"));
    EXPECT_TRUE(isURLValid("https://www.example.com"));
    EXPECT_TRUE(isURLValid("ftp://ftp.example.com/file.txt"));
    EXPECT_TRUE(isURLValid("http://www.example.com/index.html"));
    EXPECT_TRUE(isURLValid("https://example.com:1000/path?query=test#anchor"));
    EXPECT_TRUE(isURLValid("http://example.com/Page.html"));
    EXPECT_TRUE(isURLValid("http://example.com/page.html"));
    EXPECT_TRUE(isURLValid("http://example.com/PAGE.HTML"));
    EXPECT_TRUE(isURLValid("http://example.com/page?search=Exam#ple"));
    EXPECT_TRUE(isURLValid("http://example.com/page?search=exam#ple"));
    EXPECT_TRUE(isURLValid("http://example.com/page?Search=Exam#PLE"));
    // EXPECT_TRUE(isURLValid("git+ssh://www.example.com/index.html"));  //לבדוק מה תקן הURL הנדרש
}
//Negative + Egde cases:
//mention - a valid URL is in a template: "schema://[username[:password]@]server[:port]/path[?query][#anchor]"
TEST(URLTest, invalidURL){
    EXPECT_FALSE(isURLValid("")); //empty string
    EXPECT_FALSE(isURLValid("  ")); //spaces string
    EXPECT_FALSE(isURLValid("not a URL")); //just a string
    EXPECT_FALSE(isURLValid("a")); //just a char
    EXPECT_FALSE(isURLValid("http://")); //missing host
    EXPECT_FALSE(isURLValid("https://")); //missing host
    EXPECT_FALSE(isURLValid("http!://example.com")); //invalid scheme
    EXPECT_FALSE(isURLValid("http://example.com:abc")); //invalid port (not a number)
    EXPECT_FALSE(isURLValid("http://exam ple.com"));  //spaces
    EXPECT_FALSE(isURLValid("http:// example.com"));  //spaces
    EXPECT_FALSE(isURLValid("http://example .com"));  //spaces
    EXPECT_FALSE(isURLValid("ht tp://example.com"));  //spaces
    EXPECT_FALSE(isURLValid("http://example.com/<script>"));  //invalid chars
    EXPECT_FALSE(isURLValid("http://example.com/\"quote\"")); //invalid chars
    EXPECT_FALSE(isURLValid("http")); //invalid
    EXPECT_FALSE(isURLValid("http://")); //invalid
    EXPECT_FALSE(isURLValid("כתובת")); //invalid
    //EXPECT_FALSE(isURLValid("example.com"));   //missing scheme
}
//Boundary:
TEST(URLTest, MaxURLLength){
    string base = "https://example.com/path?";
    string longURL = base + string(2048 - base.length() + 1, 'a');
    EXPECT_FALSE(isURLValid(longURL));
}


//GPAPP-26: Tests for isURLValid (GPAPP-21)
//Sanity:
TEST(BLSizeTest, validBLSize){
    EXPECT_TRUE(isBLSizeValid("1"));
    EXPECT_TRUE(isBLSizeValid("8"));
    EXPECT_TRUE(isBLSizeValid("10"));
}
//Negative + Egde cases:
TEST(BLSizeTest, inValidBLSize){
    EXPECT_FALSE(isBLSizeValid(""));
    EXPECT_FALSE(isBLSizeValid(" "));
    EXPECT_FALSE(isBLSizeValid("0"));
    EXPECT_FALSE(isBLSizeValid("01"));
    EXPECT_FALSE(isBLSizeValid("-1"));
    EXPECT_FALSE(isBLSizeValid("0.1"));
    EXPECT_FALSE(isBLSizeValid("1.0"));
    EXPECT_FALSE(isBLSizeValid("a"));
    EXPECT_FALSE(isBLSizeValid("fsjk"));
    EXPECT_FALSE(isBLSizeValid("-3.6"));
    EXPECT_FALSE(isBLSizeValid("!"));
}


//PGAPP-27: Tests for isHashInputValid (PGAPP-22)
//Sanity:
TEST(hashsListTest, validHashsList){
    EXPECT_TRUE(isHashInputValid("1"));
    EXPECT_TRUE(isHashInputValid("1 2"));
    EXPECT_TRUE(isHashInputValid("1 2 3"));
    EXPECT_TRUE(isHashInputValid(" 1 2"));
    EXPECT_TRUE(isHashInputValid(" 1 2 "));
    EXPECT_TRUE(isHashInputValid(" 1  2 "));
    EXPECT_TRUE(isHashInputValid(" 1"));
}
TEST(hashsListTest, inValidHashsList){
    EXPECT_FALSE(isHashInputValid(""));
    EXPECT_FALSE(isHashInputValid(" "));
    EXPECT_FALSE(isHashInputValid("-1"));
    EXPECT_FALSE(isHashInputValid("0.5"));
    EXPECT_FALSE(isHashInputValid("a"));
    EXPECT_FALSE(isHashInputValid(" 1 2 a"));
    EXPECT_FALSE(isHashInputValid(" 1 2a"));
    EXPECT_FALSE(isHashInputValid("!"));
}

//PGAPP-29: Tests for isMenuChoiceValid (for sprint 1 it's 1/2) (PGAPP-23)
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


//PGAPP-40: Tests for isChoiceSpaceURLInputValid (GPAPP-39)
//Sanity:
TEST(secInputTest, validInput){
    EXPECT_TRUE(isChoiceSpaceURLInputValid("1 www.example.com0"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid("2 www.example.com0"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid("1 https://example.com"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid("2 https://www.example.com"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid("1 www.example.com11"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid("2 http://www.example.com/index.html"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid("1 https://example.com:1000/path?query=test#anchor"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid("2  https://www.example.com"));
    EXPECT_TRUE(isChoiceSpaceURLInputValid(" 2  https://www.example.com  "));
}
//Negative + Egde cases:
TEST(secInputTest, inValidInput){
    EXPECT_FALSE(isChoiceSpaceURLInputValid(""));
    EXPECT_FALSE(isChoiceSpaceURLInputValid(" "));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("1"));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("17"));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("173"));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("www.example.com0"));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("3 www.example.com0")); //invalid function
    EXPECT_FALSE(isChoiceSpaceURLInputValid("a www.example.com0")); //invalid function
    EXPECT_FALSE(isChoiceSpaceURLInputValid("? www.example.com0")); //invalid function
    EXPECT_FALSE(isChoiceSpaceURLInputValid("1 www.example.com0 4"));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("1 www.examp le.com0"));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("1 a")); //invalid URL
    EXPECT_FALSE(isChoiceSpaceURLInputValid("? a")); //invalid combination
    EXPECT_FALSE(isChoiceSpaceURLInputValid("2https://www.example.com"));
    EXPECT_FALSE(isChoiceSpaceURLInputValid("1www.example.com11"));
}


//PGAPP-42: Tests for isBLSizeSpaceHashsInputValid (GPAPP-41)
//Sanity:
TEST(firstInputTest, validInput){
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid("8 1 2"));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid("8 1"));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid("8 2"));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid("1 1"));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid(" 8 1 2"));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid("8 1 2 "));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid("8  1 2"));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid("8  1   2  "));
    EXPECT_TRUE(isBLSizeSpaceHashsInputValid(" 8  2 "));
}
//Negative + Egde cases:
TEST(firstInputTest, inValidInput){
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid(""));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid(" "));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("  "));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("a 1 2"));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("8 1 a"));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("8 a 1"));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("8 "));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("8  "));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid(" 8"));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("  8"));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("8 !"));
    EXPECT_FALSE(isBLSizeSpaceHashsInputValid("! 8"));
}


//PGAPP-44: Tests for isStringNaturalNumber (GPAPP-43)
//Sanity:
TEST(naturalNumberStringTest, naturalString){
    EXPECT_TRUE(isStringNaturalNumber("1"));
    EXPECT_TRUE(isStringNaturalNumber("10"));
    EXPECT_TRUE(isStringNaturalNumber("100"));
}
//Negative + edge_cases
TEST(naturalNumberStringTest, notNaturalString){
    EXPECT_FALSE(isStringNaturalNumber(""));
    EXPECT_FALSE(isStringNaturalNumber(" "));
    EXPECT_FALSE(isStringNaturalNumber("0"));
    EXPECT_FALSE(isStringNaturalNumber("01"));
    EXPECT_FALSE(isStringNaturalNumber("-1"));
    EXPECT_FALSE(isStringNaturalNumber("0.1"));
    EXPECT_FALSE(isStringNaturalNumber("1.0"));
    EXPECT_FALSE(isStringNaturalNumber("a"));
    EXPECT_FALSE(isStringNaturalNumber("א"));
    EXPECT_FALSE(isStringNaturalNumber("fsk"));
    EXPECT_FALSE(isStringNaturalNumber("-3.6"));
    EXPECT_FALSE(isStringNaturalNumber("!"));
}
