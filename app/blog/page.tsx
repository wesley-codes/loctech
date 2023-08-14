export const dynamic = "force-dynamic"; // this is the fix

import React, { Suspense } from "react";
import { Box, Grid } from "../lib/mui";
import Image from "next/image";
import AnimatedRoute from "../components/AnimatedRoute";
import Card from "../components/BlogCard/Card";
import prisma from "@/prisma/prisma";
import CardItem from "../components/BlogCard/CardItem";
import { PostType } from "../types/_types";
import Spinner from "../components/Spinner";
async function getBlog() {
  const blog = await prisma.post.findMany();
  if (!blog) {
    return null;
  }
  return blog;
}

export default async function Blog() {
  const imageURL =
    "https://a6e8z9v6.stackpathcdn.com/kingster/homepages/onlineacademy/wp-content/uploads/sites/4/2020/06/title-comscience.jpg";

  const blogData = await getBlog();
  const [blog] = await Promise.all([blogData]);

  return (
    <AnimatedRoute>
      <Grid container>
        <Image
          src={imageURL}
          alt="image"
          height={1000}
          width={1000}
          style={{ width: "100%", height: "400px" }}
        />
      </Grid>
      <Grid
        container
        item
        sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}
        rowSpacing={3}
        columnSpacing={{ xs: 0, md: 3 }}
      >
        <Suspense fallback={<Spinner />}>
          <CardItem blogs={blog as unknown as PostType[]} />
        </Suspense>
      </Grid>
    </AnimatedRoute>
  );
}
