import React, { useState, useEffect } from 'react';


export default function Sananlasku () {
const [tekija, setTekija] = useState('');
const [teksti, setTeksti] = useState('');
const [viesti, setViesti] = useState('Haetaan sananlaskua...');

const fetchUrl = async () => {
try {
const response = await fetch('http://quotes.rest/qod.json');
const json = await response.json();
setTekija(json.contents.quotes[0].author); //contents, quotes, author ja quote tulevat sivustolta objektitaulukosta (kts. nettisivu json-taulukko)
setTeksti(json.contents.quotes[0].quote); //aseta teksti-tilamuuttujaan se, mitä löytyy taulukosta kohdasta quote
setViesti(''); //kun haku onnistuu, tyhjennetään tilamuuttuja viesti
} catch (error) {
setViesti('Sanalaskua ei voinut hakea.');
}
}
useEffect( () => { fetchUrl() }, [] );

if (viesti.length > 0) { return (<div>{ viesti }</div>) };  //Jos viestin kertovassa tilamuuttajassa on sisältöä, näytetään se

return ( <div> Päivän sananlasku on: { teksti }<br /> -{ tekija } </div> );  //Muuten näytetään tilamuuttujat, joissa on haun tulos
}



/*Haettavat tiedot json-muodossa

contents
{
quotes: [
{
author: "Steve Marabol",
quote: "Stress is l..."
}
]
} */