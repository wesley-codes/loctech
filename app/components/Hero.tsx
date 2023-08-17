export const dynamic = "force-dynamic"; // this is the fix

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Grid, Typography, useTheme, Button } from "../lib/mui";
import Image from "next/image";
import { HeroType } from "../types/_types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { tokens } from "../lib/theme";

interface HeroProps {
  data: HeroType[];
}
export default function Hero({ data }: HeroProps) {
  const MotionGrid = motion(Grid);
  const MotionBtn = motion(Button);
  const { data: session } = useSession() as unknown as any;

  // console.log(process.env.NEXT_PUBLIC_DEVELOPMENT_URL);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // console.log("color =========", colors.rose , "theme=========", theme)
  return (
    <>
      {data.map((hero) => (
        <Grid
          key={hero?.id}
          container
          spacing={2}
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <Box mt={{xs:"5rem", md:"9rem"}}>
              <Typography variant="h1" fontWeight="bold">
                {hero.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" fontWeight="bold" m="8px 0">
                {hero.subtitle}
              </Typography>
            </Box>
            <Box>
              <MotionBtn
                whileHover={{ scale: 1.1, backgroundColor: colors.rose[600]}}
                variant="contained"
                size="large"
            
              >
                {hero.button}
              </MotionBtn>
            </Box>

            {session?.user.role === "ADMIN" && (
              <Box>
                <Link href={`forms/heroUpload?id=${hero.id}`}>
                  <MotionBtn
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: colors.rose[600],
                    }}
                    variant="contained"
                    size="large"
                    sx={{
              
                      fontSize: "18px",
                      cursor: "pointer",
                      mt:"10px"
                    }}
                  >
                    <ModeEditOutlineOutlinedIcon/>
                    Update Hero
                  </MotionBtn>
                </Link>
              </Box>
            )}
          </Grid>
          <MotionGrid
          container
            item
            xs={12}
            sm={6}
           columnSpacing={3}
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
           <Grid item  container flexDirection="column" xs={6} sm={6} alignItems="flex-end" justifyContent="flex-end">
           <Image
              src="/Rectangle 8.png"
              width={100}
              height={100}
              alt="pexels-cottonbro-studio-5083408.png"
         
              placeholder="blur"
              blurDataURL="/spinner.svg"
            />
           <Image
             src="/Rectangle 6.png"
              width={300}
              height={300}
              alt="pexels-cottonbro-studio-5083408.png"
              style={{
                objectFit:"cover",
               
               }}
              placeholder="blur"
              blurDataURL="/spinner.svg"
            />
           </Grid>




           <Grid item  container flexDirection="column" xs={6} sm={6} alignItems="flex-start">
           <Image
 src="/boy2.png"
               width={300}
              height={300}
              alt="pexels-cottonbro-studio-5083408.png"
              style={{
                objectFit:"cover",
            
               }}
              placeholder="blur"
              blurDataURL="/spinner.svg"
            />
           <Image
             src="/Union.png"
              width={100}
              height={100}
              alt="pexels-cottonbro-studio-5083408.png"
             
              placeholder="blur"
              blurDataURL="/spinner.svg"
            />
           </Grid>
          </MotionGrid>
        </Grid>
      ))}
    </>
  );
}
