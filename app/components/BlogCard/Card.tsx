"use client";
import {
  Box,
  Button,
  Grid,
  GridSize,
  Typography,
  useTheme,
} from "@/app/lib/mui";
import { tokens } from "@/app/lib/theme";
import { Meta, PostType } from "@/app/types/_types";
import { formatDate } from "@/app/utils/formatDate";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowSVG from "../SVG/Arrow";

interface CardProps {
  grid?: boolean | GridSize | undefined;
  meta: Meta;
}

export default function Card({ grid, meta }: CardProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const MotionBtn = motion(Button);
  const { status } = useSession();

  return (
    <>
      <Grid container item xs={12} sm={6} md={grid} m="20px 0">
        <Grid container item>
          <Image
            src={meta.metaImg}
            width={670}
            height={670}
            alt="blog-image"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Grid>
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="flex-start"
          m="15px 0"
        >
          <Typography variant="h6">
            {" "}
            {meta.author} • {meta.date}
          </Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              m="8px 0"
              className="line-clamp-1"
              width="80%"
            >
              {meta.title}
            </Typography>

           <Link href={status == "unauthenticated" ? "/signIn" :`/blog/${meta.id}`}>
           <Box>
              <ArrowSVG />
            </Box>
           </Link>
          </Grid>
          <Grid container>
            <Typography
              variant="h6"
              className="line-clamp-2"
              color="#667085"
              m="5px 0"
            >
              {meta.intro}
            </Typography>
          </Grid>

          <Grid container m="5px 0">
            {meta.tags.map((tag, index) => (
              <Box key={index} bgcolor=" #FDF2FA" p="1px 5px" borderRadius="15px" mr="5px">
                <Typography variant="h6" color="#C11574">
                  {tag}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
