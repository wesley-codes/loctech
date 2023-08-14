"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Grid, TextField, Typography } from "../../lib/mui";
import Header from "@/app/components/Header";
import { Controller, useForm } from "react-hook-form";
import { HeroType } from "@/app/types/_types";
import { yupResolver } from "@hookform/resolvers/yup";
import { heroSchema } from "@/app/lib/yup";
import { useSession } from "next-auth/react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { ImageUpload } from "@/app/utils/ImageAndVideoUpload";
import { revalidateTag } from "next/cache";
import Spinner from "@/app/components/Spinner";
interface PageProps {
  searchParams: {
    id: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const heroID = searchParams.id;
  const [error, setError] = React.useState("");
  const { data: session } = useSession() as unknown as any;
  const [loading, setLoading] = useState(true);
  console.log("loading state", loading);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<HeroType>({
    resolver: yupResolver(heroSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      button: "",
      image: "",
    },
  });
  const imageSrc = watch("image");

  useEffect(() => {
    if (heroID) {
      setLoading(true);
      //if param exist fetch databyslug
      axios
        .get<HeroType>(`/api/hero/` + heroID)
        .then((response) => {
          if (response.data) {
            console.log("loading state in useEffect", loading);

            //setting all values from the backend
            setValue("title", response.data.title);
            setValue("image", response.data.image);
            setValue("subtitle", response.data.subtitle);
            setValue("button", response.data.button);
          }
          setLoading(false);
        })

        .catch((error) => {
          console.log("postparam insude useEffext", heroID, error);
          setLoading(false);
        });
    }
    setLoading(false);
  }, [heroID, setValue, loading]);

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (session?.user.role !== "ADMIN") {
      // if currrent user is not ADMIN redirect to HomePage
      redirect("/");
    }
  }, [session]);

  const onSubmitHandler = (values: HeroType) => {
    const data = { ...values, image: imageSrc };
    if (session.user.role === "ADMIN") {
      setLoading(true);

      axios
        .patch(`/api/hero/${heroID}`, data)
        .then((response) => {
          // Request was successful
          if (response.data) {
            reset();
            redirect("/");
          }
        })
        .catch((error) => {
          // An error occurred
          setError("An error occurred");
          console.error(error);
          setLoading(false);
        });
    }
  };

  return (
    <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Header
            title={heroID ? "Update Text" : "Add Hero"}
            btnText={heroID ? "Update Hero Text" : "Add Hero Text"}
          />
          <Grid container m="1rem 0">
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <Grid container item xs={12}>
                <TextField
                  fullWidth
                  value={heroID}
                  label="Id"
                  {...register("id")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  variant="filled"
                />
              </Grid>

              <Grid container item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  variant="filled"
                />
              </Grid>
              {/* subtitle */}
              <Grid container item xs={12}>
                <TextField
                  fullWidth
                  label="Subtitle"
                  {...register("subtitle")}
                  error={!!errors.subtitle}
                  helperText={errors.subtitle?.message}
                  variant="filled"
                />
              </Grid>
              {/* ButtonText */}
              <Grid container item xs={12}>
                <TextField
                  fullWidth
                  label="Button Text"
                  {...register("button")}
                  error={!!errors.button}
                  helperText={errors.button?.message}
                  variant="filled"
                />
              </Grid>
              {/* Image */}

              <>
                <Grid item direction="column">
                  <ImageUpload
                    onChange={(value) => setCustomValue("image", value)}
                    value={imageSrc}
                    register={register}
                    error={errors}
                    placeholder="Hero Image"
                  />
                  {!!errors.image && (
                    <Typography color="red">This field is required</Typography>
                  )}
                </Grid>
              </>
            </Grid>
            <Grid></Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
}
