import React from "react";
import InstructorCard from "./InstructorCard";
import { InstructorType } from "@/app/types/_types";
interface InstructorItemType {
  instructors: InstructorType[];
}
export default function InstructorItem({ instructors }: InstructorItemType) {
    return (
    <>
      {instructors.map((instructor, index) => (
        <InstructorCard
        key={index}
          name={instructor.name}
          bio={instructor.bio}
          rating={instructor.rating}
          image={instructor.image}
        />
      ))}
    </>
  );
}
