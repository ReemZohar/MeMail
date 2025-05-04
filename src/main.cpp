#include "IProgram.h"
#include "Program.h"

using namespace std;
namespace fs = std::filesystem; 

int main() {
    //initializes the program and runs it
    shared_ptr<IProgram> program = make_shared<Program>();
    program->run();

    return 0;
}
