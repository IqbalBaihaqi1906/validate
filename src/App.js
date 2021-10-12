import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Success from './components/Success';
import { useState } from 'react';

function App() {
  const[isSuccess,setIsSuccess] = useState(false)

  return (
    <div className="App">
      
      
      {isSuccess ? <Success/> : <Form setIsSuccess={setIsSuccess}/>}
      
    </div>
  );
}

export default App;
