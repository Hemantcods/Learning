import { WebSocket } from "ws";
import { WebSocketServer } from "ws";

interface CustomSocket extends WebSocket {
  roomId?: string;
}

const rooms = new Map<string, Set<CustomSocket>>();
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (socket: CustomSocket) => {
  console.log("User connected:");
  socket.on("message", (message) => {
    const parsed = JSON.parse(message.toString());
    if (parsed.type === "join") {
      const roomId = parsed.payload.roomId;
      socket.roomId = roomId;
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }
      rooms.get(roomId)!.add(socket);
    }
    if (parsed.type === "chat") {
      const room = rooms.get(socket.roomId!);
      if (!room) return;
      room.forEach((client) => {
        if (client === socket) return;
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "chat",
              payload: {
                message: parsed.payload.message,
              },
            }),
          );
        }
      });
    }
  });
});
