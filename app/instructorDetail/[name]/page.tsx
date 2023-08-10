"use client";
import AnimatedRoute from "@/app/components/AnimatedRoute";
import { Box, Grid, Typography } from "@/app/lib/mui";
import { InstructorType } from "@/app/types/_types";
import React from "react";
import Image from "next/image";
import StarRating from "@/app/components/Rating";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedinIcon from "@mui/icons-material/Linkedin";
import Link from "next/link";
import CustomButton from "@/app/components/Button";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";

type PageProps = {
  params: {
    name: string;
  };
};

async function getInstructorDetail(name: string) {
  const res = await fetch("/api/instructors/" + name, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json();
}

export default async function page({ params }: PageProps) {
  const instructorSlug = params.name;
  const { data: session } = useSession() as unknown as any;

  const instructor: InstructorType = await getInstructorDetail(instructorSlug);
  const [instructorData] = await Promise.all([instructor]);
  console.log(params.name);
  if (!instructorData) {
    notFound();
  }
  return (
    <AnimatedRoute>
      <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
        <Grid container justifyContent="center">
          <Box>
            <Image
              src={  instructorData.image == null  ?  "/profile.png" : instructorData.image}
              alt="image"
              height={200}
              width={200}
              blurDataURL="/spinner.svg"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </Box>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          margin="15px 0"
        >
          <Typography variant="h2" fontWeight="bold">
            {instructorData.name}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          margin="15px 0"
          flexDirection="column"
        >
          <Typography variant="h2" fontWeight="bold">
            {instructorData.rating}
          </Typography>
          <StarRating rating={4.6} />
        </Grid>

        <Grid
          container
          justifyContent="start"
          alignItems="center"
          margin="15px 0"
        >
          <Typography variant="h4" fontWeight="light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
            ratione! Tenetur molestias quo tempore assumenda explicabo, repellat
            nostrum praesentium itaque laudantium accusamus pariatur natus
            ducimus sint velit consequatur unde temporibus. Earum modi tenetur
            possimus nisi quos consequatur sapiente et vel ducimus iusto vero
            veniam, eaque, tempore nulla similique porro laborum ratione
            architecto provident? Cumque fugit sequi expedita obcaecati magnam
            maiores? Accusamus ullam accusantium explicabo, hic alias animi
            iure! Alias, odio. Eaque est atque obcaecati repellendus deserunt
            assumenda cumque blanditiis nesciunt tempora. Ab atque quibusdam,
            commodi fugit eum odio in harum.
          </Typography>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Link href="https://twitter.com/DaveyHert">
              <TwitterIcon />
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://twitter.com/DaveyHert">
              <FacebookIcon />
            </Link>{" "}
          </Grid>
          <Grid item>
            <Link href="https://twitter.com/DaveyHert">
              <LinkedinIcon />
            </Link>{" "}
          </Grid>

          <Grid item>
            <Link href="https://twitter.com/DaveyHert">
              <InstagramIcon />
            </Link>
          </Grid>
        </Grid>

  {  session?.user.role === "ADMIN" &&    <Link href={`forms/uploadInstructors?name=${instructorSlug}`}>
          <CustomButton
            title="Update Instructor"
            sx={{
              backgroundColor: "#ff539c",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#fff",
              m: "0 15px",
            }}
          />
        </Link>}
      </Box>
    </AnimatedRoute>
  );
}
