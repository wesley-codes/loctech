"use client";
import { Grid, Box, TextField, useTheme } from "../../lib/mui";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Draft from "../../components/Draft";
import DropDown from "../../components/DropDown";
import CourseStepper from "../../components/CourseStepper";
import DynamicField from "../../components/DynamicField";
import { EditorState } from "draft-js";
import convertTime from "../../utils/ConvertTime";
import { useFieldArray, useForm } from "react-hook-form";
import { CourseType, OptionProps } from "../../types/_types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ImageUpload, VideoUpload } from "@/app/utils/ImageAndVideoUpload";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import BasicModal from "@/app/components/Modal";
import { redirect, useRouter } from "next/navigation";
import { booleanOptions, categoryOptions } from "@/app/utils/data";
import { tokens } from "@/app/lib/theme";
import { useSearchParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();

  const colors = tokens(theme.palette.mode);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session } = useSession() as unknown as any;
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("slug");

  // const [editorState, setEditorState] = useState(EditorState.createEmpty()); //wysiwyg state
  // const [editorError, setEditorError] = useState(false); //wysiwyg error state

  useEffect(() => {
    if (session?.user.role !== "ADMIN") {
      redirect("/"); //redirect if role is not ADMIN
    }
  }, [session?.user.role]);

 
  const {
    //useForm Hook
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
  } = useForm<CourseType>({
    // resolver:yupResolver(courseSchema) ,

    defaultValues: {
      courseTitle: "",
      description: "",
      courseSlug: "",
      Instructor: { name: "" },
      coursePrice: 0,
      category: "",
      isFeatured: "false",
      isTrending: "false",
      isOnline: "false",
      imageSrc: "",
      prerequisites: [{ name: null }],
      learningObj: [{ name: null }],
      curriculumList: [{ name: null }],
      video: "",
      duration: 0,
      curriculum: "",
      targetAud: [{ name: null }],
    },
  });

  useEffect(() => {
    setLoading(true);
    if (courseSlug) {
      //if param exist fetch databyslug
      axios
        .get<CourseType>(`/api/course/` + courseSlug)
        .then((response) => {
          if (response.data) {
            //setting all values from the backend
            setValue("courseTitle", response.data.courseTitle);
            setValue("description", response.data.description);
            setValue("courseSlug", response.data.courseSlug);
            setValue("Instructor", response.data.Instructor);
            setValue("coursePrice", response.data.coursePrice);
            setValue("category", response.data.category);
            setValue("isFeatured", response.data.isFeatured);
            setValue("isTrending", response.data.isTrending);
            setValue("isOnline", response.data.isOnline);
            setValue("imageSrc", response.data.imageSrc);
            setValue("prerequisites", response.data.prerequisites);
            setValue("curriculumList", response.data.curriculumList);
            setValue("learningObj", response.data.learningObj);
            setValue("targetAud", response.data.targetAud);
            setValue("curriculum", response.data.curriculum);
            setValue("imageSrc", response.data.imageSrc);
            setValue("video", response.data.video);
            setValue("Instructor", { name: response.data.Instructor?.name });
          }
        })
        .catch((error) => {
          console.log("postparam insude useEffext", courseSlug, error);
        });
    }
    setLoading(false);
  }, [courseSlug, setValue,]);

  const {
    fields: prerequisitesField,
    append: prerequisitesAppend,
  } = //dynamic array for prerequisites textfield
    useFieldArray({
      control,
      name: "prerequisites",
    });

  const imageSrc = watch("imageSrc");
  const videoSrc = watch("video");
  const duration = watch("duration");
  const setCustomValue = useCallback(
    (id: any, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  useEffect(() => {
    if (window !== undefined) {
      if (videoSrc && videoRef.current) {
        videoRef.current.addEventListener("loadedmetadata", () => {
          setCustomValue("duration", convertTime(videoRef.current?.duration)!); //get duration if the file string is avaliable and theres a video ref. And also convert duration properly
        });
      }
    }
  }, [videoRef, videoSrc, setCustomValue]);

  const { fields: learningObjField, append: learningObjAppend } = useFieldArray(
    //dynamic array for learningObjField
    {
      control,
      name: "learningObj",
    }
  );

  const { fields: curriculumField, append: curriculumAppend } = useFieldArray({
    //dynamic array for curriculumfield
    control,
    name: "curriculumList",
  });

  const { fields: targetAudField, append: targetAudAppend } = useFieldArray({
    //dynamic array for targetAudField
    control,
    name: "targetAud",
  });

  // const onChangeDraftHandler = (value: EditorState) => {
  //   //wysiwyg onChange event
  //   //  draft onchange handler
  //   setEditorState(value);
  // };

  // const validateEditorContent = (editorState: EditorState) => {
  //   //checking is wysiwyg has text
  //   const contentState = editorState.getCurrentContent();
  //   const hasText = contentState.hasText();
  //   return hasText;
  // };

  //////////////PREREQUISTE

  const onAppendPrerequisitesHandler = () => {
    //function to add an empty textfield
    prerequisitesAppend({ name: "".trim() });
  };

  const onAppendLearningObjHandler = () => {
    //function to add an empty textfield
    learningObjAppend({ name: "" });
  };

  const onAppendCurriculumListHandler = () => {
    //function to add an empty textfield
    curriculumAppend({ name: "" });
  };

  const onAppendTargetAudHandler = () => {
    //function to add an empty textfield
    targetAudAppend({ name: "" });
  };

  ////////FILE INPUT

  const submitHandler = (values: CourseType) => {
    const data = {
      ...values,
      imageSrc: imageSrc,
      courseSlug: values.courseSlug.trim(),

      coursePrice: +values.coursePrice,
      isFeatured: values.isFeatured === "true", //converting the string values to boolen
      isTrending: values.isTrending === "true", //converting the string values to boolen
      isOnline: values.isOnline === "true", //converting the string values to boolen
      description: values.description,
      //if courseParam is true pass in the  respective array values than spreading them
      prerequisites: courseSlug
        ? values.prerequisites
        : values.prerequisites.map(({ name }) => name?.trim()), // converting   prerequisites from array of objects to array of strings
      curriculumList: courseSlug
        ? values.curriculumList
        : values.curriculumList.map(({ name }) => name?.trim()),
      learningObj: courseSlug
        ? values.learningObj
        : values.learningObj.map(({ name }) => name?.trim()),
      targetAud: courseSlug
        ? values.targetAud
        : values.targetAud.map(({ name }) => name?.trim()),

      video: videoSrc,
      duration: duration,
      Instructor: {
        name: values.Instructor.name,
      },
    };
    console.log(data);
    if (session.user.role === "ADMIN") {
      if (courseSlug) {
        setLoading(true);
        axios
          .patch(`/api/course/${courseSlug}`, data)
          .then((response) => {
            // Request was successful
            if (response.data) {
              setIsError(false);
              setOpen(true);
              router.push("/courses");
            }
          })
          .catch((error) => {
            // An error occurred
            setIsError(true);
            setOpen(true);
          });
        setLoading(false);
      } else {
        setLoading(true);

        axios
          .post("/api/course", data)
          .then((response) => {
            // Request was successful
            if (response.data) {
              setIsError(false);
              setOpen(true);
              reset();
            }
          })
          .catch((error) => {
            // An error occurred
            setIsError(true);
            setOpen(true);
          });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>
{loading && <Spinner/>}
      {loading  ?  (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="fixed inset-0 bg-gray-800 opacity-50"></div>

              <div className="bg-white p-6 rounded shadow-lg w-64">
                <Spinner />
                <div className="mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) :      



        <form onSubmit={handleSubmit(submitHandler)}>
          <Header title={courseSlug ?"Update this course": "Add Course"} btnText={courseSlug ?"Update Course" : "Upload course" }/>
          <hr />


          {isError ? (
            <BasicModal
              color="red"
              icon={
                <ErrorOutlineIcon sx={{ color: "red", fontSize: "30px" }} />
              }
              title="Course did not upload !"
              description="An error occurred. Try again"
              open={open}
              handleClose={handleClose}
            />
          ) : (
            <BasicModal
              color="green"
              icon={
                <CheckCircleOutlineIcon
                  sx={{ color: "green", fontSize: "30px" }}
                />
              }
              title="Course uploaded successful!"
              description="congratulations !. Your course have been uploaded"
              open={open}
              handleClose={handleClose}
            />
          )}

          <Grid container m="1rem 0">
            <CourseStepper title="Course Information" number={1} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <Grid container item xs={12} md={6}>
                <Input
                  label="Title of course"
                  id="course-title"
                  type="text"
                  register={register("courseTitle", {
                    required: "Field is required",
                  })}
                  name="courseTitle"
                  error={!!errors.courseTitle}
                  helperText={errors.courseTitle?.message}
                />
              </Grid>
              <Grid container item xs={12} md={6}>
                <Input
                  register={register("courseSlug", {
                    required: "Field is required",
                  })}
                  label="Slug"
                  id="Slug-title"
                  type="text"
                  name="courseSlug"
                  error={!!errors.courseSlug}
                  helperText={errors.courseSlug?.message}
                />
              </Grid>
              <Grid container item xs={12} md={6}>
                <Input
                  label="Course price"
                  name="coursePrice"
                  register={register("coursePrice", {
                    required: "Field is required",
                  })}
                  id="Course-price"
                  type="number"
                  error={!!errors.coursePrice}
                  helperText={errors.coursePrice?.message}
                />
              </Grid>
              <Grid container item xs={12} md={6}>
                <DropDown
                  placeHolder="Select course category"
                  options={categoryOptions}
                  register={register("category", {
                    required: "Field is required",
                  })}
                  error={!!errors.category}
                  errorMessage={
                    errors.category && (
                      <p style={{ color: "red" }}>{errors.category.message}</p>
                    )
                  }
                  control={control}
                  setValue={setValue}
                  name="category"
                />
              </Grid>
              <Grid container item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="description"
                  multiline
                  placeholder="Course description"
                  rows={30}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                  {...register("description", {
                    required: "This filed id required",
                  })}
                  sx={{
                    border: `2px solid ${colors.rose[500]}`,
                    borderRadius: "8px",
                  }}
                />
              </Grid>
              {/* <Draft
                  initialContent={editorState}
                  name="description"
                  editorState={editorState}
                  setValue={setValue}
                  onChange={onChangeDraftHandler}
                  error={errors}
                  register={register("description")}
                />
                {editorError && (
                  <p style={{ color: "red" }}>This field is required</p>
                )} */}
            </Grid>
            {/* Course Featured */}
            <CourseStepper title="Featured Course" number={2} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <Grid container item xs={12} md={4}>
                <DropDown
                  placeHolder="does this course have a feature ?"
                  options={booleanOptions}
                  register={register("isFeatured", {
                    required: "Field is required",
                  })}
                  error={!!errors.isFeatured}
                  errorMessage={
                    errors.isFeatured && (
                      <p style={{ color: "red" }}>
                        {errors.isFeatured.message}
                      </p>
                    )
                  }
                  // defaultValue="false"
                  setValue={setValue}
                  name="isFeatured"
                  control={control}
                />
              </Grid>
              <Grid container item xs={12} md={4}>
                <DropDown
                  placeHolder="Is course online ?"
                  options={booleanOptions}
                  register={register("isOnline", {
                    required: "Field is required",
                  })}
                  error={!!errors.isOnline}
                  errorMessage={
                    errors.isOnline && (
                      <p style={{ color: "red" }}>{errors.isOnline.message}</p>
                    )
                  }
                  // defaultValue="false"
                  setValue={setValue}
                  name="isOnline"
                  control={control}
                />
              </Grid>

              <Grid container item xs={12} md={4}>
                <DropDown
                  placeHolder="Is course trending ?"
                  options={booleanOptions}
                  register={register("isTrending", {
                    required: "Field is required",
                  })}
                  error={!!errors.isTrending}
                  errorMessage={
                    errors.isTrending && (
                      <p style={{ color: "red" }}>
                        {errors.isTrending.message}
                      </p>
                    )
                  }
                  // defaultValue="false"
                  setValue={setValue}
                  name="isTrending"
                  control={control}
                />
              </Grid>
            </Grid>

            {/* Course Prequisiite */}

            <CourseStepper title="Course Prerequisites" number={3} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <DynamicField
                label="Add Prerequisites Objectives"
                fields={prerequisitesField}
                registeredName="prerequisites"
                register={register}
                onAppendHandler={onAppendPrerequisitesHandler}
                btnText="Add Prerequisites"
                error={errors.prerequisites}
                params={courseSlug}
                helperText={errors.prerequisites?.message}
              />
            </Grid>
            {/* Learning Objectives */}
            <CourseStepper title=" Learning Objectives " number={4} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <DynamicField
                label="Add Learning Objectives"
                fields={learningObjField}
                registeredName="learningObj"
                register={register}
                onAppendHandler={onAppendLearningObjHandler}
                btnText="Add Learning Obj"
                params={courseSlug}
                error={errors.learningObj}
                helperText={errors.learningObj?.message}
              />
            </Grid>
            {/* curriculum List */}
            <CourseStepper title=" Course Curriculum" number={5} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <DynamicField
                label="Add Course Curriculum List"
                fields={curriculumField}
                registeredName="curriculumList"
                register={register}
                params={courseSlug}
                onAppendHandler={onAppendCurriculumListHandler}
                btnText="Add Curriculum List"
                error={errors.curriculumList}
                helperText={errors.curriculumList?.message}
              />
            </Grid>

            {/* Target audience */}
            <CourseStepper title=" Target audience" number={6} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <DynamicField
                label="Add Target Audience"
                fields={targetAudField}
                registeredName="targetAud"
                register={register}
                params={courseSlug}
                onAppendHandler={onAppendTargetAudHandler}
                btnText="Add Target Audience"
                error={errors.targetAud}
                helperText={errors.targetAud?.message}
              />
            </Grid>

            {/* Curriculum */}
            <CourseStepper title="Add Curriculm & Instructor" number={7} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <Grid container item xs={12} md={6}>
                <Input
                  register={register("curriculum", {
                    required: "Field is required",
                  })}
                  label="Curriculum"
                  id="curriculum"
                  type="text"
                  name="curriculum"
                 
                  error={!!errors.curriculum}
                  helperText={errors.curriculum?.message}
                />
              </Grid>

              <Grid container item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Instructor"
                  {...register("Instructor.name", {
                    required: "Field is required",
                  })}
                  error={!!errors.Instructor}
                  helperText={errors.Instructor?.message}
                  variant="filled"
                />
              </Grid>
            </Grid>

            {/* Course Media */}
            <CourseStepper title=" Course Media" number={8} />
            <Grid
              container
              item
              rowSpacing={3}
              columnSpacing={{ xs: 0, md: 3 }}
            >
              <Grid container item xs={12} md={6}>
                <ImageUpload
                  onChange={(value) => setCustomValue("imageSrc", value)}
                  value={imageSrc}
                  register={register}
                  error={errors}
                  placeholder="Course Image"
                />
              </Grid>

              <Grid container item xs={12} md={12} direction="column">
                <VideoUpload
                  onChange={(value: string) => setCustomValue("video", value)}
                  duration={(value: number) =>
                    setCustomValue("duration", value)
                  }
                  value={videoSrc}
                  register={register}
                  error={errors}
                  ref={videoRef as unknown as any}
                  placeholder="Course Video"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
        }
      </Box>
      )
    </>
  );
}
