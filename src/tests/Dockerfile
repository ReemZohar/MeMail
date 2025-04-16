FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

COPY . /src/tests

WORKDIR /src/tests

RUN mkdir build
WORKDIR /src/tests/build

RUN cmake .. && make

CMD ["./runTests"]