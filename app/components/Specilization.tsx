import React from "react";
import { Box, Button, Grid, Typography, useTheme } from "../lib/mui";
import { tokens } from "../lib/theme";
import Image from "next/image";
import SpecilizationCard from "./SpecilizationCard";
import { motion } from "framer-motion";

export default function Specilization() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const MotionBtn = motion(Button);

  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ backgroundColor: colors.grey[900] }}
      p={{ xs: "2rem", md: "5rem 4rem" }}
    >
      <Grid item xs={12} md={6}>
        <Typography color={colors.rose[500]} variant="h5">
          Our Specilization
        </Typography>

        <Typography variant="h2" fontWeight="bold" m="2rem 0">
          We Are The Best
        </Typography>

        <Typography variant="h4">
          Our shared values guide us as one team, while producing the best
          results for you.
        </Typography>

        <Grid container flexDirection="row" columnSpacing={3}>
          <SpecilizationCard
            title="Comprehensive Curriculum"
            icon="/BookIcon.png"
            subtitle="Covers all essential aspects and provides a slid foundation."
          />

          <SpecilizationCard
            title="Experienced Instructors"
            subtitle="Brings real world experiences to the classroom. ensuring students receive industry knowledge and guidance."
            icon="/users.png"
          />
        </Grid>

        <Grid container flexDirection="row" columnSpacing={3}>
          <SpecilizationCard
            title="Industry Partnerships"
            subtitle="Partner with various industris to provide practical and up-to-date training"
            icon="/Trending.png"
          />

          <SpecilizationCard
            title="Career Support"
            subtitle="Dedicated to student success beyond the classroom."
            icon="/smile.png"
          />
        </Grid>
      </Grid>
      <Grid container xs={12} md={5} justifyContent="flex-end">
        <Image
          src="/Guybrown.jpg"
          alt=""
          width={500}
          height={500}
          style={{
            objectFit: "cover",
            width: "100%",
          }}
        />
      </Grid>
      <Grid container justifyContent={{xs:"center",md:"flex-start" }} alignItems="center" m="2rem 0">
        <MotionBtn
          whileHover={{ scale: 1.1, backgroundColor: colors.rose[600] }}
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: colors.rose[500],
            fontWeight: "bold",
            fontSize: "18px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Enroll Now
        </MotionBtn>
      </Grid>
    </Grid>
  );
}
