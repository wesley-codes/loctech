export const dynamic = "force-dynamic"; // this is the fix
"use client";
import Header from "@/app/components/Header";
import BasicModal from "@/app/components/Modal";
import { Box, Grid, TextField } from "@/app/lib/mui";
import { postSchema } from "@/app/lib/yup";
import { AuthorType, PostType } from "@/app/types/_types";
import { ImageUpload } from "@/app/utils/ImageAndVideoUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface PageProps {
  searchParams: {
    slug: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const postParam = searchParams.slug;

  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { data: session } = useSession() as unknown as any;
  const [fetchedBlogData, setFetchedBlogData] = useState<PostType>();
  // console.log(fetchedBlogData);

  useEffect(() => {
    if (postParam) {
      //if param exist fetch databyslug
      const fetchBlogBySlug = async () => {
        const res = await fetch(`/api/post/${postParam}`, {
          method: "GET",
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data: PostType = await res.json();

        setValue("title", data.title);
        setValue("subtitle", data.subtitle);
        setValue("image", data.image);
        setValue("content", data.content);
        setValue("author",{name:data.author.name})
  // Check if the author data exists before setting the value

    // setValue('author', {name:data.author.name} );

        setFetchedBlogData(data);
      };

      fetchBlogBySlug();
    }
  }, [postParam]);


  console.log(fetchedBlogData)

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<PostType>({
    defaultValues: {
      title: "",
      subtitle: "",
      postSlug: postParam || "",
      image: "",
      content: "",
      author: {
        name: "",
      },
    },
  });
  const postImgSrc = watch("image");

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmitHandler = (values: PostType) => {
    // const data = {
    //   ...values,
    //   postSlug: postParam ? postParam : values.postSlug.trim(),
    //   image: postImgSrc,

  
    // };
    console.log(values);
    // if (session.user.role === "ADMIN") {
    //   if (postParam) {
    //     axios
    //       .patch(`/api/post`, data)
    //       .then((response) => {
    //         console.log(response);
    //         if (response.data) {
    //           setIsError(false);
    //           setOpen(true);
    //           reset();
    //         }
    //       })
    //       .catch((error) => {
    //         // An error occurred
    //         // setError("An error occurred");
    //         console.error(error);
    //         // An error occurred
    //         setIsError(true);
    //         setOpen(true);
    //       });
    //   } else {
    //     axios
    //       .post(`/api/post`, data)
    //       .then((response) => {
    //         console.log(response);
    //         if (response.data) {
    //           setIsError(false);
    //           setOpen(true);
    //           reset();
    //         }
    //       })
    //       .catch((error) => {
    //         // An error occurred
    //         // setError("An error occurred");
    //         console.error(error);
    //         // An error occurred
    //         setIsError(true);
    //         setOpen(true);
    //       });
    //   }
    // }
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
        <Header
          title={!postParam ? "Add Blog Post" : "Update Blog Post"}
          btnText={!postParam ? "ADD BLOG" : "UPDATE BLOG"}
        />
        <Grid container m="1rem 0">
          <Grid container item rowSpacing={3} columnSpacing={{ xs: 0, md: 3 }}>
            <Grid container item xs={12} xl={6}>
              <TextField
                fullWidth
                label="Title"
                {...register("title", {
                  required: "Field is required",
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid container item xs={12} xl={6}>
              <TextField
                fullWidth
                label="Slug"
                {...register("postSlug", {
                  required: "Field is required",
                })}
                error={!!errors.postSlug}
                helperText={errors.postSlug?.message}
              />
            </Grid>
            <Grid container item xs={12} xl={6}>
              <TextField
                fullWidth
                label="Author"
                {...register("author.name", {
                  required: "Field is required",
                })}
              
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            </Grid>

            <Grid item container xs={12} md={6}>
              <ImageUpload
                onChange={(value) => setCustomValue("image", value)}
                value={postImgSrc!}
                register={register}
                error={errors}
                placeholder="Post Image"
              />
            </Grid>

            <Grid container item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="subtitle"
                multiline
                placeholder="Subtitle"
                rows={10}
                fullWidth
                {...register("subtitle", {
                  required: "Field is required",
                })}
                error={!!errors.subtitle}
                helperText={errors.subtitle?.message}
              />
            </Grid>

            <Grid container item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                placeholder="Content"
                rows={20}
                fullWidth
                {...register("content", {
                  required: "Field is required",
                })}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
