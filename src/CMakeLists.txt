cmake_minimum_required(VERSION 3.14)

project(Gmail)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
# For Windows: Prevent overriding the parent project's compiler/linker settings.
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

add_executable(runTests 
  ../initialization/initializeBLSystem.cpp
  ../tests/initializeBLSystemTest.cpp
  ../validations/validateUserInput.cpp
  ../tests/validateUserInputTest.cpp
  ../tests/CheckBlackListActionTest.cpp
  ../user/actions/userAction.cpp
  ../user/user_output/UserOutput.cpp
  ../user/user_input/FirstUserInput.cpp
  ../tests/userActionTest.cpp
  ../hash/HashRepeats.cpp
  ../tests/runHashOnURLTest.cpp
  ../tests/userOutputTest.cpp
  ../hash/runHashOnURL.cpp
  ../tests/addURLToBLTest.cpp
  ../user/actions/AddURLToBL.cpp
  ../user/actions/CheckBlackListAction.cpp
  ../user/BloomFilter.cpp
) #write here the files you wish to test, the format is: <file_name>.cpp

# add_executable(runProg ) #write here the files you wish to run, the format is: <file_name>.cpp
target_include_directories(runTests
  PRIVATE
    ${PROJECT_SOURCE_DIR}/hash
    ${PROJECT_SOURCE_DIR}/initialization
    ${PROJECT_SOURCE_DIR}/user/user_input
    ${PROJECT_SOURCE_DIR}/user/user_output
    ${PROJECT_SOURCE_DIR}/user/actions
    ${PROJECT_SOURCE_DIR}/validations
    ${PROJECT_SOURCE_DIR}/user
)

target_link_libraries(runTests gtest_main)
