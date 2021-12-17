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

function LisaaUnimerkinta () {
// tilamuuttujat ja niiden muuttamiskutsu
  const [uni, setValues] = useState({  //tilamuuttujan nimi on matka, jota voi setValues komennolla muuttaa. Alustetaan muuttuja useStatella
     
      paiva: new Date(),
      nukahtamisaika: new Date(),
      heraamisaika: new Date(),
      unenlaatu: '',
      nukahtaminen: '',
      unet: '',
      heraaminen: '',
      kuva: ''
  });

  const [viesti, setViesti] = useState("");  //tilamuuttuja viesti

// Funktio, jolla muutetaan tilaa
//Komponentin (tässä Lisaamatka) sisään tehdä funktiot nuolinotaatiofunktioilla (tässä const muuta ja const lisaaMatka)
  const muuta = (e) => {  //tapahtumankäsittelijä nimeltä muuta
     setValues({  //muutetaan tilamuuttujaa, annetaan tilamuuttujan arvoksi se, mitä lomakekentästä lötyy
       ...uni, //tehdään tilamuuttujasta kopio, jotta sitä pääsee muuttamaan. Kopiota muutetaan ja se laitetaan vanhan päälle. Tilamuuttujat ovat asynkronisia, eli selain muuttaa arvon silloin kun ehtii (yleensä hyvin n opeasti, mutta kuitenkin ei voida muokata alkuperäistä tietoa)
       [e.target.name]: e.target.value  //[e.target.name]: mikä tilamuuttujan kentistä halutaan muuttaa - name = otsikko ja paiva jne.
                                        //e.target.value  mikä on uusi arvo lomakekentässä value = { matka.otsikko } jne. (mitä käyttäjä on sinne kirjoittanutkaan)
     });

     setViesti(""); //asetetaan viestiin uusi arvo, kun käyttäjä alkaa kirjoittaa kenttiin jotain (tyhjennyksen jälkeen)
   };

   const muutaSuurella = (e) => {
    setValues({
      ...uni,
      [e.target.name]: e.target.value.toUpperCase()
    });
      
    setViesti('');
  };

   const muutaKuva = (e) => {
    setValues({
      ...uni,
      kuva: e.target.files[0]
    });

    setViesti('');
  }

// Funktio Lisää-napin painallukselle - toiminnon luominen
  const lisaaUni = (e) => {

   
    setValues({  //tyhjennetään kentät submit-painikkeen painamisen jälkeen
        paiva: new Date(),
      nukahtamisaika: new Date(),
      heraamisaika: new Date(),
      unenlaatu: '',
      nukahtaminen: '',
      unet: '',
      heraaminen: '',
      kuva: ''
    });
    setViesti('Merkintä lisätty'); 

   
  }

   const tyhjenna = (e) => {
    e.preventDefault();

    setValues({
        paiva: new Date(),
        nukahtamisaika: new Date(),
        heraamisaika: new Date(),
        unenlaatu: '',
        nukahtaminen: '',
        unet: '',
        heraaminen: '',
        kuva: ''
    });

    setViesti('');
  }

  let kuvaNimi = '';
  if (uni.kuva !== null) {
    kuvaNimi = uni.kuva.name;
  }

  const muutaPvm = (e) => {
    setValues({
      ...uni,
      paiva: e
     });

    setViesti('');
  };

  const muutaAika = (e) => {
    setValues({
        ...uni,
        nukahtamisaika: e,
        heraamisaika: e
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
          value={ uni.paiva }
          onChange={ (e) => muutaPvm(e) }  
          renderInput={(params) => <TextField {...params} label='Päivämäärä'  required margin='normal' fullWidth /> } />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns} utils={ DateFnsUtils } locale={ fiLocale }>
      <TimePicker
        name='nukahtamisaika'
         value={ uni.nukahtamisaika }
        onChange={ (e) => muutaAika(e) }
        renderInput={(params) => <TextField {...params} label='Nukahtamisaika' required margin='normal' fullWidth/>}
/>

</LocalizationProvider>

<LocalizationProvider dateAdapter={AdapterDateFns} utils={ DateFnsUtils } locale={ fiLocale }>
      <TimePicker
        name='heraamisaika'
         value={ uni.heraamisaika }
        onChange={ (e) => muutaAika(e) }
        renderInput={(params) => <TextField {...params} label='Heräämisaika' required margin='normal' fullWidth/>}
/>

</LocalizationProvider>

      <TextField label='Minkälainen oli unen laatu?' name='unenlaatu' value={ uni.unenlaatu} margin='normal'
        onChange={ (e) => muuta(e) } multiline rows='4' required fullWidth />
		
     
		
      <TextField label='Miten nukahtaminen onnistui?' name='nukahtaminen' value={ uni.nukahtaminen } margin='normal'
        onChange={ (e) => muuta(e) } multiline rows='4' fullWidth />

<TextField label='Millaisia unia näit?' name='unet' value={ uni.unet } margin='normal'
        onChange={ (e) => muuta(e) } multiline rows='4' fullWidth />

<TextField label='Miten herääminen onnistui?' name='saa' value={ uni.heraaminen } margin='normal'
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
        <Button onClick={ (e) => lisaaUni(e) } variant='contained' sx={ {marginRight:3} } startIcon={ <CreateIcon /> }>Lisää</Button>
        <Button onClick={ (e) => tyhjenna(e) } variant='contained' color='secondary' startIcon={ <ClearIcon /> }>Tyhjennä</Button>
      </Box>
    </form>
    <Typography sx={ {marginTop: 3} }>{ viesti }</Typography>
    </Paper>
  );
}

export default LisaaUnimerkinta;