#include "Server.h"
#include <iostream>
#include <sstream>
#include "validateUserInput.h"

int main(int argc, char* argv[]) {
    if (argc < 3) {
        return 1;
    }
    
    std::string portStr = argv[1];
    //Validity to port
    if (!isPortValid(portStr)) {
        //Invalid port
        return 1;
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
    
        //Check validity
        if (!isBLSizeSpaceHashsInputValid(config)) {
        // "Invalid bloom filter configuration
        return 1;
    }
    Server server(port);
    server.initializeFromString(config);  // e.g. 8 1 2

    server.run();

    return 0;
}
