#ifndef USEROUTPUT_H
#define USEROUTPUT_H

#include <string>

//PGAPP-97-UserOutput-class
class UserOutput {
public:
    static void printToConsole(const std::string& message);
    static void writeToFile(const std::string& filepath, const std::string& content);
};

#endif // USEROUTPUT_H