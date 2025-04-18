#include "initializeSystem.h"
using namespace std;
#include <vector>


//PGAPP-53:
//The function gets a length and create a new vector of the defined length initialized with zeros
vector<int> createZerosIntVec(int length) {
    return vector<int>(length, 0);
}