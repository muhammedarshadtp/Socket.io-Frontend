import './App.css';
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import {useState,useEffect} from 'react'

const socket = io.connect("http://localhost:4000")

function App() {
  const [messege,setMessege]=useState('')
  const [chat,setChat]=useState([])

const sendChat = (e)=>{
  e.preventDefault()
  socket.emit('chat',{messege})
  setMessege('')
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>
        <form onSubmit={sendChat }>
          <input type='text' name='chat'
          placeholder='sent text'
          value={messege}
          onChange={(e)=>{
            setMessege(e.target.value)
          }}>
            
          </input>
          <button type='submit'>sent</button>
        </form>
      </header>
    </div>
  );
}

export default App;
