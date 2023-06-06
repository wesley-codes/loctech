"use client";
import React from "react";
import { Grid, Box, Typography } from "../lib/mui";
import Image from "next/image";
import CourseTagItem from "./CourseTagItem";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
export default function CourseTag() {
  return (
    <Grid item xs={12} >
      <Image
        src="/smiling-young-african-college-student-doing-KYGJVRW (1).png"
        alt="courseimage"
        width={200}
        height={200}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderTopRightRadius: "8px",
          borderTopLeftRadius: "8px",
        }}
      />
      <Grid
        
        sx={{ boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.2)" }}
      >
        <Grid sx={{p:"15px 0"}}>
          <Typography variant="h4" fontWeight="bold" m="0 15px">
            {" "}
            N85,000
          </Typography>
        </Grid>
        <CourseTagItem
          title="Category"
          subtitle="Data Science"
          color="gray"
          icon={<ListAltOutlinedIcon className="mr-2 " />}
        />
        <CourseTagItem
          title="Duration"
          subtitle={`12 Hours`}
          color="gray"
          icon={<HourglassEmptyOutlinedIcon className="mr-2 " />}
        />

        <CourseTagItem
          title="Method"
          subtitle="Online"
          color="gray"
          icon={<SummarizeOutlinedIcon className="mr-2 " />}
        />
      </Grid>
    </Grid>
  );
}
