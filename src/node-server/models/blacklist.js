const net = require('net');

const SERVER_HOST = 'cpp-server';
const SERVER_PORT = 7070;

class BlacklistClient {
  constructor() {
    this.client = new net.Socket();
    this.buffer = '';
    this.callbacks = [];
    this.connected = false;
    this.connect();
  }

  connect() {
    this.client.connect(SERVER_PORT, SERVER_HOST, () => {
      this.connected = true;
    });

    this.client.on('data', (data) => {
      this.buffer += data.toString();
      this.handleBuffer();
    });

    this.client.on('error', (err) => {
      console.error('Blacklist TCP error:', err);
      this.connected = false;
    });

    this.client.on('close', () => {
      this.connected = false;
    });
  }

handleBuffer() {
  while (this.buffer.includes('\n') && this.callbacks.length > 0) {
    const index = this.buffer.indexOf('\n');
    const response = this.buffer.slice(0, index).trim();
    this.buffer = this.buffer.slice(index + 1);
    const cb = this.callbacks.shift();
    cb(response);
  }
}


sendCommand(command) {
  return new Promise((resolve, reject) => {
    if (!this.connected) {
      return reject(new Error('Not connected to blacklist server'));
    }
    this.callbacks.push(resolve);
    this.client.write(command + '\n');
  });
}


  parseResponseLine(line) {
    const match = line.match(/^HTTP\/\d+\.\d+ (\d{3}) (.+)$/);
    if (match) {
      return `${match[1]} ${match[2]}`;
    }
    return line;
  }

async add(url) {
  const command = `POST ${url}`;
  const response = await this.sendCommand(command);
  const parsedResponse = this.parseResponseLine(response);

  if (parsedResponse === '201 Created') {
    return { url };
  } else if (parsedResponse === '400 Bad Request') {
    return null;
  }
  throw new Error(`Unexpected response: ${response}`);
}

async remove(url) {
    const command = `DELETE ${url}`;
    const response = await this.sendCommand(command);
    const parsedResponse = this.parseResponseLine(response);

    if (parsedResponse === '204 No Content') return true;
    if (parsedResponse === '404 Not Found') return false;
    if (parsedResponse === '400 Bad Request') throw new Error('Bad request');
    throw new Error(`Unexpected response: ${response}`);
  }

async isBlacklisted(url) {
  const command = `GET ${url}`;
  const statusLine = await this.sendCommand(command);
  const parsedStatus = this.parseResponseLine(statusLine);

  if (parsedStatus === '400 Bad Request') {
    return null;
  }

  if (parsedStatus === '200 Ok') {
    const dataLine = await new Promise((resolve) => {
      const handleNextLine = (line) => {
        const trimmed = line.trim();
        if (trimmed === '') {
          this.callbacks.unshift(handleNextLine);
        } else {
          resolve(trimmed);
        }
      };
      this.callbacks.push(handleNextLine);
      this.handleBuffer();
    });

    const flags = dataLine.toLowerCase().split(/\s+/);

    if (flags.includes('false')) {
      return false;
    }
    return true;
  }
  throw new Error(`Unexpected response: ${statusLine}`);
}


}

const blacklistClient = new BlacklistClient();

module.exports = {
  add: (url) => blacklistClient.add(url),
  remove: (url) => blacklistClient.remove(url),
  isBlacklisted: (url) => blacklistClient.isBlacklisted(url),
};
