#ifndef PROGRAM
#define PROGRAM

#include <iostream>
#include <vector>
#include "userAction.h"
#include "IHasher.h"
#include "HashRepeats.h"
#include "initializeBLSystem.h"
#include "FirstUserInput.h"
#include "MenuChoiceInput.h"
#include "runHashOnURL.h"
#include "BloomFilter.h"
#include "ActionFactory.h"
#include "IProgram.h"

//class which runs the program of the first task
class Program : public IProgram {
    public:

    //runs the program
    void run() override;
};

#endif