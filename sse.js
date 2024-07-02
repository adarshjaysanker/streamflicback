const clients = new Set();

function sendEventToAll(data){
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

const sse = {
    init: (req,res) => {
        res.writeHead(200, { 
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });
        const clientId = Date.now();
        const newClient = {
            id: clientId,
            res
        }
        clients.add(newClient);

        req.on('close', () => {
            clients.delete(newClient);
        })
    },
    send: (data) => {
        sendEventToAll(data);
    }
}

module.exports = sse;