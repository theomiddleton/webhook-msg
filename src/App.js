import './App.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import React, { useState,useEffect} from "react";
import axios from 'axios'

function App() {
  const [ip, setIP] = useState('');
  var [msg, setmsg] = useState("");
  const [hookUrl, sethookUrl] = useState("");

  const [msgErr, setmsgErr] = useState(false);
  const [hookErr, sethookErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()

    setmsgErr(false)
    sethookErr(false)

    if (msg === '') {
      setmsgErr(true)
      //console.log('submited w/o account name')
    }

    if (hookUrl === '') {
      sethookErr(true)
      //console.log('submited w/o hookUrl')
    }
    //send it
    sendMessage()
  }

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }

  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()

  }, [])

  

  function sendMessage() {
    const request = new XMLHttpRequest();
    request.open("POST", hookUrl);
    request.setRequestHeader('Content-type', 'application/json');
    msg += ' ' + ip
    const params = {
      username:ip,
      content: msg
    }
    request.send(JSON.stringify(params));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h4>{ip}</h4>
        <meta name="viewport" content="initial-scale=1, width=device-width" />  

        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <TextField 
            onChange={(e) => setmsg(e.target.value)} 
            required id="filled-required" 
            label="message name is required" 
            //defaultValue="message"
            variant="filled" 
            color="secondary"
            error={msgErr}
          />

          <TextField
            onChange={(e) => sethookUrl(e.target.value)}
            required id="filled-required"
            label="hookUrl is required"
            //defaultValue="hookUrl"
            variant="filled" 
            color="secondary"
            error={hookErr}
          />   

          <Button
           //onClick={logOn}
           variant="contained"
           type="submit"
           color="secondary"
           >Go
          </Button>
        </form>
      </header>
    </div>
  );
}

export default App;
