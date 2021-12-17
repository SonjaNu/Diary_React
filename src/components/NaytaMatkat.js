import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function NaytaMatkat (props) {
  
  return (
    <Grid container spacing={4} sx={{ marginTop:1}}>
      { props.matkatietotaulukko.map(matka => {
          return (
            <Grid item key={ matka.id }>
              <Card>
              <CardHeader
                title={ matka.otsikko.toUpperCase() }
                subheader={ matka.pvm } />

              <CardContent>
                { matka.kuva ?
                  <CardMedia sx={ {height: 100, width: 200} }
                    image={ matka.kuva }
                    title={ matka.otsikko } />
                  : 
                  <Typography>Ei kuvaa</Typography>
                }

                <Typography>{ matka.paikat }</Typography>
                <Typography>{ matka.saa }</Typography>
                <Typography>{ matka.kuvaus }</Typography>
              </CardContent>
 
              <CardActions>
                  <IconButton color='primary'><EditIcon /></IconButton>
                  <IconButton><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        )
      })
    }
    </Grid>
  )
}

export default NaytaMatkat;
