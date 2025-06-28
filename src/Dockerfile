FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

COPY . /src

WORKDIR /src

RUN mkdir -p build

WORKDIR /src/build
RUN cmake .. && make

RUN cp runProg /src/runProg

WORKDIR /src

CMD ["./runProg", "7070", "8", "1", "2"]