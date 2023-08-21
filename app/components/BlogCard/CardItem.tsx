export const dynamic = "force-dynamic"; // this is the fix

import { Meta, PostType } from "@/app/types/_types";
import React from "react";
import Card from "./Card";
import prisma from "@/prisma/prisma";
import { getPostsMeta } from "@/app/lib/posts";

interface CardItem {
  meta: Meta[];
}

export default function CardItem({ meta }: CardItem) {
  return (
    <>
      {meta.slice(3).map((blog, index) => (
        <Card
          key={`${blog}${index}`}
          grid={4}
          meta={{
            id: blog.id,
            author: blog.author,
            date: blog.date,
            title: blog.title,
            tags: blog.tags,
            intro: blog.intro,
            metaImg: blog.metaImg,
          }}
        />
      ))}
    </>
  );
}
