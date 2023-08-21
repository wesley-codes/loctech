import { JSXElementConstructor, ReactElement } from "react";

export type FeaturedCourseArrType = {
  id?: string;
  img: string;
  level?: string;
  title: string;
  author?: string;
  price: string;
  description: string;
  slug: string;
};

export type CourseType = {
  id?: string;
  courseTitle: string;
  description: string;
  courseSlug: string;
  coursePrice: number;
  category: string;
  isFeatured: string;
  isTrending: string;
  isOnline: string;
  prerequisites: { name: null | string }[];
  learningObj: { name: null | string }[];
  curriculumList: { name: null | string }[];
  targetAud: { name: null | string }[];
  video: string | null;
  imageSrc: string;
  duration: number;
  curriculum: string;
  Instructor: { name: string };
};

// Define a type that transforms 'learningObj' to an array of strings
export type TransformedCourseType = CourseType & {
  learningObj: string[];
  prerequisites: string[];
  targetAud: string[];
  curriculumList: string[];
};
export interface OptionProps {
  value: string;
  label: string;
}

export type LoginType = {
  email: string;
  password: string;
};

export type SignUpType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type InstructorType = {
  name: string;
  email: string;
  image: string;
  bio: string;
  rating: number;
  reviews: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  reviewer: string;
  reviewerImage: string | null;
  reviewerComment: string;
};

export type HeroType = {
  id?: string;
  title: string;
  subtitle: string;
  button: string;
  image: string;
};

export type TestimonialType = {
  name: string;
  image: string;
  review: string;
};

export type PostType = {
  title: string;
  subtitle: string;
  postSlug: string;
  image: string;
  content: string;
  author: {
    name: string;
  };
  createdAt?: string;
};

export type AuthorType = {
  id: string;
  name: string;
  image?: string;
};

export type Meta = {
  id: string;
  author: string;
  title: string;
  date: string;
  tags: string[];
  intro: string;
  metaImg: string
};

export type BlogPost = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};
