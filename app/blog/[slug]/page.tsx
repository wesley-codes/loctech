import React from 'react'
import 'highlight.js/styles/github-dark.css'
import { getPostByName, getPostsMeta } from '@/app/lib/posts'
import AnimatedRoute from '@/app/components/AnimatedRoute'
import { Box, Grid, Typography } from '@/app/lib/mui'
import Image from "next/image"
type Props = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}

export async function generateMetadata({ params: { slug} }: Props) {

    const post = await getPostByName(`${slug}.mdx`) //deduped!

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.meta.title,
    }
}

export default async function page({ params: { slug } }: Props) {
    const post = await getPostByName(`${slug}.mdx`) //deduped!
console.log(post)

  return (
 <AnimatedRoute>
          <Box sx={{ p: { xs: "10px 25px", md: "20px 50px" } }}>

            
    <Grid container justifyContent="center" mt="2rem">
        <Typography variant="h5" textAlign="center" fontWeight="bold" color="#ff2883"> Published {post?.meta.date}</Typography>
    </Grid>

    <Grid container justifyContent="center" m="2rem 0">
        <Typography variant="h2" textAlign="center" fontWeight="bold"> {post?.meta.title}</Typography>
    </Grid>

  

    <Grid container m="5px 0">
            {post?.meta.tags.map((tag, index) => (
              <Box key={index} bgcolor=" #FDF2FA" p="1px 8px" borderRadius="15px" mr="5px" mt="1rem">
                <Typography variant="h6" color="#C11574">
                  {tag}
                </Typography>
              </Box>
            ))}
          </Grid>


          <Grid container item m="2rem 0">
          <Image
            src={post?.meta.metaImg!}
            width={500}
            height={500}
            alt="blog-image"
            style={{ objectFit: "cover" , height:"516px", width:"100%"}}
            priority
          />
        </Grid>

<Grid container justifyContent="center">
<Grid container justifyContent="center" item sm={6} md={8}  >
        <Typography variant="h5" textAlign="left" width="100%" borderBottom="1px solid #ccc" pb="2rem"> {post?.meta.intro}</Typography>
    </Grid>
<hr/>



</Grid>
<article className='mt-10'>
    {post?.content}
</article>
          </Box>

 </AnimatedRoute>
  )
}
