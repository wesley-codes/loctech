"use client";
import Header from "@/app/components/Header";
import { Box, Grid, TextField } from "@/app/lib/mui";
import { instructorSchema } from "@/app/lib/yup";
import { InstructorType } from "@/app/types/_types";
import { ImageUpload } from "@/app/utils/ImageAndVideoUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { redirect, useSearchParams } from "next/navigation";
import BasicModal from "@/app/components/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export default function Page() {
  const { data: session } = useSession() as unknown as any;
  const [error, setError] = React.useState("");
  const searchParams = useSearchParams();
  const instructorParam = searchParams.get("name");
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    if (session?.user.role !== "ADMIN") {
     redirect("/"); //redirect if role is not ADMIN
    }
  },[session?.user.role]);


  console.log(instructorParam?.trim());
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<InstructorType>({
    // resolver: yupResolver(instructorSchema),
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      rating: 3.5,
      reviews: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      reviewer: "",
      reviewerImage: "",
      reviewerComment: "",
     image: "",
    },
  });

  useEffect(() => {
    if (instructorParam) {
      //if param exist fetch databyslug

      axios
        .get<InstructorType>(`/api/instructors/` + instructorParam)
        .then((response) => {
          if (response.data) {
            setValue("name", response.data.name);
            setValue("bio", response.data.bio);
            setValue("email", response.data.email);
            setValue("rating", response.data.rating);
            setValue("facebook", response.data.facebook);
            setValue("twitter", response.data.twitter);
            setValue("instagram", response.data.instagram);
            setValue("linkedin", response.data.linkedin);
            setValue("image", response.data.image);
          }
        })
        .catch((error) => {
          console.log("postparam insude useEffext", instructorParam, error);
        });
    }
  }, [instructorParam, setValue]);

  const instructorImageSrc = watch("image");
  const reviewerImageSrc = watch("reviewerImage");

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onSubmitHandler = (values: InstructorType) => {
    const data = {
      ...values,
      rating:Number(values.rating),
      image: instructorImageSrc,
    };
    console.log(typeof values.rating);
    if (session.user.role === "ADMIN") {
      if (instructorParam) {
        axios
          .patch(`/api/instructors/${instructorParam}`, data)
          .then((response) => {
            // Request was successful
            if (response.data) {
              console.log("Updated Seuccesfully");
              setIsError(false);
              setOpen(true);             
               reset();
            }
          })
          .catch((error) => {
            // An error occurred
            setError("An error occurred");
            setIsError(true);
            setOpen(true);          });
      } else {
        axios
          .post("/api/instructors", data)
          .then((response) => {
            // Request was successful
            if (response.data) {
              console.log("Updated Seuccesfully");
              setIsError(false);
              setOpen(true);

              reset();
            }
          })
          .catch((error) => {
            // An error occurred
            setError("An error occurred");
            console.error("An error occured");
            setIsError(true);
            setOpen(true);
          });
      }
    }
  };

  return (
    <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
      {isError ? (
        <BasicModal
          color="red"
          icon={<ErrorOutlineIcon sx={{ color: "red", fontSize: "30px" }} />}
          title="Post did not upload !"
          description="An error occurred. Try again"
          open={open}
          handleClose={handleClose}
        />
      ) : (
        <BasicModal
          color="green"
          icon={
            <CheckCircleOutlineIcon sx={{ color: "green", fontSize: "30px" }} />
          }
          title="Post uploaded successful!"
          description="congratulations !. Your Post have been uploaded"
          open={open}
          handleClose={handleClose}
        />
      )}
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container rowSpacing={3} columnSpacing={3} mb="2rem">
          <Grid container item>
            <Header title="Add Instructor" btnText="Upload Instructor" />
            <hr />
          </Grid>
          <Grid container item xs={12} md={4}>
            <TextField
              id="name"
              error={!!errors.name}
              placeholder="JohnDoe"
              label="name"
              helperText={errors.name?.message}
              variant="outlined"
              autoComplete="false"
              fullWidth
              {...register("name")}
            />
          </Grid>

          <Grid container item xs={12} md={4}>
            <TextField
              id="email"
              error={!!errors.email}
              placeholder="JohnDoe @gmail.com"
              label="Email"
              helperText={errors.email?.message}
              variant="outlined"
              fullWidth
              {...register("email",{required:"This field is required"})}
            />
          </Grid>

          <Grid container item xs={12} md={4}>
            <TextField
              id="reviewer"
              placeholder="John"
              label="Reviewer"
              variant="outlined"
              fullWidth
              {...register("reviewer")}
            />
          </Grid>

          <Grid container item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Bio"
              multiline
              placeholder="Instructor's bio"
              rows={10}
              fullWidth
              {...register("bio")}
            />
          </Grid>

          <Grid container item xs={12} md={4} rowSpacing={3} columnSpacing={3}>
            <Grid container item>
              <TextField
                id="rating"
                // error={!!errors.email}
                placeholder="4.5"
                label="Rating"
                // helperText={errors.email?.message}
                variant="outlined"
                fullWidth
                {...register("rating")}
              />
            </Grid>

            <Grid container item>
              <TextField
                id="facebook"
                // error={!!errors.email}
                placeholder="Facebook"
                label="Facebook"
                // helperText={errors.email?.message}
                variant="outlined"
                autoComplete="false"
                fullWidth
                {...register("facebook")}
              />
            </Grid>

            <Grid container item>
              <TextField
                id="twitter"
                // error={!!errors.email}
                placeholder="4.5"
                label="Twitter"
                // helperText={errors.email?.message}
                variant="outlined"
                fullWidth
                {...register("twitter")}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} md={8}>
            <TextField
              id="outlined-multiline-static"
              label="Review"
              multiline
              placeholder="Instructor's review"
              rows={10}
              fullWidth
              {...register("reviews")}
            />
          </Grid>
          <Grid container item xs={12} md={12}>
            <TextField
              id="linkedin"
              label="Linkedin"
              placeholder="Linkedin"
              fullWidth
              {...register("linkedin")}
            />
          </Grid>

          <Grid container item xs={12} md={12}>
            <TextField
              id="outlined-multiline-static"
              label="Reviewer Comment"
              multiline
              placeholder="ReviewerComment"
              rows={10}
              fullWidth
              {...register("reviewerComment")}
            />
          </Grid>

          <Grid
            container
            item
            rowSpacing={3}
            columnSpacing={{ xs: 0, md: 3 }}
            direction="row"
          >
            <Grid item container xs={12} md={6}>
    
<ImageUpload
                    onChange={(value) => setCustomValue("reviewerImage", value)}
                    value={reviewerImageSrc}
                    register={register}
                    error={errors}
                    placeholder="Course Image"
                  />
            </Grid>
            <Grid item container xs={12} md={6}>
              <ImageUpload
                onChange={(value) => setCustomValue("image", value)}
                value={instructorImageSrc}
                register={register}
                error={errors}
                placeholder="Instructor Image"
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}












