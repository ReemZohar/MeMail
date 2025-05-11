#ifndef OUTPUT_TO_CLIENT
#define OUTPUT_TO_CLIENT

#include "IUserOutput.h"
#include <string>
#include <sys/socket.h>

class OutputToClient : public IUserOutput {
    public:

    //class constructor
   OutputToClient(const std::string& output);
   void setClientSocket(int socket);

   OutputToClient(const std::string& output, int client_socket);

    bool shareOutput() override;

    private:
    std::string output;
    int client_socket = -1; //set defult value
};
#endif