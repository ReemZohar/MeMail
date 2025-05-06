#ifndef OUTPUT_TO_CLIENT
#define OUTPUT_TO_CLIENT

#include "IUserOutput.h"
#include <string>

class OutputToClient : public IUserOutput {
    public:

    //class constructor
    OutputToClient(std::string output);

    bool shareOutput() override;

    private:

    std::string output;
};
#endif