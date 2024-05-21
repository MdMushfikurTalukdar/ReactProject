import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export default function DashboardCard() {

  return (
    <Card sx={{ display: 'flex',width:{xs:"350px",lg:"400px",sm:"320px"},border:"1px solid purple",backgroundColor:"#fffff",color:"#cc39cc" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="p" style={{fontSize:"1.5rem"}}>
            Object Oriented Programming
          </Typography>
         
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant='contained' style={{backgroundColor:"#cc39cc",borderRadius:"20px"}}>View</Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 230,height:170 }}
        image="https://mui.com/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
