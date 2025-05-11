import socket
from IClient import Iclient

class Client(Iclient):
    def __init__(self, dest_IP: str, dest_port: int):
        self.dest_IP = dest_IP
        self.dest_port = dest_port
        self.s = None

    def start(self):
        self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.s.connect((self.dest_IP, self.dest_port))
        
    def sendMessage(self, msg: str):
        self.s.send(bytes(msg, 'utf-8'))

    def receiveMessage(self) -> str:
        data = self.s.recv(4096)
        return data.decode('utf-8')
    
    def close(self):  #not in use this sprint
        if self.s:
            self.s.close()
            print("Connection closed.")