"use client";
import React from "react";
import { Grid, Box, Typography, Button, useTheme } from "../../lib/mui";
import CourseHeader from "@/app/components/CourseHeader";
import CourseDesc from "@/app/components/CourseDesc";
import Perquisite from "@/app/components/Periquiste";
import Objectives from "@/app/components/Objectives";
import Audience from "@/app/components/Audience";
import Curriculum from "@/app/components/Curriculum";
import CourseTag from "@/app/components/CourseTag";
import AnimatedRoute from "@/app/components/AnimatedRoute";
import {
  CourseType,
  InstructorType,
  TransformedCourseType,
} from "@/app/types/_types";
import { notFound, redirect, useRouter } from "next/navigation";

import CustomButton from "@/app/components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import StarRating from "@/app/components/Rating";
type PageProps = {
  params: {
    slug: string;
  };
};

async function getCourseDetail(slug: string) {
  const res = await fetch("/api/course/" + slug, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json();
}

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

export default async function Page({ params }: PageProps) {
  //theme and styles
  const router = useRouter();

  const courseSlug = params?.slug;
  const { data: session } = useSession() as unknown as any;
  const courseData: TransformedCourseType = await getCourseDetail(courseSlug);
  const courseInstructor: InstructorType = await getInstructorDetail(
    courseData.Instructor.name
  );
  const [course, instructor] = await Promise.all([
    courseData,
    courseInstructor,
  ]);

  if (!course) {
    notFound();
  }
  console.log("instructor", instructor);

  const DeleteCourse = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetch("/api/course/" + courseSlug, {
      method: "DELETE",
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    router.back();
    console.log("Button clicked!");
  };

  return (
    <AnimatedRoute>
      <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
        <CourseHeader slug={courseSlug} />
        <Grid
          container
          columnSpacing={{ xs: 3, md: 5 }}
          rowSpacing={3}
          p="2rem 0"
        >
          <Grid container item xs={12} md={8}>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {" "}
                {courseData?.courseTitle}
              </Typography>
            </Box>
            <Grid
              container
              item
              xs={12}
              md={4}
              justifyContent="center"
              sx={{ display: { xs: "flex", md: "none" }, mt: "20px" }}
            >
              <CourseTag
                coursePrice={courseData?.coursePrice}
                duration={courseData?.duration!}
                method={courseData?.isOnline as unknown as string}
                category={courseData?.category}
                img={courseData?.imageSrc}
              />
            </Grid>

            {/* course description */}
            <Grid>
              <CourseDesc description={courseData?.description} />
              <Objectives objectives={courseData?.learningObj} />
              <Perquisite prerequisites={courseData?.prerequisites} />
              <Audience target={courseData?.targetAud} />
              <Curriculum curriculum={courseData.curriculumList} />
            </Grid>

            <Grid>
              <a href={courseData.curriculum} download>
                <Button>Click here to see curriculum</Button>
              </a>
            </Grid>

            <Grid container mt="15px" >
              <Grid container item xs={3}>
                <Image
                  src={
                    instructor.image == null ? "/profile.png" : instructor.image
                  }
                  alt="image"
                  height={200}
                  width={200}
                  blurDataURL="/spinner.svg"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius:"50px",
                  }}
                />
              </Grid>
              <Grid container item xs={9}  margin="15px 0"  >
                <Grid container>
                  <Typography variant="h3" fontWeight="bold">
                    {instructor.name}
                  </Typography>
                </Grid>
                <Grid container>
                  <StarRating rating={instructor.rating} />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              item
              columnSpacing={{ xs: 3, md: 5 }}
              rowSpacing={1}
              mt="2rem "
            >
              <CustomButton
                title="Delete Course"
                onClick={DeleteCourse}
                sx={{
                  m: "0 15px",
                }}
              />

              <Link href={`forms/uploadcourse?slug=${courseSlug}`}>
                <CustomButton
                  title="Update Course"
                  sx={{
                    m: "0 15px",
                  }}
                />
              </Link>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={4}
            justifyContent="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <CourseTag
              coursePrice={courseData?.coursePrice}
              duration={courseData?.duration!}
              method={courseData?.isOnline as unknown as string}
              category={courseData?.category}
              img={courseData?.imageSrc}
            />
          </Grid>
        </Grid>
      </Box>
    </AnimatedRoute>
  );
}
