import Image from "next/image";
import { useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";

import BlogCard from "@/components/BlogCard/BlogCard";
import BlogCategoryCard from "@/components/BlogCategoryCard/BlogCategoryCard";
import Blog from "@/models/blog";
import client from "@/lib/sanity";
import { Category } from "@/models/category";

interface BlogPageProps {
  blogPosts: Blog[];
  categories: Category[];
  featuredPost: Blog;
}

const Blog: NextPage<BlogPageProps> = (props) => {
  const { blogPosts, categories, featuredPost } = props;

  // const [blogData, setBlogData] = useState([]);

  // useEffect(() => {
  //   async function fetchBlogData() {
  //     const res = await fetch("/api/blog");
  //     const data = await res.json();
  //     setBlogData(data);
  //   }

  //   fetchBlogData();
  // }, []);

  return (
    <>
      <section className={blogSectionClasses.container}>
        <h2 className={blogSectionClasses.heading}>Blog</h2>
        <p className={blogSectionClasses.subheading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className={blogSectionClasses.categoriesContainer}>
          {categories.map((blogCategory) => (
            <BlogCategoryCard
              key={blogCategory.name}
              description={blogCategory.description}
              image={blogCategory.image}
              name={blogCategory.name}
              slug={blogCategory.slug.current}
            />
          ))}
        </div>
      </section>

      <div className={featuredPostSectionClasses.container}>
        <div className={featuredPostSectionClasses.imageContainer}>
          <Image
            width={200}
            height={100}
            className={featuredPostSectionClasses.image}
            src={featuredPost.image.url}
            alt={featuredPost.title}
          />
        </div>
        <div className={featuredPostSectionClasses.contentContainer}>
          <h2 className={featuredPostSectionClasses.title}>
            {featuredPost.title}
          </h2>
          <p className={featuredPostSectionClasses.description}>
            {featuredPost.description.slice(0, 150)}...
          </p>
          {featuredPost.features?.map((feature) => (
            <div
              key={feature}
              className={featuredPostSectionClasses.featuresContainer}
            >
              <span className={featuredPostSectionClasses.featureTick}>
                &#10003;
              </span>
              <span className={featuredPostSectionClasses.feature}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((blog: Blog) => (
          <BlogCard
            key={blog.title}
            author={blog.author}
            date={blog.date}
            description={blog.description}
            image={blog.image.url}
            title={blog.title}
            slug={blog.slug.current}
          />
        ))}
      </div>
    </>
  );
};

export default Blog;

export async function getStaticProps(context: NextPageContext) {
  const categoryQuery = `*[_type == "category"] {
    name,
    slug { current },
    image,
    description,
    _id
  }`;

  const blogQuery = `*[_type == "blog"] {
    description,
    title,
    slug { current },
    image { url },
    isFeatured,
    date,
    author,
    _id
  }`;

  const featuredBlogQuery = `*[_type == 'blog' && isFeatured == true] {
    _id,
    image {url},
    title,
    description,
    slug {current},
    features,
    author,
    date,
    isFeatured
  }`;

  async function getAuthor(authorRef: { _ref: string }) {
    const query = `*[_type == 'author' && _id == $authorId][0] {name, image}`;
    const params = { authorId: authorRef._ref };
    const author = await client.fetch(query, params);
    return author;
  }

  const blogPosts = await client.fetch(blogQuery);
  const categories = await client.fetch(categoryQuery);
  const [featuredPost] = await client.fetch(featuredBlogQuery);

  for (const post of blogPosts) {
    post.author = await getAuthor(post.author);
  }

  return {
    props: {
      blogPosts,
      categories,
      featuredPost,
    },
    revalidate: 3600,
  };
}

const blogSectionClasses = {
  container: "pb-8 pt-40 text-primary-dark px-4 lg:px-36",
  heading: "text-4xl font-bold mb-6",
  subheading: "text-gray-200 text-lg mb-12",
  categoriesContainer:
    "flex flex-col lg:flex-row gap-8 justify-between items-center",
};

const featuredPostSectionClasses = {
  container:
    "py-20 text-white px-6 lg:px-36 flex flex-col lg:flex-row items-center justify-center",
  imageContainer: "w-full lg:w-2/3 order-2 lg:order-1",
  image: "w-full h-full object-cover rounded-lg shadow-md",
  contentContainer: "w-full lg:w-1/3 lg:pl-12 order-1 lg:order-2",
  title: "text-4xl font-bold mb-6",
  description: "text-gray-500 text-lg mb-8",
  featuresContainer: "flex items-center mb-2",
  featureTick: "text-green-500 mr-2",
  feature: "text-gray-500",
};
