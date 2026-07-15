import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setws] = useState()
  const inputRef=useRef()
  function sendMessage() {
    if (!socket) return;
    const message =inputRef.current.value
    //@ts-ignore
    socket.send(message)
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    setws(ws)
    ws.onmessage=(ev) => {
      alert(ev.data)
    }
  },[])
  return (
    <> 
      <input ref={inputRef} type='text' placeholder='Message...'>
      </input>
      <button onClick={sendMessage}>
        send
      </button>
    </>
  )
}

export default App
