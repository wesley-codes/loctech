"use client";
import React from "react";
import { Grid, Box, Typography } from "../lib/mui";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TransformedCourseType } from "../types/_types";

interface CurriculumProps {
  curriculum: string[];
}

export default function Curriculum({ curriculum }: CurriculumProps) {
  return (
    <Grid
      item
      xs={12}
      md={8}
      m="2rem 0"
      columnSpacing={{ xs: 3, md: 5 }}
      rowSpacing={1}
    >
      <Grid container item justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Curriulum
        </Typography>
        <Typography fontWeight="bold">12 weeks</Typography>
      </Grid>
      <Grid item>
        {curriculum.map((curriculum, index) => (
          <Grid
          key={`${curriculum}${index}`}
            container
            item
            justifyContent="space-between"
            alignItems="center"
            m="15px 0"
          >
            
          <Grid item xs={11}>  
          <Typography fontSize="16px" fontWeight="normal" className="line-clamp-1">
              {" "}
              {curriculum}
            </Typography>
            </Grid>

            <Grid item xs={1} justifyContent="end">
              <LockOutlinedIcon />
            </Grid >
          </Grid>
        ))}
   
      </Grid>
    </Grid>
  );
}
