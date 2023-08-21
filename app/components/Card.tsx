"use client";
import React from "react";
import { Box, Typography, Grid, useTheme, Button, imageListClasses } from "../lib/mui";
tokens;
import Image from "next/image";
import { tokens } from "../lib/theme";
import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  subtitle: string;
  btnText: string;
  initialX: string;
  link: string;
  image: string
}

export default function Card({
  title,
  subtitle,
  btnText,
  initialX,
  link,
  image
}: CardProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const MotionGrid = motion(Grid);
  const MotionBtn = motion(Button);
  return (
    <MotionGrid
      initial={{ x: initialX }}
      animate={{ x: 0 }}
      transition={{ ease: "easeIn", duration: 3 }}
      container
      item
      sx={{
        p: "15px",
        backgroundColor: colors.grey[900],
        borderRadius: "8px",
      }}
    >
      <Grid item xs={8} container alignItems="center" direction="row">
        <Box>
          <Box>
            <Typography variant="h4" fontWeight="bold">{subtitle}</Typography>
          </Box>
          <Box m="8px 0">
            <Typography variant="h6" lineHeight={1.5} >
              {title}
            </Typography>
          </Box>

          <Link href={link}>
            <Box>
              <MotionBtn
                whileHover={{ scale: 1.1, backgroundColor: colors.rose[600] }}
                variant="contained"
                size="large"
                sx={{
                  fontSize: "14px",
                }}
              >
                {btnText}
              </MotionBtn>
            </Box>
          </Link>
        </Box>
      </Grid>

      <Grid item xs={4} container alignItems="center" direction="row">
        <Image
          src={image}
          width={300}
          height={300}
          alt="classrom or online"
          style={{ height:"200px", borderRadius: "8px", objectFit: "cover" }}
        />
      </Grid>
    </MotionGrid>
  );
}
