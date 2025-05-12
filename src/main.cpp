#include "Server.h"
#include <iostream>
#include <sstream>
#include "validateUserInput.h"

int main(int argc, char* argv[]) {
    if (argc < 3) {
        return 1;
    }
    if(){
        
    }
    // casting to number
    int port = std::stoi(argv[1]);

    // build the configuration string 
    std::ostringstream configStream;
    for (int i = 2; i < argc; ++i) {
        configStream << argv[i];
        if (i != argc - 1) configStream << " ";
    }
    std::string config = configStream.str();

    Server server(port);
    server.initializeFromString(config);  // e.g. 8 1 2

    server.run();

    return 0;
}
