import React, { useState, useEffect } from 'react';


export default function Biisi () {
const [biisi, setBiisi] = useState('');
const [linkki, setLinkki] = useState('');
const [viesti, setViesti] = useState('Haetaan päivän biisiä...');
const fetchUrl = async () => {
try {
const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.publicradio.org%2Fpublic_feeds%2Fsong-of-the-day%2Frss%2Frss');
const json = await response.json();
setBiisi(json.items[0].title); 
setLinkki(json.items[0].enclosure.link); 
setViesti(''); //kun haku onnistuu, tyhjennetään tilamuuttuja viesti
} catch (error) {
setViesti('Biisiä ei voinut hakea.');
}
}
useEffect( () => { fetchUrl() }, [] );

if (viesti.length > 0) { return (<div>{ viesti }</div>) };  

return ( <div> Päivän biisi on: { biisi }<br /> Linkki päivän biisiin: -{ linkki }- </div> );  
}


/*haettavat tiedot json-muodossa:

"items":[ {
"title": "Graveyard Club - It Hurts",
"enclosure": {"link":"https://play.podtrac.com/APMSongOfTheDay/play.publicradio.org/rss/d/podcast/minnesota/the_current/song_of_the_day/2
019/05/02/20190502_graveyard_club_it_hurts_128.mp3"}
} ] */