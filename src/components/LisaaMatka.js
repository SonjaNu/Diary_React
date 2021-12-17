import React, { useState } from 'react';  //importoidaan useState ja useEffect
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Box from '@mui/material/Box';

import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi'; //asetetaan lokalisointi suomeksi, fi on kielikoodi, englanti en jne.

import AdapterDateFns from '@mui/lab/AdapterDateFns';  //adaptoidaan , mitä kieliversiota tehdään kalenteria
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';  //päivämäärän hallinta
import { DnsTwoTone } from '@mui/icons-material';

function Lisaamatka () {
// tilamuuttujat ja niiden muuttamiskutsu
  const [matka, setValues] = useState({  //tilamuuttujan nimi on matka, jota voi setValues komennolla muuttaa. Alustetaan muuttuja useStatella
      otsikko: '',    //tilamuuttujan nimi on otsikko ja se on alustettu tyhjäksi
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
      kuva: ''
  });

  const [viesti, setViesti] = useState("");  //tilamuuttuja viesti

// Funktio, jolla muutetaan tilaa
//Komponentin (tässä Lisaamatka) sisään tehdä funktiot nuolinotaatiofunktioilla (tässä const muuta ja const lisaaMatka)
  const muuta = (e) => {  //tapahtumankäsittelijä nimeltä muuta
     setValues({  //muutetaan tilamuuttujaa, annetaan tilamuuttujan arvoksi se, mitä lomakekentästä lötyy
       ...matka, //tehdään tilamuuttujasta kopio, jotta sitä pääsee muuttamaan. Kopiota muutetaan ja se laitetaan vanhan päälle. Tilamuuttujat ovat asynkronisia, eli selain muuttaa arvon silloin kun ehtii (yleensä hyvin n opeasti, mutta kuitenkin ei voida muokata alkuperäistä tietoa)
       [e.target.name]: e.target.value  //[e.target.name]: mikä tilamuuttujan kentistä halutaan muuttaa - name = otsikko ja paiva jne.
                                        //e.target.value  mikä on uusi arvo lomakekentässä value = { matka.otsikko } jne. (mitä käyttäjä on sinne kirjoittanutkaan)
     });

     setViesti(""); //asetetaan viestiin uusi arvo, kun käyttäjä alkaa kirjoittaa kenttiin jotain (tyhjennyksen jälkeen)
   };

   const muutaSuurella = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value.toUpperCase()
    });
      
    setViesti('');
  };

   const muutaKuva = (e) => {
    setValues({
      ...matka,
      kuva: e.target.files[0]
    });

    setViesti('');
  }

// Funktio napin Lisää painallukselle - toiminnon luominen
  const lisaaMatka = (e) => {

    if (matka.otsikko.length === 0 || matka.paiva.length === 0 ||
        matka.paikka.length === 0  ||
        matka.saa.length === 0  ||
        matka.kuvaus.length === 0) {
       setViesti('Kaikissa kentissä pitää olla arvot')
   }
   
  //  e.preventDefault();  //submit-toiminnolla on oletustoiminnallisuus, että se lähettää lomakkeen tiedot palvelimelle. Komennolla e.preventDefault();  estetään tämä, koska tässä halutaan itse hallita, mitä lomakkeella tehdään. Button-tyyppinen painike ei lähetä oletuksena tietoja palvelimelle. Voi laittaa minkä tahansa elementin yhteyteen estämään oletustoiminnallisuutta.

   
    setValues({  //tyhjennetään kentät submit-painikkeen painamisen jälkeen
        otsikko: '',
        paiva: new Date(),
        paikka: '',
        saa: '',
        kuvaus: '',
        kuva: ''
    });
    setViesti('Lisättiin'); 

   
  }

   const tyhjenna = (e) => {
    e.preventDefault();

    setValues({
        otsikko: '',
        paiva: new Date(),
        paikka: '',
        saa: '',
        kuvaus: '',
        kuva: ''
    });

    setViesti('');
  }

  let kuvaNimi = '';
  if (matka.kuva !== null) {
    kuvaNimi = matka.kuva.name;
  }

  const muutaPaiva = (e) => {
    setValues({
      ...matka,
      paiva: e
     });

    setViesti('');
  };


  return (
    <Paper sx={ {padding:'10px', margin:'10px' } }>
    
    <form>
      <TextField label='Otsikko' name='otsikko' value={ matka.otsikko } margin='normal'
        onChange={ (e) => muutaSuurella(e) } required fullWidth autoFocus />
     {
       /*
      <TextField label='Päivä' name='paiva' value={ matka.paiva }
        onChange={ muuta } required fullWidth />
        */
     }

{/*fiLocalella asetetaan lokalisointi suomeksi, myös importoitava */}
{/*dateAdapter, jotta osataan käsitellä oikeaa päivämäätäkirjastoa, suluissa tarkennus  */}
{/* tapahtumankäsittelijä muutaPaivaan menee DesktopDatePickerin tiedot, jotka käyttäjä on aettanut eli valinnut kalenterista päivön */}
          {/* päivämäärä renderoidaan (eli mihin se asetetaan kalenterista valitsemisen jälkeen) normaaliin tekstikenttään (TextField) */}
          {/* required eli pakollinen kenttä, fullWidth eli vie koko tilan */}
      <LocalizationProvider dateAdapter={AdapterDateFns} utils={ DateFnsUtils } locale={ fiLocale }>
        <DesktopDatePicker
          name='paiva'
          value={ matka.paiva }
          onChange={ (e) => muutaPaiva(e) }  
          renderInput={(params) => <TextField {...params}  required margin='normal' fullWidth /> } />
      </LocalizationProvider>

      <TextField label='Paikka' name='paikka' value={ matka.paikka } margin='normal'
        onChange={ (e) => muuta(e) } required fullWidth />
		
      <TextField label='Sää' name='saa' value={ matka.saa } margin='normal'
        onChange={ (e) => muuta(e) } required fullWidth />
		
      <TextField label='Kuvaus' name='kuvaus' value={ matka.kuvaus } margin='normal'
        onChange={ (e) => muuta(e) } multiline rows='4' fullWidth />
		
      <Input accept='image/*' name='kuva' id='kuva' type='file'
        onChange={ (e) => muutaKuva(e) } sx={{display: 'none'}} />

      <InputLabel htmlFor='kuva'>
        <Typography sx={{ display:'inline'}}>Kuva</Typography>
        <Button component='span'>
            <AttachmentIcon />
        </Button>
        <Typography sx={{ display:'inline'}}>{ kuvaNimi }</Typography>
      </InputLabel>

      <Box sx={ {textAlign: 'center'} }>
        <Button onClick={ (e) => lisaaMatka(e) } variant='contained' sx={ {marginRight:3} } startIcon={ <CreateIcon /> }>Lisää</Button>
        <Button onClick={ (e) => tyhjenna(e) } variant='contained' color='secondary' startIcon={ <ClearIcon /> }>Tyhjennä</Button>
      </Box>
    </form>
    <Typography sx={ {marginTop: 3} }>{ viesti }</Typography>
    </Paper>
  );
}

export default Lisaamatka;