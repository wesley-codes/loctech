"use client";

import React from "react";
import { Grid, Typography, useTheme } from "../lib/mui";
import Image from "next/image";
import { tokens } from "../lib/theme";

export default function Vision() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid container m="2rem 0" justifyContent="space-between" rowSpacing={4}>
      <Grid
        container
        item
        xs={12}
        md={5.5}
        flexDirection="column"
        mr={{ md: "2rem" }}
      >
        <Typography variant="h2" color={colors.rose[500]} fontWeight="bold">
          Our Vision and Our Mission
        </Typography>
        <Grid container m="2rem 0">
          <Image
            src="/Manonwhite.jpg"
            alt=""
            width={1000}
            height={1000}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Grid>
        <Typography variant="h3" fontWeight="bold" m="1rem 0">
          Growth Induced Environment
        </Typography>

        <Typography variant="h5">Our Vision</Typography>
      </Grid>
      <Grid container item xs={12} md={5.5} flexDirection="column">
        <Typography variant="h5" lineHeight={1.5}>
          Welcome to Loctech, a leading IT Training Institute specializing in
          software development, data science, Microsoft Office, Cisco, Cyber
          Security and project management. At Loctech, we are committed to
          empowering individuals and organizations with the knowledge and skills
          necessary to excel in the ever-evolving field of information
          technology.
        </Typography>
        <Grid container m="2rem 0" >
          <Image
            src="/MenOnWhite.jpg"
            alt=""
            width={1000}
            height={1000}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Grid>
        <Typography variant="h3" fontWeight="bold" m="1rem 0">
          Practical Experience{" "}
        </Typography>

        <Typography variant="h5">Our Vision</Typography>
      </Grid>
    </Grid>
  );
}
