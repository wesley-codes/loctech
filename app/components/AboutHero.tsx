import React from "react";
import { Box, Grid, Typography } from "../lib/mui";
import Image from "next/image";

export default function AboutHero() {
  return (
    <Grid container flexDirection="row" mt={{xs:"2rem", md:"1rem"}}>
      <Grid container item xs={12} md={4} alignItems="center">
        <Box>
        <Typography variant="h2" fontWeight="bold">
          Welcome To Loctech
        </Typography>

        <Typography variant="h5" lineHeight={2}>
          a leading I.T. training institute empowering individuals and
          businesses through technology education
        </Typography>
        </Box>
      </Grid>
   
      <Grid container item xs={12}  md={8} justifyContent="flex-end">
        <Grid
          container
          md={6}
          sm={8}
          justifyContent="center"
          alignItems="baseline"
          columnSpacing={1}
        >
          <Grid item>
            <Image
              src="/Image1.png"
              alt=""
              width={150}
              height={150}
              style={{
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item>
            <Image
              src="/Image2.png"
              alt=""
              width={150}
              height={150}
              style={{
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          flexDirection="row"
          justifyContent="end"
          alignItems="flex-start"
          columnSpacing={1}
          mt="10px"
        >
          <Grid item container xs={4} md={2}>
            <Image
              src="/Image3.png"
              alt=""
              width={150}
              height={150}
              style={{
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item container xs={4} md={2}>
            <Image
              src="/Image4.png"
              alt=""
              width={150}
              height={150}
              style={{
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item container xs={4} md={2}>
            <Image
              src="/Image5.png"
              alt=""
              width={150}
              height={150}
              style={{
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
