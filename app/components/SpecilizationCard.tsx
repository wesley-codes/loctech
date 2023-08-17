import React from 'react'
import { Box, Grid, Typography } from '../lib/mui'
import Image from "next/image";

interface SpecilizationCardProp{
  title: string
  icon: string
  subtitle:string
}
export default function SpecilizationCard({title, icon, subtitle}:SpecilizationCardProp) {
  return (
    <Grid  item container  flexDirection="column" alignItems="flex-start" xs={6} m="1rem 0">
    <Box
      bgcolor="#fff"
      borderRadius="50px"
      p="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={40}
      height={40}
    >
      <Image
        src={icon}
        alt=""
        width={30}
        height={30}
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
    <Typography variant="h4" fontWeight="bold" m="1rem 0" >
    {title}
    </Typography>
    <Typography variant="h5" lineHeight={2}>
    {subtitle}
    </Typography>
  </Grid>
  )
}
