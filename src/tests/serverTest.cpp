#include <gtest/gtest.h>
#include "Server.h"
#include <sys/socket.h>
#include <unistd.h>
#include <thread>
#include <string>
#include <cstring>
#include <chrono>

// Utility function to send a message to the server via socket
void sendToServer(int sock, const std::string& message) {
    send(sock, message.c_str(), message.size(), 0);
    std::this_thread::sleep_for(std::chrono::milliseconds(50)); // Allow time for processing
}

// Test: Attempt to delete a URL that doesn't exist
TEST(ServerWithThreadTest, HandleClientRespondsCorrectlyToDelete) {
    int sv[2]; // sv[0] is client, sv[1] is server
    ASSERT_EQ(socketpair(AF_UNIX, SOCK_STREAM, 0, sv), 0); // Create a connected socket pair

    Server server(9090); // Instantiate server

    std::thread serverThread([&]() {
        server.handleClient(sv[1]);  // Run server side on one end of the socket
    });

    // Simulate client sending initialization string (manual init without socket)
    server.initializeFromString("8 1 2");  
    sendToServer(sv[0], "DELETE www.example.com1\n");  // Send DELETE command

    // Read server response on client side
    char buffer[BUFFER_LEN] = {0};
    int len = read(sv[0], buffer, sizeof(buffer));

    ASSERT_GT(len, 0); // Ensure response was received
    std::string response(buffer, len);

    EXPECT_EQ(response, "404 Not Found\n"); // Expect not found message

    // Close client side to end the loop on server side
    close(sv[0]);
    serverThread.join(); // Wait for the server thread to finish
}

TEST(ServerWithThreadTest, FullScenarioWithDelete) {
    int sv[2]; // sv[0] is client, sv[1] is server
    ASSERT_EQ(socketpair(AF_UNIX, SOCK_STREAM, 0, sv), 0); // Create socket pair

    Server server(9090); // Instantiate server

    std::thread serverThread([&]() {
        server.handleClient(sv[1]);  // Run server logic
    });

    server.initializeFromString("8 1 2");  // Initialize system with given string

    // Helper function to send a message and validate the response
    auto sendAndReceive = [&](const std::string& message, const std::string& expectedResponse) {
        send(sv[0], message.c_str(), message.size(), 0); // Send message to server
        std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Wait for processing
        char buffer[BUFFER_LEN] = {0};
        int len = read(sv[0], buffer, sizeof(buffer)); // Read server response
        ASSERT_GT(len, 0); // Ensure data was received
        std::string response(buffer, len);
        EXPECT_EQ(response, expectedResponse); // Compare with expected result
    };

    // Invalid command test
    sendAndReceive("a\n", "400 Bad Request\n");

    // POST command
    sendAndReceive("POST www.example.com0\n", "201 Created\n");

    // GET command for existing URL - expecting both bloom filter and list to return true
    sendAndReceive("GET www.example.com0\n", "200 Ok\n\ntrue true\n");

    // GET command for non-existing URL - expecting false
    sendAndReceive("GET www.example.com1\n", "200 Ok\n\nfalse\n");

    // GET command where bloom filter returns true but blacklist doesn't
    sendAndReceive("GET www.example.com11\n", "200 Ok\n\ntrue false\n");

    // DELETE existing URL
    sendAndReceive("DELETE www.example.com0\n", "204 No Content\n");

    // DELETE non-existing URL
    sendAndReceive("DELETE www.example.com2\n", "404 Not Found\n");

    // Final cleanup
    close(sv[0]); // Close client socket
    serverThread.join(); // Wait for server thread
}
