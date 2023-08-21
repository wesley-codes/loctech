"use client";
import React, { Suspense } from "react";
import { Box, Grid, Typography, useTheme } from "../lib/mui";
import AnimatedRoute from "../components/AnimatedRoute";
import Image from "next/image";

import { tokens } from "../lib/theme";
import AboutHero from "../components/AboutHero";
import Vision from "../components/Vision";
import Specilization from "../components/Specilization";
import Team from "../components/Team";
export default function Page() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <AnimatedRoute>
      <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
        <AboutHero />
        <Grid mt="2rem">
          <Typography variant="h4" color={colors.rose[500]} fontWeight="bold">
            Get to know us
          </Typography>
          <Typography variant="h3" m="15px 0">
            We&apos;re just getting started
          </Typography>
          <Box>
            <Image
              src="/Frameblur.png"
              alt=""
              width={1000}
              height={1000}
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Vision />
      </Box>
        <Specilization/>
     
    </AnimatedRoute>
  );
}
