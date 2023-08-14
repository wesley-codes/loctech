"use client";
import { Box, Button, Grid, Typography, useTheme } from "@/app/lib/mui";
import { tokens } from "@/app/lib/theme";
import { PostType } from "@/app/types/_types";
import { formatDate } from "@/app/utils/formatDate";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  blog: PostType;
}

export default function Card({ blog }: CardProps) {
  const imageURL =
    "https://a6e8z9v6.stackpathcdn.com/kingster/homepages/onlineacademy/wp-content/uploads/sites/4/2020/06/title-comscience.jpg";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const MotionBtn = motion(Button);
  const { data: session, status } = useSession() as unknown as any;

  return (
    <Grid
      container
      flexDirection="column"
      item
      xs={12}
      md={6}
      maxHeight="750px"
      m="10px 0"
    >
      <Box width="100%">
        <Image
          src={blog.image}
          alt="image"
          height={1000}
          width={1000}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </Box>

      <Grid container flexDirection="column" gap={1}    height={270}>
        <Typography variant="h2" fontWeight="bold" m="10px 0">
          {blog.title}
        </Typography>

        <Typography>
          <span> {formatDate(blog.createdAt!)} </span>{" "}
          <span> / BLOG / {blog.postSlug}</span>
        </Typography>

        <Box>
          <Typography variant="h5" className="line-clamp-4" m="10px 0">
            {blog.subtitle}
          </Typography>
        </Box>
      </Grid>

     <Grid container flexDirection="column" >
     <Link href={ status === "unauthenticated" ?  "/signIn":`/blogDetail/${blog.postSlug}`}>
        <MotionBtn
          whileHover={{ scale: 1.1, backgroundColor: colors.rose[600] }}
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: colors.rose[500],
            fontWeight: "bold",
            fontSize: "18px",
            color: colors.primary[900],
            cursor: "pointer",
          }}
        >
          Read More
        </MotionBtn>
      </Link>
     </Grid>
    </Grid>
  );
}



