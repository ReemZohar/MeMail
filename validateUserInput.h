#ifndef VALIDATE_USER_INPUT
#define VALIDATE_USER_INPUT
#include <string>
#include <vector>

//PGAPP-20
bool isURLValid(const std::string& url);

//PGAPP-23
bool isMenuChoiceValid(const std::string &choice, const std::vector<std::string>& validChoices);

//PGAPP-30
bool isChoiceSpaceURLInputValid(const std::string &input);

#endif
