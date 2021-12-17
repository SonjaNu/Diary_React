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
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';  //adaptoidaan , mitä kieliversiota tehdään kalenteria
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';  //päivämäärän hallinta
import { DnsTwoTone } from '@mui/icons-material';

function LisaaPaivakirjaMerkinta () {
// tilamuuttujat ja niiden muuttamiskutsu
  const [paiva, setValues] = useState({  //tilamuuttujan nimi on matka, jota voi setValues komennolla muuttaa. Alustetaan muuttuja useStatella
     
      paiva: new Date(),
      aika: new Date(),
      tapahtumat: '',
      saa: '',
      iloinen: '',
      surullinen: '',
      kuva: ''
  });

  const [viesti, setViesti] = useState("");  //tilamuuttuja viesti

// Funktio, jolla muutetaan tilaa
//Komponentin (tässä Lisaamatka) sisään tehdä funktiot nuolinotaatiofunktioilla (tässä const muuta ja const lisaaMatka)
  const muuta = (e) => {  //tapahtumankäsittelijä nimeltä muuta
     setValues({  //muutetaan tilamuuttujaa, annetaan tilamuuttujan arvoksi se, mitä lomakekentästä lötyy
       ...paiva, //tehdään tilamuuttujasta kopio, jotta sitä pääsee muuttamaan. Kopiota muutetaan ja se laitetaan vanhan päälle. Tilamuuttujat ovat asynkronisia, eli selain muuttaa arvon silloin kun ehtii (yleensä hyvin n opeasti, mutta kuitenkin ei voida muokata alkuperäistä tietoa)
       [e.target.name]: e.target.value  //[e.target.name]: mikä tilamuuttujan kentistä halutaan muuttaa - name = otsikko ja paiva jne.
                                        //e.target.value  mikä on uusi arvo lomakekentässä value = { matka.otsikko } jne. (mitä käyttäjä on sinne kirjoittanutkaan)
     });

     setViesti(""); //asetetaan viestiin uusi arvo, kun käyttäjä alkaa kirjoittaa kenttiin jotain (tyhjennyksen jälkeen)
   };

   const muutaSuurella = (e) => {
    setValues({
      ...paiva,
      [e.target.name]: e.target.value.toUpperCase()
    });
      
    setViesti('');
  };

   const muutaKuva = (e) => {
    setValues({
      ...paiva,
      kuva: e.target.files[0]
    });

    setViesti('');
  }

// Funktio Lisää-napin painallukselle - toiminnon luominen
  const lisaaMerkinta = (e) => {

   
    setValues({  //tyhjennetään kentät submit-painikkeen painamisen jälkeen
        paiva: new Date(),
      aika: new Date(),
      tapahtumat: '',
      saa: '',
      iloinen: '',
      surullinen: '',
      kuva: ''
    });
    setViesti('Merkintä lisätty'); 

   
  }

   const tyhjenna = (e) => {
    e.preventDefault();

    setValues({
        paiva: new Date(),
      aika: new Date(),
      tapahtumat: '',
      saa: '',
      iloinen: '',
      surullinen: '',
      kuva: ''
    });

    setViesti('');
  }

  let kuvaNimi = '';
  if (paiva.kuva !== null) {
    kuvaNimi = paiva.kuva.name;
  }

  const muutaPvm = (e) => {
    setValues({
      ...paiva,
      paiva: e
     });

    setViesti('');
  };

  const muutaAika = (e) => {
    setValues({
        ...paiva,
        aika: e
       });
  
      setViesti('');
    };


  return (
    <Paper sx={ {padding:'10px', margin:'10px' } }>
    
    <form>
      
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
          value={ paiva.paiva }
          onChange={ (e) => muutaPvm(e) }  
          renderInput={(params) => <TextField {...params} label='Päivämäärä'  required margin='normal' fullWidth /> } />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns} utils={ DateFnsUtils } locale={ fiLocale }>
      <TimePicker
        name='aika'
         value={ paiva.aika }
        onChange={ (e) => muutaAika(e) }
        renderInput={(params) => <TextField {...params} label='Kellonaika' required fullWidth/>}
/>

</LocalizationProvider>

      <TextField label='Päivän tapahtumat' name='tapahtumat' value={ paiva.tapahtumat} margin='normal'
        onChange={ (e) => muuta(e) } multiline rows='4' required fullWidth />
		
     
		
      <TextField label='Päivän ilot' name='iloinen' value={ paiva.iloinen } margin='normal'
        onChange={ (e) => muuta(e) } multiline rows='4' fullWidth />

<TextField label='Päivän surut' name='surullinen' value={ paiva.surullinen } margin='normal'
        onChange={ (e) => muuta(e) } multiline rows='4' fullWidth />

<TextField label='Päivän sää' name='saa' value={ paiva.saa } margin='normal'
        onChange={ (e) => muuta(e) } required fullWidth />
		
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
        <Button onClick={ (e) => lisaaMerkinta(e) } variant='contained' sx={ {marginRight:3} } startIcon={ <CreateIcon /> }>Lisää</Button>
        <Button onClick={ (e) => tyhjenna(e) } variant='contained' color='secondary' startIcon={ <ClearIcon /> }>Tyhjennä</Button>
      </Box>
    </form>
    <Typography sx={ {marginTop: 3} }>{ viesti }</Typography>
    </Paper>
  );
}

export default LisaaPaivakirjaMerkinta;