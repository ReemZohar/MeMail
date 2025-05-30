const net = require('net');

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 12345;

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
      while (this.buffer.includes('\n\n')) {
        const [response, ...rest] = this.buffer.split('\n\n');
        this.buffer = rest.join('\n\n');
        if (this.callbacks.length > 0) {
          const cb = this.callbacks.shift();
          cb(response.trim());
        }
      }
    });

    this.client.on('error', (err) => {
      console.error('Blacklist TCP error:', err);
      this.connected = false;
    });

    this.client.on('close', () => {
      this.connected = false;
    });
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

  async add(url) {
    const command = `POST ${url} ${url}`;
    const response = await this.sendCommand(command);
    if (response === '201 Created') {
      return { id: url, url };
    } else if (response === '400 Bad Request') {
      return null;
    }
    throw new Error(`Unexpected response: ${response}`);
  }

  async remove(url) {
    const command = `DELETE ${url}`;
    const response = await this.sendCommand(command);
    if (response === '204 No Content') return true;
    if (response === '404 Not Found') return false;
    if (response === '400 Bad Request') throw new Error('Bad request');
    throw new Error(`Unexpected response: ${response}`);
  }

  async isBlacklisted(url) {
    const command = `GET ${url}`;
    const response = await this.sendCommand(command);
    if (response === '200 Ok\n\n1') {
      return true;
    } else if (response === '200 Ok\n\n0') {
      return false;
    } else if (response === '400 Bad Request') {
      return null;
    }
    throw new Error(`Unexpected response: ${response}`);
  }
}

module.exports = new BlacklistClient();
