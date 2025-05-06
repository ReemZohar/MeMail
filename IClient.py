from abc import ABC, abstractmethod

class Iclient(ABC):

    #The function gets a message and sent it to the server
    @abstractmethod
    def sendMessage(self, msg : str):
        pass

    #The function returns a message that the client got
    @abstractmethod
    def receiveMessage(self) -> str:
        pass

    #The function creates a socket and starts the communication with the server
    @abstractmethod
    def start(self):
        pass

    #The function closes the socket
    @abstractmethod
    def close(self):
        pass