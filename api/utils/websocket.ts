import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Store active WebSocket clients
const clients: Set<WebSocket> = new Set();

// Handle WebSocket connections
wss.on("connection", (socket: any) => {
  console.log("New client connected");
  clients.add(socket);

  socket.on("message", (message: any) => {
    console.log("Received message:", message.toString());
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    clients.delete(socket);
  });
});

// Broadcast updates to all connected clients
export const broadcastProductUpdate = (update: any) => {
  const message = JSON.stringify(update);
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
};

export default wss;
