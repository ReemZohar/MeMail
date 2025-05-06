#ifndef OUTPUT_TO_CLIENT
#define OUTPUT_TO_CLIENT

#include "IUserOutput.h"

class OutputToClient : public IUserOutput {
    public:

    bool shareOutput() override;
};
#endif