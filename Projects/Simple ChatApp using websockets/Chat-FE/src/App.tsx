import { useState, useRef, useEffect } from "react";

const WS_URL = import.meta.env.VITE_WS_URL as string;

function App() {
  const [view, setView] = useState<"lobby" | "chat">("lobby");
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);

  function connect(room: string) {
    const socket = new WebSocket(WS_URL);
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "join", payload: { roomId: room } }));
      setRoomId(room);
      setView("chat");
    };
    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed.type === "chat") {
        setMessages((prev) => [...prev, parsed.payload.message]);
      }
    };
    ws.current = socket;
  }

  function createRoom() {
    const id = Math.random().toString(36).slice(2, 8);
    connect(id);
  }

  function joinRoom() {
    if (joinRoomId.trim()) connect(joinRoomId.trim());
  }

  function sendMessage() {
    if (!message.trim() || !ws.current) return;
    ws.current.send(JSON.stringify({ type: "chat", payload: { message } }));
    setMessages((prev) => [...prev, `You: ${message}`]);
    setMessage("");
  }

  useEffect(() => {
    return () => ws.current?.close();
  }, []);

  if (view === "lobby") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm flex flex-col gap-4">
          <h1 className="text-white text-3xl font-bold text-center">Chat Room</h1>
          <button
            onClick={createRoom}
            className="bg-white text-black font-medium py-2.5 px-4 rounded-lg hover:bg-neutral-200 cursor-pointer"
          >
            Create Room
          </button>
          <div className="text-neutral-500 text-sm text-center">or</div>
          <div className="flex gap-2">
            <input
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              placeholder="Enter room ID"
              onKeyDown={(e) => e.key === "Enter" && joinRoom()}
              className="flex-1 bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 rounded-lg px-3 py-2.5 outline-none focus:border-neutral-500"
            />
            <button
              onClick={joinRoom}
              className="bg-white text-black font-medium py-2.5 px-4 rounded-lg hover:bg-neutral-200 cursor-pointer"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="border-b border-neutral-800 px-4 py-3">
        <h2 className="text-white text-lg font-medium">Room: {roomId}</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
        {messages.map((msg, i) => (
          <p key={i} className="text-white bg-neutral-900 rounded-lg px-3 py-2 break-words">
            {msg}
          </p>
        ))}
      </div>
      <div className="border-t border-neutral-800 px-4 py-3">
        <div className="flex gap-2 max-w-sm mx-auto">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 rounded-lg px-3 py-2.5 outline-none focus:border-neutral-500"
          />
          <button
            onClick={sendMessage}
            className="bg-white text-black font-medium py-2.5 px-4 rounded-lg hover:bg-neutral-200 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
