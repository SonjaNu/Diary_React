import React, { useState, useEffect } from 'react';

function Astronominenkuva () {

  const [avaruuskuva, setValues] = useState({ selitys: '', kuva: '' });
  const [virhe, setVirhe] = useState('Haetaan ...');

/*
  useEffect( () => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        .then((response) => response.json())
        .then((responseJson) => {
            setValues({
                selitys: responseJson.explanation,
                kuva: responseJson.url,
                virhe: ''
            });
        })
        .catch((error) => {
            console.error(error);
			      setValues({
              ...avaruuskuva,
              virhe: 'Tietojen haku ei onnistunut'
            });
        })
  }, [] );
*/

  const fetchUrl = async () =>  {
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      // Tänne päästään, vaikka edellinen ei onnistu, Bug yllä?
      const json = await response.json();
      setValues({
          selitys: json.explanation,
          kuva: json.url,
      });
      setVirhe('');  //koska haku on onnistunut, laitetaan setVirhe tyhjäksi
    } catch (error) {
      setVirhe('Tietoja ei ole saatavilla');
    }
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  if (! avaruuskuva.selitys ) {
    if (virhe.length === 0 ) {
      return<div>Tietojen haku ei onnistunut</div>
    }
    return <div>{ virhe }</div>
  }

  return(
      <div style={styles.container}> Päivän astronominen kuva: 
      {
         
          avaruuskuva.selitys.length > 0 ?
          <div>
            <img src={avaruuskuva.kuva} alt='' style={styles.img} />
            {avaruuskuva.selitys}
          </div>
          : <div>{virhe}</div>
      }
      </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    paddingLeft: 10,
  },
  img: {
    height: 150,
    width: 150,
    display: 'inline',
    float: 'left',
    paddingRight: 20,
  },
}

export default Astronominenkuva;
