#include "validateUserInput.h"
#include <string>
#include <vector>
#include <algorithm>
#include <regex>

//PGAPP-20
//The function gets a string and checks if it is a valid URL
bool isURLValid(const std::string &url) {
    const size_t MAX_URL_LENGTH = 2048;
    if (url.empty() || url.length() > MAX_URL_LENGTH) {
        return false;
    }

    //forbidden chars
    for (char c : url) {
        if (c <= 0x1F || c == ' ' || c == '<' || c == '>' || c == '"' || c == '`' || c == '\\') {
            return false;
        }
    }

    std::regex urlRegex(
        R"(^(?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+(:\d+)?(\/[^\s]*)?$)",
        std::regex::icase
    );

    return std::regex_match(url, urlRegex);
}


//PGAPP-21:
//The function gets an input substring and check if it is a legal BlackList size (natural number)
bool isBLSizeValid(const std::string &input) {
    return isStringNaturalNumber(input);
}

//PGAPP-23:
//The function gets a user's choice and a valid choices vector and checks if the user's choice is valid
bool isMenuChoiceValid(const std::string &choice, const std::vector<std::string>& validChoices) {
    if(choice.empty()){
        return false;
    }
    return std::find(validChoices.begin(), validChoices.end(), choice) != validChoices.end();
}


//PGAPP-39:
// The function gets a user input that has to be in the syntax: function - space - URL and checks if it's valid
bool isChoiceSpaceURLInputValid(const std::string &input) {
    std::vector<std::string> choices = {"1", "2"}; // The possible function options - MODULARITY

    if (input.empty() || input[0] == ' ' || input[input.length()-1] == ' ') {
        return false;
    }

    // Count the number of spaces in the input
    int countSpaces = 0;
    for (char c : input) {
        if (c == ' ') {
            countSpaces++;
        }
    }

    // If there are more than one space, return false
    if (countSpaces != 1) {
        return false;
    }

    // Find the 1st space (" ")
    size_t spacePos = input.find(' ');
    
    // Split the input into 2 strings
    std::string s1 = input.substr(0, spacePos);
    std::string s2 = input.substr(spacePos + 1);

    // Check if s1 is a valid menu choice and s2 is a valid URL
    if (isMenuChoiceValid(s1, choices) == true && isURLValid(s2) == true) {
        return true;
    }

    return false;
}


//PGAPP-43:
//The function returns true if the number is natural (=1 or bigger)
bool isStringNaturalNumber(const std::string &num){
    if (num.empty() || num.find_first_not_of("0123456789") != std::string::npos) {
        return false;
    }

    //If the num starts with zero (0)
    if (num[0] == '0') {
        return false;
    }
    std::regex naturalNumberPattern(R"(^[1-9][0-9]*$)"); 
    return std::regex_match(num, naturalNumberPattern);
}