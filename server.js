const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5500 });

let scores = [];

wss.on('connection', function connection(ws) {
    console.log('Cliente conectado');

    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido: %s', message);
        const data = JSON.parse(message);
        if (data.type === "score") {
            scores.push({ playerName: data.playerName, score: data.score });
            sendScoreboard();
        }
    });
});

function sendScoreboard() {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "scoreboard", scoreboard: scores }));
        }
    });
}
