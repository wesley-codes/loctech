"use client";
import React from "react";
import { Grid, Typography, useTheme } from "../lib/mui";
import { tokens } from "../lib/theme";

export default function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid>
      <Grid container justifyContent="center">
        <Grid container justifyContent="center">
          <Typography variant="h5" color={colors.rose[500]} fontWeight="bold">
            The team
          </Typography>
        </Grid>
        <Grid container justifyContent="center" m="1rem 0">
          <Typography variant="h3" fontWeight="bold">
            Meet the team behind LocTech{" "}
          </Typography>
        </Grid>

        <Grid container justifyContent="center" item xs={12} md={6} >
          <Typography variant="h5" textAlign="center">
            We&apos;re a small team that loves to create great experiences and make
            meaningful connections between builders and customers. Join our
            team!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
