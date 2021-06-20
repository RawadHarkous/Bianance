
import {useEffect, useState} from 'react';
import './App.css';

function App() {


  const [price, setPrice] = useState(null);
  const [stopLoss, setStopLoss] = useState(null);
  const [risk, setRisk] = useState(null);
 


 const  handleInputStopLoss=(e)=>{
    setStopLoss(e.target.value);
   
   
  }

 const handleInputRisk=(e)=>{
  setRisk(e.target.value);
 
 
}




  useEffect(() => {
    setInterval(()=>{

      fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        
        setPrice(result.price);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });

    }, 1000);
    
  
  }, [stopLoss,risk])


  
  return (
    <div className="App">
    
    
      <h1>Price: {price}</h1>
      <h4>Stop-Loss: </h4><input onChange={handleInputStopLoss} placeholder="StopLoss"/>

     <h4>Risk</h4> <input onChange={handleInputRisk} placeholder="risk"/>
      <h3>Buy Inval: {(((price-stopLoss)/price))+""}</h3>
      <h3>Buy Risk: {(risk/((price-stopLoss)/price))+""}</h3>
     


      <h3>Sell Inval: {(((stopLoss-price)/price))+""}</h3>
      <h3>Sell Risk: {(risk/((stopLoss-price)/price))+""}</h3>


      

      
      


    </div>
  );
}

export default App;
