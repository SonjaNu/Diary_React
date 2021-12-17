//cd..  vaihdetaan kansiota
//cd React
//npx create-react-app uusi_react_projekti
// npm start
import './App.css';  // ./ tarkoittaa, että seuraavaksi kerrottu tiedosto löytyy samasta kansiosta
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' //reititysohjeen komponentit
import NaytaMatkat from './components/NaytaMatkat';
import Matkalaskuri from './components/Matkalaskuri';
import Lisaamatka from './components/LisaaMatka';
import Biisi from './components/Biisi';
import Sananlasku from './components/Sananlasku';
import Astronominenkuva from './components/Astronominenkuva';
import LisaaPaivakirjaMerkinta from './components/LisaaPaivakirjaMerkinta';
import LisaaUnimerkinta from './components/LisaaUnimerkinta';
import Bookmenu from './navigation/Menu';

/* Komponentin voi tehdä funktiolla function UusiFunktio() {} jne.
tai nuolinotaatiofunktiolla
const App = () => {
return (
<div>
<h3>React</h3>
</div>
);
} 
*/

const askelpaivakirja = [ {
  id: 1,
  kayttaja: "Sonja N",
  tarkoitus: "Arkiliikunta",
  alku: {
   lukema: "2000",
   lahtoaika: "13:30",
   paiva: "21.10.2021",
   paikka: "Haaga-Helia, Helsinki",
  },
  loppu: {
   lukema: "3510",
   loppuaika: "14:50",
   paiva: "21.20.2021",
   paikka: "Treffi Pub, Helsinki",
  }
   },

   {
     id: 2,
    kayttaja: "Juha V",
    tarkoitus: "Arkiliikunta",
    alku: {
     lukema: "1000",
     lahtoaika: "13:30",
     paiva: "21.10.2021",
     paikka: "Haaga-Helia, Helsinki",
    },
    loppu: {
     lukema: "3510",
     loppuaika: "14:50",
     paiva: "21.20.2021",
     paikka: "Treffi Pub, Helsinki",
    }
     },
  
  ];

const matkatiedot = [ {id: 1, otsikko: 'Thaimaa', paikat: "Ko Lanta, Bangkok", pvm: "marraskuu 2013", saa: "+30 astetta", kuvaus: "Lauran kanssa ensimmäinen ulkomaanmatka", kuva: 'http://myy.haaga-helia.fi/~marsi/pictures/lumpeet.PNG'},
{id: 2, otsikko: 'Irlanti', paikat: "Reykjavik, Kuumat lähteet", pvm: "heinäkuu 2014", saa: "+16 astetta", kuvaus: "Ritvan, Raijan ja Sepon kanssa matkalla", kuva: 'http://myy.haaga-helia.fi/~marsi/pictures/tammi.PNG'},
];

function App() {  /*Komponentin nimi kirjoitetaan aina isolla */
  return (


    <Router > 
   
      <Bookmenu />

      <Routes>

<Route exact path="/"  element={ <Sananlasku /> } />

<Route exact path='/listaa' element={  <NaytaMatkat matkatietotaulukko = { matkatiedot } /> } />      {/* Kutsutaan matkat-komponenttia ja asetetaan sille props nimeltä matka ja aaltosulkujen sisään propsin sisältö eli const matkatiedot.*/}

    <Route exact path='/lisaa'  element={ <Lisaamatka /> } />
    
  {/*    <Matkalaskuri askeleet = { askelpaivakirja } />              {/* Kutsutaan komponentteja Matkat ym. Tähän palautetaan, mitä löytyy Matkat-funktion returnin sisästä. Personform voi edelleen tässä kutsua toista komponenttia jne. 
     <Biisi />
     <Astronominenkuva />
     <LisaaPaivakirjaMerkinta />
     <LisaaUnimerkinta />    */}

     <Route path='/*'   element={  <Sananlasku /> } />
     </Routes>
    
   </Router>      
  );
}

/* let alustetaan muuttuja, const alustetaan vakioita */
export default App;
