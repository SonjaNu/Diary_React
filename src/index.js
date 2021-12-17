//Kertoo, mikä on sovelluksen komponentti, nyt se on <App /> 
//  /* Kommentti */   /* */
import React from 'react'; /* Käytetään react-kirjastoa, löytyy nodemoduulista, importoidaan sieltä*/
import ReactDOM from 'react-dom';
import App from './App';  //App on komponentin nimi, joka löytyy tiedostosta App.js
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
