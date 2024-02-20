const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5500 });

wss.on('connection', function connection(ws) {
  console.log('Cliente conectado');

  ws.on('message', function incoming(message) {
    console.log('Mensaje recibido: %s', message);
    // Envía el mensaje a todos los clientes, incluido el que lo envió
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});