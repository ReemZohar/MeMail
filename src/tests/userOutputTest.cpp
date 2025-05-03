#include "gtest/gtest.h"
#include "../user/user_output/UserOutput.h"
#include <fstream>
#include <cstdio> // for std::remove which delets the file
#include <iostream>

//Pgapp 99 - write tests for user output class
//Test to check if the file is open and the given text is witten to it
TEST(UserOutputTest, WriteToFile_CreatesFileAndWritesContent) {
    std::string testFile = "test_output.txt";
    std::string content = "Hello from test!\n";

    //run the testd function
    UserOutput::writeToFile(testFile, content);

    //check if the above text is written to the file
    std::ifstream inFile(testFile);
    ASSERT_TRUE(inFile.is_open());

    std::string fileContent;
    std::getline(inFile, fileContent);
    inFile.close();

    //compare
    EXPECT_EQ(fileContent, "Hello from test!");

    //cleaning after the test
    std::remove(testFile.c_str());
}

// Test case for the UserOutput::printToConsole method
TEST(UserOutputTest, PrintToConsole_PrintsCorrectMessage) {
    // The expected message that should be printed
    std::string expectedMessage = "Hello, Console!";

    // Capture the output sent to std::cout
    testing::internal::CaptureStdout();

    // Call the method that prints the message
    UserOutput::printToConsole(expectedMessage);

    // Retrieve the captured output
    std::string output = testing::internal::GetCapturedStdout();

    // Check if the captured output matches the expected message, including the newline
    EXPECT_EQ(output, expectedMessage + "\n");
}