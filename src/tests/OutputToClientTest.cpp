#include <gtest/gtest.h>
#include "OutputToClient.h"
#include <sys/socket.h>
#include <unistd.h>
#define BUFFER_LEN 4096
TEST(OutputToClientTest, SendsMessageViaSocketPair) {
    int sv[2]; //sv[0] writes, sv[1] reads
    ASSERT_EQ(socketpair(AF_UNIX, SOCK_STREAM, 0, sv), 0);

    // Create an OutputToClient object and assign it the writing socket
    OutputToClient output("Hello Test");
    output.setClientSocket(sv[0]);  //// We will write using sv[0]

    // Perform the send operation
    EXPECT_TRUE(output.shareOutput());

    // Read the message from the other end of the socket (sv[1])
    char buffer[BUFFER_LEN] = {0};
    ssize_t valread = read(sv[1], buffer, sizeof(buffer));
    ASSERT_GT(valread, 0);

    std::string received(buffer, valread);
    EXPECT_EQ(received, "Hello Test");

    close(sv[0]);
    close(sv[1]);
}

