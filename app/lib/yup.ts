"use client";

import * as yup from "yup";

const passwordRegex = `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{};':\"\\|,.<>/?]).{8,}$`;

console.log(typeof passwordRegex);

export const courseSchema = yup.object().shape({
  courseTitle: yup.string().required("This field is required"),
  courseSlug: yup.string().required("This field is required"),
  coursePrice: yup.number().required("This field is required"),
  category: yup.string().required("This field is required"),
  isFeatured: yup.boolean().required("This field is required"),
  description: yup.string().required("This field is required"),

  isTrending: yup.boolean().required("This field is required"),

  isOnline: yup.boolean().required("This field is required"),

  prerequisites: yup.array().of(
    yup.object().shape({
      name: yup.string().required("field is required"),
    })
  ),
  learningObj: yup.object().shape({
    name: yup.string().required("field is required"),
  }),
  curriculum: yup.object().shape({
    name: yup.string().required("field is required"),
  }),
  video: yup.string().required("Video is required"),
  image: yup.string().required("Image is required"),
  duration: yup.string().required("Image is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Enter your email"),
  password: yup.string().min(8).max(32).required(),
});

export const SignUpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Enter your email"),
  password: yup.string().min(8).max(32).required("Enter your password"),
  confirmPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});


export const  instructorSchema = yup.object().shape({
name: yup.string().required("This field is required"),
bio: yup.string(),
email: yup.string().email("Invalid email"),
image: yup.string(),
rating: yup.number(),
reviews: yup.string(),
facebook: yup.string(),
twitter:yup.string(),
instagram: yup.string(),
linkedin: yup.string(),
reviewer: yup.string(),
reviewerImage: yup.string(),
reviewerComment: yup.string(),
})