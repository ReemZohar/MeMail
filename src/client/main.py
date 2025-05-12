import sys
from Client import Client

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(1)

    server_ip = sys.argv[1]

    try:
        server_port = int(sys.argv[2])
    except ValueError:
        sys.exit(1)

    if not (0 <= server_port <= 65535):
        sys.exit(1)

    client = Client(server_ip, server_port)  #Create a new Client object
    client.start()  #Upload the client

    while True:
        msg = input()

        #If the usr pressed Enter with no arguments we will continue that the client-server communication will behave well
        if msg == "":
            continue
        
        client.sendMessage(msg)  #Send the message to the server
        data = client.receiveMessage()  #Recieve the response from the server
        print(data)  #Print the response on the screen