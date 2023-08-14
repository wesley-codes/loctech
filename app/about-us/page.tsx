"use client";
import React from "react";
import { Box, Grid, Typography, useTheme } from "../lib/mui";
import AnimatedRoute from "../components/AnimatedRoute";
import Image from "next/image";
import AboutUs1 from "../components/SVG/aboutUs1";
import AboutGrad from "../components/SVG/aboutus2";
import AlumniIcon from "../components/SVG/aboutus3";
import { tokens } from "../lib/theme";
export default function Page() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <AnimatedRoute>
      <Grid position="relative">
        <Image
          src="https://a6e8z9v6.stackpathcdn.com/kingster/homepages/onlineschool/wp-content/uploads/sites/3/2020/06/iStock-1139704046.jpg"
          alt="image"
          height={1000}
          width={1000}
          style={{ width: "100%", height: "700px", objectFit: "cover" }}
        />
        <div className="overlay">
          <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
            <Grid
              container
              justifyContent="center"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Typography variant="h4" color="#fff">
                Know Us Better
              </Typography>

              <Typography variant="h1" fontWeight="bold" color="#fff">
                About Us
              </Typography>
            </Grid>
          </Box>
        </div>
      </Grid>

      <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
        {/* //About us 1 */}
        <Grid
          container
          justifyContent="space-between"
          m={{ xs: "2rem 0", md: "0" }}
        >
          <Grid
            container
            item
            xs={12}
            md={5}
            flexDirection="column"
            justifyContent="center"
            rowSpacing={{ xs: "10" }}
          >
            <Box>
              <AboutUs1 />
            </Box>
            <Grid container item>
              <Typography
                variant="h2"
                fontWeight="bold"
                color={colors.rose[500]}
              >
                Special Campus Tour
              </Typography>
            </Grid>
            <Grid container item>
              <Typography fontSize={20}>
                Campus on a tour designed for prospective graduate and
                professional students. You will see how our university like,
                facilities, studenst and life in this university. Meet our
                graduate admissions representative to learn more about our
                graduate programs and decide what it the best for you.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Image
              src="https://a6e8z9v6.stackpathcdn.com/kingster/homepages/onlineschool/wp-content/uploads/sites/3/2020/06/iStock-1135306875.jpg"
              alt="image"
              height={1000}
              width={1000}
              style={{ width: "100%", height: "700px", objectFit: "cover" }}
            />
          </Grid>
        </Grid>

        {/* //About us 2 */}
        <Grid
          container
          justifyContent="space-between"
          flexDirection="row-reverse"
          m={{ xs: "2rem 0", md: "0" }}
        >
          <Grid
            container
            item
            xs={12}
            md={5}
            flexDirection="column"
            justifyContent="center"
            rowSpacing={{ xs: "10" }}
          >
            <Box>
              <AboutGrad />
            </Box>
            <Grid container item>
              <Typography
                variant="h2"
                fontWeight="bold"
                color={colors.rose[500]}
              >
                Graduation
              </Typography>
            </Grid>
            <Grid container item>
              <Typography fontSize={20}>
                Campus on a tour designed for prospective graduate and
                professional students. You will see how our university like,
                facilities, studenst and life in this university. Meet our
                graduate admissions representative to learn more about our
                graduate programs and decide what it the best for you.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Image
              src="https://a6e8z9v6.stackpathcdn.com/kingster/homepages/onlineschool/wp-content/uploads/sites/3/2020/06/iStock-539246041.jpg"
              alt="image"
              height={1000}
              width={1000}
              style={{ width: "100%", height: "700px", objectFit: "cover" }}
            />
          </Grid>
        </Grid>

        {/* //About us 3*/}
        <Grid
          container
          justifyContent="space-between"
          m={{ xs: "2rem 0", md: "0" }}
        >
          <Grid
            container
            item
            xs={12}
            md={5}
            flexDirection="column"
            justifyContent="center"
            rowSpacing={{ xs: "10" }}
          >
            <Box>
              <AlumniIcon />
            </Box>
            <Grid container item>
              <Typography
                variant="h2"
                fontWeight="bold"
                color={colors.rose[500]}
              >
                Powerful Alumni{" "}
              </Typography>
            </Grid>
            <Grid container item>
              <Typography fontSize={20}>
                Campus on a tour designed for prospective graduate and
                professional students. You will see how our university like,
                facilities, studenst and life in this university. Meet our
                graduate admissions representative to learn more about our
                graduate programs and decide what it the best for you.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Image
              src="https://a6e8z9v6.stackpathcdn.com/kingster/homepages/onlineschool/wp-content/uploads/sites/3/2020/06/iStock-1198229796.jpg"
              alt="image"
              height={1000}
              width={1000}
              style={{ width: "100%", height: "700px", objectFit: "cover" }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            {" "}
            <AboutGrad />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AboutGrad />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AboutGrad />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AboutGrad />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AboutGrad />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AboutGrad />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AboutGrad />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AboutGrad />
          </Grid>
        </Grid>
      </Box>
    </AnimatedRoute>
  );
}
