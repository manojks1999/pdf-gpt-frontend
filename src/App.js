import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENV } from './config.js'

const App = () => {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [ value, setValue] = useState(null);
  const [ previousChats, setPreviousChats] = useState([]);
  const [ currentTitle, setCurrentTitle] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  

  const csv_read_default = async (file_name) => {

    try {
      const response = await axios.get(`${PROCESS_ENV.BACKEND_API}/default_csv?file_name=${file_name}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
        },
        withCredentials: true,
      });

      setMessage(null);
      setPreviousChats([])
      setCurrentTitle(null)
      alert(response.data.message)
    } catch (error) {
      alert('Some error has accured please upload file again')
      console.error('Error uploading file:', error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${PROCESS_ENV.BACKEND_API}/file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
        },
        withCredentials: true,
      });

      
      setMessage(null);
      setPreviousChats([])
      setCurrentTitle(null)
      alert(response.data.message)
    } catch (error) {
      alert('Some error has accured please upload file again')
      console.error('Error uploading file:', error);
    }
  };


  const getMessages = async() => {

    let body  ={
      question: value
    }

    try {
      const response = await axios.post(`${PROCESS_ENV.BACKEND_API}/ask_question`, body, {
        headers: {
          "Content-Type": "application/json",
          'Accept': '*/*',
        },
        withCredentials: true,
      });
      setMessage({'role': 'assistence', 'content': response.data.answer})
      console.log(response.data)
    } catch(e) {
      alert('Some error has accured please upload file again')
      console.log("eeee", e)
    }
  }
  
  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats, 
          {
          title: currentTitle,
          role: 'user',
          content: value
          }, 
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      ))
      console.log("dfsfsfsfs", previousChats)
    }
  }, [message, currentTitle])

  
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  

  return (
    <div className="app">
      <section className="side-bar">
        <div>
        <div id = 'upload-sec'>
        <h3>Please upload file here</h3>
      </div>
        <input id="contained-button-file" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
        <label htmlFor="contained-button-file">
        <Button id = "file-upload-button" variant="contained" color="primary" component="span">
          Select file here
        </Button>
      </label>
      </div>
        <button onClick={handleUpload}>+ Upload</button>
        {/* <button onClick={csv_read_default('shell_tax_contribution_report')}>Load Shell Tax Contribution (Default)</button> */}
        <button onClick={() => csv_read_default('shell_tax_contribution_report')}>Load Shell Tax Contribution (Default)</button>
        <button onClick={() => csv_read_default('dairy_farm')}>Load Dairy Farm (Default)</button>
        <button onClick={() => csv_read_default('barclays')}>Barclays (Default)</button>
        <ul className="history">
          <li>
          </li>
        </ul>
        <nav>
          <p>Made by Manoj</p>
        </nav>
      </section>
      <section className = "main">
        <h1>ByteGenie GPT</h1>
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => <li key = {index}>
            <p className='role'>{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="border-section">
          <div className="input-container">
            <input value = {value} onChange={(e) => setValue(e.target.value)} />
            <div id = "submit" onClick={getMessages}>》</div>
          </div>
          <p className="info">
            ByteGenie
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
