#include "validateUserInput.h"
#include <iostream>

using namespace std;

//PGAPP-20
//The function gets a string and checks if it is a valid URL
bool isURLValid(const string &url) {
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

    regex urlRegex(
        R"(^(?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+(:\d+)?(\/[^\s]*)?$)",
        regex::icase
    );

    return regex_match(url, urlRegex);
}

//PGAPP-21:
//The function gets an input substring and check if it is a legal BlackList size (natural number)
bool isBLSizeValid(const string &input) {
    return isStringNaturalNumber(input);
}

//PGAPP-22:
//The function gets an input substring and check if each one of the arguments is a legal hash function number (natural number)
bool isHashInputValid(const string &hashsList) {
    if(hashsList.empty()){
        return false;
    }
    istringstream iss(hashsList);
    string sub;
    bool check = false;
    while (iss >> sub) {
        check = true;
        if (!isStringNaturalNumber(sub)) {
            return false;
        }
    }

    return check;
}

//PGAPP-23:
//The function gets a user's choice and a valid choices vector and checks if the user's choice is valid
bool isMenuChoiceValid(const string &choice, const vector<string>& validChoices) {
    if(choice.empty()){
        return false;
    }
    return find(validChoices.begin(), validChoices.end(), choice) != validChoices.end();
}

//PGAPP-39:
// The function gets a user input that has to be in the syntax: function - space - URL and checks if it's valid
bool isChoiceSpaceURLInputValid(const string &input) {
    vector<string> choices = {"POST", "GET", "DELETE"};

    if (input.empty() || input.length()<2){
        return false;
    }

    size_t temp = input.find_first_not_of(' ');
    if (temp == string::npos) return false;

    size_t spacePos = input.find(' ', temp);
    if (spacePos == string::npos) return false;

    size_t choiceStart = input.find_first_not_of(' ', temp);
    size_t choiceEnd = input.find_last_not_of(' ', spacePos - 1);
    if (choiceStart == string::npos || choiceEnd == string::npos || choiceEnd < choiceStart) return false;

    string choice = input.substr(choiceStart, choiceEnd - choiceStart + 1);

    size_t urlStart = input.find_first_not_of(' ', spacePos);
    if (urlStart == string::npos) return false;

    size_t urlEnd = input.find_last_not_of(' ');
    if (urlEnd == string::npos || urlEnd < urlStart) return false;

    string url = input.substr(urlStart, urlEnd - urlStart + 1);

    return isMenuChoiceValid(choice, choices) && isURLValid(url);
}

//PGAPP-41:
//The function gets the 1st user's input and checks if it's in the right syntax: BlackList length - space - hash functions
bool isBLSizeSpaceHashsInputValid(const string &input){
    if (input.empty() || input.length()<3) {
        return false;
    }

    int countSpaces = 0;
    for (char c : input) {
        if (c == ' ') {
            countSpaces++;
        }
    }

        // Ignore spaces at the start
       size_t temp = input.find_first_not_of(' ');
       if (temp == string::npos) {
           return false;
       }
   
       size_t spacePos = input.find(' ', temp);
       if (spacePos == string::npos) {
           return false;  //If there is no space, return false
       }
   
       string s1 = input.substr(temp, spacePos - temp);
       string s2 = input.substr(spacePos + 1);
   
       if (s1.empty() || s2.empty()) {
           return false;
       }

       return isBLSizeValid(s1) && isHashInputValid(s2);
}

//PGAPP-43:
//The function returns true if the number is natural (=1 or bigger)
bool isStringNaturalNumber(const string &num){
    if (num.empty() || num.find_first_not_of("0123456789") != std::string::npos) {
        return false;
    }

    //If the num starts with zero (0)
    if (num[0] == '0') {
        return false;
    }
    regex naturalNumberPattern(R"(^[1-9][0-9]*$)"); 
    return regex_match(num, naturalNumberPattern);
}

bool isMenuChoiceValidFromSocket(const std::string &input) {
    std::string trimmedInput = input;

    // Remove newline character from the end (if present)
    if (!trimmedInput.empty() && trimmedInput.back() == '\n') {
        trimmedInput.pop_back();
    }

    size_t spacePos = trimmedInput.find(' ');
    if (spacePos == std::string::npos) {
        return false; // No space found, format is invalid
    }

    // Reject input if it contains double spaces after the command
    if (trimmedInput.find("  ", spacePos) != std::string::npos) {
        return false;
    }

    std::string command = trimmedInput.substr(0, spacePos); // Extract command part
    std::string url = trimmedInput.substr(spacePos + 1);    // Extract URL part

    if (url.empty()) {
        return false; // URL is missing
    }

    // Return true only if command is valid and URL passes validation
    return (
        (command == "POST" || command == "GET" || command == "DELETE") &&
        isURLValid(url)
    );
}




//PGAPP-140:
//The function returns true if the strings contains a valid strings in the syntax: IP-space-port
bool isIPSpacePortInputValid(const std::string& input) {
    if (input.empty()) return false;

    // Find the first non-space character
    size_t first = input.find_first_not_of(' ');
    if (first == std::string::npos) return false;

    // Find the last non-space character
    size_t last = input.find_last_not_of(' ');
    if (last == std::string::npos || last < first) return false;

    // Trim the string
    std::string trimmed = input.substr(first, last - first + 1);

    // Find the first space that separates IP and port
    size_t spacePos = trimmed.find(' ');
    if (spacePos == std::string::npos) return false;

    // Extract IP and port, trimming inner spaces
    std::string ip = trimmed.substr(0, spacePos);
    std::string port = trimmed.substr(spacePos + 1);

    // Trim any spaces around port
    size_t portFirst = port.find_first_not_of(' ');
    size_t portLast = port.find_last_not_of(' ');
    if (portFirst == std::string::npos || portLast == std::string::npos) return false;
    port = port.substr(portFirst, portLast - portFirst + 1);

    // Ensure no extra tokens except the IP and the port
    if (port.find(' ') != std::string::npos) return false;

    return isIPv4Valid(ip) && isPortValid(port);
}

//The function checks if a string is a valid IP adress in version 4
bool isIPv4Valid(const std::string& ip) {
    std::istringstream ss(ip);
    std::string token;
    int count = 0;
    if (ip.empty())
        return false;

    while (std::getline(ss, token, '.')) {
        if (++count > 4) return false;

        //Token should not be empty and should not have leading zeros (except "0")
        if (token.empty() || (token.size() > 1 && token[0] == '0')) return false;

        //Token must be all digits
        for (char ch : token) {
            if (!std::isdigit(ch)) return false;
        }

        //Convert to integer and check range
        try {
            int num = std::stoi(token);
            if (num < 0 || num > 255) return false;
        } catch (...) {
            return false;
        }
    }
    return count == 4;
}

//The function checks if a string is a valid port number(in range 0-65,535)
bool isPortValid(const std::string& port) {
    if (port.empty()) return false;

    //Check that all characters are digits
    for (char ch : port) {
        if (!std::isdigit(ch)) return false;
    }

    //Convert string to integer and check range
    try {
        size_t idx = 0;
        int num = std::stoi(port, &idx);

        //Ensure the entire string was converted
        if (idx != port.size()) return false;

        return num >= 0 && num <= 65535;
    } catch (...) {
        return false;
    }
}