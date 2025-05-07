import sys
from Client import Client

if __name__ == "__main__":

    if len(sys.argv) != 3:
        sys.exit(1)

    server_ip = sys.argv[1]
    server_port = int(sys.argv[2])

    client = Client(server_ip, server_port)
    client.start()

    while True:
        msg = input()

        if msg == "":
            continue
        
        client.sendMessage(msg)
        data = client.receiveMessage()
        print(data)