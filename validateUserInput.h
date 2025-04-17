#ifndef VALIDATE_USER_INPUT
#define VALIDATE_USER_INPUT
#include <string>
#include <vector>

//PGAPP-23
bool isMenuChoiceValid(const std::string &choice, const std::vector<std::string>& validChoices);

#endif
