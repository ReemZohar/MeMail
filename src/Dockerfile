FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

COPY . /src

WORKDIR /src

RUN mkdir build
WORKDIR /src/build

RUN cmake .. && make

CMD ["./runProg"]