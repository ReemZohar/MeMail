import socket
from IClient import Iclient

class Client(Iclient):
    def __init__(self, dest_IP: str, dest_port: int):
        self.dest_IP = dest_IP
        self.dest_port = dest_port
        self.s = None
