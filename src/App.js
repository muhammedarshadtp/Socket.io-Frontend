import './App.css';
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import {useState,useEffect} from 'react'

const socket = io.connect("http://localhost:4000")

function App() {
  const [messege,setMessege]=useState('')
  const [chat,setChat]=useState([])

  const userName=nanoid(4)

const sendChat = (e)=>{
  e.preventDefault()
  socket.emit('chat',{messege,userName })
  setMessege('')
}

useEffect(()=>{
  socket.on("chat",(payload)=>{
    setChat([...chat,payload])  
  },[])

})


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
        {chat.map((payload,index)=>{
          return <p key={index} >{payload.messege}: <span>id:{payload.userName}</span></p>
        })}
      </header>
    </div>
  );
}

export default App;
