#include "OutputToClient.h"

using namespace std;

// Constructor that sets the output message only
OutputToClient::OutputToClient(const std::string& output)
    : output(output) {}

// Constructor that sets both the output message and the client socket
OutputToClient::OutputToClient(const std::string& output, int client_socket)
    : output(output), client_socket(client_socket) {}

// Setter method to assign the client socket
void OutputToClient::setClientSocket(int socket) {
    this->client_socket = socket;
}

// Sends the output message to the client via the socket
// Returns true if the message was sent successfully
bool OutputToClient::shareOutput() {
    std::string dataToSend = output;
    if (!output.empty() && output.back() != '\n') {
        dataToSend += '\n';
    }

    size_t totalSent = 0;
    size_t dataLen = dataToSend.length();

    while (totalSent < dataLen) {
        ssize_t sent = send(client_socket, dataToSend.c_str() + totalSent, dataLen - totalSent, 0);
        if (sent <= 0) {
            return false;
        }
        totalSent += sent;
    }

    return true;
}