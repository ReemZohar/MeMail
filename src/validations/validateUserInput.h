#ifndef VALIDATE_USER_INPUT
#define VALIDATE_USER_INPUT

#include <string>
#include <vector>
#include <algorithm>
#include <regex>
#include <sstream>
#include <cctype>

//PGAPP-20
//The function gets a string and checks if it is a valid URL
bool isURLValid(const std::string& url);

//PGAPP-21
//The function gets an input substring and check if it is a legal BlackList size (natural number)
bool isBLSizeValid(const std::string &input);

//PGAPP-22
//The function gets an input substring and check if each one of the arguments is a legal hash function number (natural number)
bool isHashInputValid(const std::string &hashsList);

//PGAPP-23
//The function gets a user's choice and a valid choices vector and checks if the user's choice is valid
bool isMenuChoiceValid(const std::string &choice, const std::vector<std::string>& validChoices);

//PGAPP-30
// The function gets a user input that has to be in the syntax: function - space - URL and checks if it's valid
bool isChoiceSpaceURLInputValid(const std::string &input);

//PGAPP-41
//The function gets the 1st user's input and checks if it's in the right syntax: BlackList length - space - hash functions
bool isBLSizeSpaceHashsInputValid(const std::string &input);

//PGAPP-43
//The function returns true if the number is natural (=1 or bigger)
bool isStringNaturalNumber(const std::string &num);

//PGAPP-140
//The function returns true if the strings contains a valid strings in the syntax: IP-space-port
bool isIPSpacePortInputValid(const std::string &input);
//The function checks if a string is a valid IP adress in version 4
bool isIPv4Valid(const std::string& ip);
//The function checks if a string is a valid port number(in range 0-65,535)
bool isPortValid(const std::string& port);

//PGAPP-140
//The function returns true if the strings contains a valid strings in the syntax: IP-space-port
bool isIPSpacePortInputValid(const std::string &input);
//The function checks if a string is a valid IP adress in version 4
bool isIPv4Valid(const std::string& ip);
//The function checks if a string is a valid port number(in range 0-65,535)
bool isPortValid(const std::string& port);

//help function to check if the format of the user input in the menu is valid - through the socket
bool isMenuChoiceValidFromSocket(const std::string &input);
#endif
