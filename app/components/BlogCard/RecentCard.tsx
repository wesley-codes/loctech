"use client"
import { Box, Grid, Typography } from "@/app/lib/mui";
import React from "react";
import ArrowSVG from "../SVG/Arrow";
import Image from "next/image";
import { Meta } from "@/app/types/_types";
import Link from "next/link";
import { useSession } from "next-auth/react";
interface RecentProp {
  meta: Meta;
}

export default function RecentCard({ meta }: RecentProp) {
  const { status } = useSession();

  return (
    <Grid container item xs={12} m="1rem 0">
      <Grid container item>
        <Image
          src={meta.metaImg}
          width={400}
          height={400}
          alt="blog-image"
          style={{ objectFit: "cover", width: "100%", borderRadius: "10px" }}
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
          <Typography variant="h4" fontWeight="bold" m="8px 0">
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
            {meta.intro}{" "}
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
  );
}
