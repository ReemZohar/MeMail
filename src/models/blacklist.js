const net = require('net');
const { v4: uuidv4 } = require('uuid');

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 12345;

function sendCommandToCppServer(command) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    let response = '';

    client.connect(SERVER_PORT, SERVER_HOST, () => {
      client.write(command);
    });

    client.on('data', (data) => {
      response += data.toString();
    });

    client.on('end', () => {
      resolve(response.trim());
    });

    client.on('error', (err) => {
      reject(err);
    });
  });
}

const add = async (url) => {
  const id = uuidv4();
  const command = `ADD ${id} ${url}\n`;
  const response = await sendCommandToCppServer(command);
  if (response !== '201 Created') {
    if (response === '400 Bad Request') return null; //invalid request
    throw new Error(`Failed to add url to blacklist: ${response}`);
  }
  return { id, url };
}

const remove = async (id) => {
  const command = `DELETE ${id}\n`;
  const response = await sendCommandToCppServer(command);
  if (response === '204 No Content') {
    return true;
  } else if (response === '404 Not Found') {
    return false; //URL is not found
  } else if (response === '400 Bad Request') {
    throw new Error('Bad request');
  }
  throw new Error(`Unexpected response: ${response}`);
}

const isBlacklisted = async (url) => {
  const command = `GET 1 ${url}\n`;
  const response = await sendCommandToCppServer(command);
  
  if (response === '200 Ok') return true;
  if (response === '404 Not Found') return false;
  if (response === '400 Bad Request') return null;

  throw new Error(`Unexpected response: ${response}`);
}

module.exports = { add, remove, isBlacklisted }