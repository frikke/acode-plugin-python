/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const liveServer = require('live-server');
const getNet = require('./getNet');

const serverCrt = path.resolve(__dirname, 'server.crt');
const serverKey = path.resolve(__dirname, 'server.key');

main();

async function main() {
  const { ip: host, port } = await getNet('dev');
  process.cwd = () => __dirname;
  liveServer.start({
    open: false,
    port,
    host,
    cors: true,
    root: '../',
    ignore: 'node_modules,platforms,plugins',
    https: {
      cert: fs.readFileSync(serverCrt),
      key: fs.readFileSync(serverKey),
      passphrase: '1234',
    },
  });

  process.send('OK');
}
