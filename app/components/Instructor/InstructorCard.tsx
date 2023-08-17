import React from "react";
import { Grid, Typography } from "../../lib/mui";
import Image from "next/image";
import { InstructorType } from "@/app/types/_types";
import Link from "next/link";
interface InstructorCardProp {
  name?: string;
  bio?: string;
  rating?: number;
  image?: string;
}

export default function InstructorCard({
  name,
  bio,
  rating,
  image,
}: InstructorCardProp) {
  return (
    <Grid container item xs={12} md={6} lg={4} direction="row">
      <Link href={`/teamDetail/${name}`} style={{ width: "100%" }}>
        <Grid container>
          <Grid container item xs={12} md={3}>
            <Image
              height={100}
              width={100}
              alt="Instructor image "
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              blurDataURL="/spinner.svg"
              src={image == null ? "/profile.png" : image}
            />
          </Grid>
          <Grid item xs={12} md={9} p="0 5px">
            <Typography variant="h4" fontWeight="bold">
              {name}
            </Typography>
            <Typography sx={{ m: "8px 0" }}>{rating}/5.5</Typography>
            <Typography className="line-clamp-2">{bio}</Typography>
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
}
