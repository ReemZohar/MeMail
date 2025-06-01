#include "Server.h"
#include <thread>

using namespace std;
namespace fs = std::filesystem;
int clientSocket;
std::string receivedData;

// Constructor - initializes server with given port, invalid socket, and default BloomFilter (none)
Server::Server(int port) : port(port), server_fd(-1), addrlen(sizeof(address)), bl(std::nullopt) {}

// Destructor - ensures the server socket is closed on destruction
Server::~Server() {
    closeServer();
}

// Set up the server socket, bind it to the given port, and start listening for incoming connections
bool Server::setupSocket() {
    // Create socket
    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == -1) {
        perror("Socket failed");
        return false;
    }

    address.sin_family = AF_INET;// Set address family to IPv4
    address.sin_addr.s_addr = INADDR_ANY;// Accept connections from any IP
    address.sin_port = htons(port); // Convert port number to network byte order

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        return false;
    }

    if (listen(server_fd, 3) < 0) {
        perror("Listen failed");
        return false;
    }

    return true;// Server is ready
}

// Accept a new client connection
int Server::acceptClient() {
    int client_socket = accept(server_fd, (struct sockaddr*)&address, (socklen_t*)&addrlen);
    if (client_socket < 0) {
        perror("Accept failed");
    }
    return client_socket;
}

// Initialize BloomFilter and system state from a given initialization string
void Server::initializeFromString(const std::string& inputLine) {
    vector<int> firstInputVec = USER_ACTION::convStringToArr(inputLine);

    fs::path BlFilePath = fs::path("/data") / "BLFile.txt";
    int sizeBl = firstInputVec.at(0);

    vector<bool> blackList = INITIALIZE_SYSTEM::loadBLFromFile(to_string(sizeBl), BlFilePath);

    vector<function<size_t(string)>> funcs = createHashVec(firstInputVec.size() - 1);
    vector<shared_ptr<IHasher>> hasher = convInputToHashRepeatsVec(inputLine, funcs);

    bl.emplace(blackList, BlFilePath, hasher);
}

// Handle communication with a single client (receives input, processes it, sends back response)
void Server::handleClient(int client_socket) {
    MenuChoiceInput mc;
    bool isTakenInput = mc.takeMenuChoiceFromSocket(client_socket);

    while (isTakenInput)
    {
        string inputLine = mc.getInput();
        shared_ptr<IUserInput> mci1 = make_shared<MenuChoiceInput>(inputLine);

        shared_ptr<IAction> actionObj = ActionFactory::create(*bl, mci1);

        actionObj->performAction(mci1);
        shared_ptr<IUserOutput> actionOutput = actionObj->getOutput();

       // casting to concrete object to print the action output
        auto concreteOutput = std::dynamic_pointer_cast<OutputToClient>(actionOutput);
        //check that getOutput() return OutputToClient
        if (concreteOutput) {
            concreteOutput->setClientSocket(client_socket);
            bool is_sent = concreteOutput->shareOutput();
        }
        isTakenInput = mc.takeMenuChoiceFromSocket(client_socket);
    }
    close(client_socket);
}

// Close the server socket if it's open
void Server::closeServer() {
    if (server_fd != -1) {
        close(server_fd);
        server_fd = -1;
    }
}

// Run the server: set up socket, then enter infinite loop to handle clients
void Server::run() {
    if (!setupSocket()) {
        return;
    }

    while (true) {
        int client_socket = acceptClient();
        if (client_socket >= 0) {
            std::thread(&Server::handleClient, this, client_socket).detach();
        }
    }
}