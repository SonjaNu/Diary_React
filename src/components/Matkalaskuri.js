import React from 'react';

function Matkalaskuri(props) { //otetaan vastaan props (askeleet = { askelmittari }) App-komponentista
 return (
   <div>

       { props.askeleet.map( askel => {    {/*propsin nimi on askeleet. Mapataan objektitaulukko const askelmittari, jotta json-muotoiset tiedot saadaan näytettyä allekkain käyttäystävällisesti. */}
            return (
        <p key={ askel.id} >
       Käyttäjä: {askel.kayttaja} <br/> 
       Kävelty matka: {askel.loppu.lukema - askel.alku.lukema} askelta <br/>       {/*Vähennetään loppulukemasta alkulukema, jotta saadaan kävelty matka */}
       Päivämäärä: {askel.alku.paiva} <br/>
       Alkuaika: {askel.alku.lahtoaika} <br/>
       Loppuaika: {askel.loppu.loppuaika} <br/> 
       Lähtöpaikka: {askel.alku.paikka} <br/> 
       Määränpää: {askel.loppu.paikka} <br/> 
       Tarkoitus: {askel.tarkoitus} 

       </p>  );
       })

    }
       
   </div>

 );

}

export default Matkalaskuri;