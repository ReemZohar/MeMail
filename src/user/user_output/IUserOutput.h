#ifndef I_USER_OUTPUT
#define I_USER_OUTPUT

class IUserOutput {
    public:

    //shares the user's output
    virtual bool shareOutput() = 0;
};

#endif