#include "UserOutput.h"

using namespace std;

//PGAPP-97-UserOutput-class
void UserOutput::printToConsole(const string& message) {
    cout << message;
}

void UserOutput::writeToFile(const string& filepath, const string& content) {
    ofstream outFile(filepath, std::ios::out | std::ios::app);
    if (outFile.is_open()) {
        outFile << content;
        outFile.close();
    } else {
        printToConsole("Unable to open file for writing: " + filepath);
    }
}