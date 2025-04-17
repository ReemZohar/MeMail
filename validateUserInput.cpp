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


//PGAPP-23:
//The function gets a user's choice and a valid choices vector and checks if the user's choice is valid
bool isMenuChoiceValid(const std::string &choice, const std::vector<std::string>& validChoices) {
    if(choice.empty()){
        return false;
    }
    return std::find(validChoices.begin(), validChoices.end(), choice) != validChoices.end();
}