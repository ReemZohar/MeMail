#ifndef SERVER_H
#define SERVER_H

#include "IProgram.h"
#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <string.h>
#include "initializeBLSystem.h"
#include "BloomFilter.h"
#include "runHashOnURL.h"
#include <vector>
#include <functional>
#include <optional>
#include "FirstUserInput.h"
#include "userAction.h"
#include "MenuChoiceInput.h"
#include "ActionFactory.h"  
#define BUFFER_LEN 4096 

class Server : public IProgram {
    private:
     /**
     * The server's socket file descriptor used to listen for incoming connections.
     * Created using the socket() function.
     */
    int server_fd;
      /**
     * The port on which the server listens.
     * Clients must connect to this address and port to communicate with the server.
     */
    int port;
       /**
     * A data structure containing the server's IP address and port.
     * Used in functions like bind() and accept().
     */
    struct sockaddr_in address;
      /**
     * The size of the 'address' structure.
     * Required as a parameter for functions like accept().
     */
    int addrlen;
    std::optional<BloomFilter> bl;

public:
    Server(int port);
    ~Server();

    bool setupSocket();
    int acceptClient();
    void handleClient(int client_socket);
    void closeServer();
    void initializeFirstCall(int client_socket);
    void initializeFromString(const std::string& inputLine);

    void run() override; // implementing IProgram
};
#endif
