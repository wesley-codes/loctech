export const dynamic = "force-dynamic"; // this is the fix
import React, { Suspense } from "react";
import { Box, Grid, Typography } from "../lib/mui";
import Image from "next/image";
import AnimatedRoute from "../components/AnimatedRoute";
import Card from "../components/BlogCard/Card";
import CardItem from "../components/BlogCard/CardItem";
import RecentCard from "../components/BlogCard/RecentCard";
import { getPostsMeta } from "../lib/posts";
import Spinner from "../components/Spinner";

export default async function Page() {
  const posts = await getPostsMeta();
console.log("posts", posts)
  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  return (
    <AnimatedRoute>
      <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
        <Grid container flexDirection="column" alignItems="center">
          <Grid>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#ff2883"
              textAlign="center"
            >
              Blog
            </Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              lineHeight={2}
            >
              Stay Up to-date With Industry Trends
            </Typography>
          </Grid>
        </Grid>

        <Grid>
          <Typography variant="h4" fontWeight="bold">
            Recent blog posts
          </Typography>
        </Grid>
        <Grid container>
          <Grid container item xs={12} md={6} pr={{ md: "2rem" }}>
            <RecentCard
              meta={{
                id: posts[0].id,
                author: posts[0].author,
                date: posts[0].date,
                title: posts[0].title,
                tags: posts[0].tags,
                intro: posts[0].intro,
                metaImg: posts[0].metaImg,
              }}
            />
          </Grid>

          <Grid container item xs={12} md={6} columnSpacing={2}>
            <Card
              grid={12}
              meta={{
                id: posts[1].id,
                author: posts[1].author,
                date: posts[1].date,
                title: posts[1].title,
                tags: posts[1].tags,
                intro: posts[1].intro,
                metaImg: posts[1].metaImg,
              }}
            />
            <Card
              grid={12}
              meta={{
                id: posts[2].id,
                author: posts[2].author,
                date: posts[2].date,
                title: posts[2].title,
                tags: posts[2].tags,
                intro: posts[2].intro,
                metaImg: posts[2].metaImg,
              }}
            />
          </Grid>
        </Grid>

        <Grid>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="#ff2883"
            textAlign="start"
          >
            Popular Blogs
          </Typography>
        </Grid>
        <Grid
          container
          columnSpacing={{ xs: 3, md: 5 }}
          rowSpacing={3}
          p="2rem 0"
        >
          <Suspense fallback={<Spinner/>}>
          <CardItem meta={posts} />
          </Suspense>
     
        </Grid>
      </Box>
    </AnimatedRoute>
  );
}
