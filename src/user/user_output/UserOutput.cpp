#include "UserOutput.h"
#include <iostream>
#include <fstream>

//PGAPP-97-UserOutput-class
void UserOutput::printToConsole(const std::string& message) {
    std::cout << message;
}

void UserOutput::writeToFile(const std::string& filepath, const std::string& content) {
    std::ofstream outFile(filepath, std::ios::out | std::ios::app);
    if (outFile.is_open()) {
        outFile << content;
        outFile.close();
    } else {
        printToConsole("Unable to open file for writing: " + filepath);
    }
}