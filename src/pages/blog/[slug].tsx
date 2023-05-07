import Image from "next/image";
import { NextPage } from "next";

import BlogCategoryCard from "@/components/BlogCategoryCard/BlogCategoryCard";
import client from "@/lib/sanity";
import Blog from "@/models/blog";

interface BlogItemProps {
  blogPost: Blog;
}

const BlogItem: NextPage<BlogItemProps> = (props) => {
  const { blogPost } = props;

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      <div className={classNames.hero}>
        <div className={classNames.heroOverlay} />
        <div className={classNames.heroContent}>
          <div className="lg:w-3/4">
            <h1 className={classNames.title}>{blogPost.title}</h1>
            <p className={classNames.subtitle}>
              {blogPost.description.slice(0, 100)}...
            </p>
            <div className={classNames.author}>
              <Image
                width="200"
                height="200"
                className={classNames.authorAvatar}
                src={blogPost.author.image}
                alt={blogPost.author.name}
              />
              <p className={classNames.authorName}>{blogPost.author.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames.blogContentWrapper}>
        <div className={classNames.blogImageWrapper}>
          <Image
            width="200"
            height="200"
            src={blogPost.image.url}
            alt={blogPost.title}
            className={classNames.blogImage}
          />
        </div>
        <div className={classNames.blogMainContent}>
          <h2 className={classNames.blogTitle}>{blogPost.title}</h2>
          <p className={classNames.blogDate}>{formatDate(blogPost.date)}</p>
          <p className={classNames.blogText}>{blogPost.description}</p>
        </div>
      </div>

      <div className="max-w-screen-xl text-white text-center mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <h3 className="font-bold text-5xl mb-10">More Reads</h3>
        <p className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="px-6 pb-44 max-w-7xl mx-auto lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogCategories.map((blogCategory) => (
          <BlogCategoryCard
            key={blogCategory.name}
            slug={blogCategory.name}
            description={blogCategory.description}
            image={blogCategory.image}
            name={blogCategory.name}
          />
        ))}
      </div>
    </>
  );
};

export default BlogItem;

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "blog"].slug.current`);

  const paths = slugs.map((slug: string) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const { slug } = params;

  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    description,
    date,
    image {
      url
    },
    author -> {
      name, 
      image
    },
    isFeatured,
    slug { current }
  }`;

  const blogPost = await client.fetch(query, { slug });

  return {
    props: { blogPost },
  };
};

const classNames = {
  hero: "relative py-10 md:py-20 bg-[url('/image/trending.png')]",
  heroOverlay:
    "absolute inset-0 bg-gradient-to-b from-primary-dark to-transparent opacity-80",
  heroContent:
    "relative max-w-screen-xl mx-auto px-4 py-8 md:py-12 lg:px-8 lg:py-20",
  title:
    "text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white",
  subtitle: "mt-2 md:mt-4 max-w-3xl text-sm md:text-xl text-gray-300",
  author: "mt-4 md:mt-6 flex items-center",
  authorAvatar:
    "flex-shrink-0 object-cover h-8 md:h-10 w-8 md:w-10 rounded-full",
  authorName: "ml-2 md:ml-3 text-sm md:text-xl font-medium text-white",
  blogContentWrapper:
    "flex flex-col justify-between max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:flex-row lg:px-8",
  blogImageWrapper: "w-full lg:w-1/3",
  blogImage:
    "w-full h-full object-cover rounded-lg hover:translate-y-2 transition-all duration-500",
  blogMainContent: "w-full lg:w-2/3 mt-6 lg:mt-0 lg:pl-8",
  blogTitle: "text-3xl font-bold text-gray-300",
  blogDate: "mt-2 text-gray-200 text-sm",
  blogText: "mt-4 text-gray-200 leading-7",
};

const blogCategories = [
  {
    name: "Technology",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Explore the latest advancements in technology and discover how they impact our lives.",
  },
  {
    name: "Travel",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Experience new cultures, discover hidden gems, and plan your next adventure with our travel guides.",
  },
  {
    name: "Food",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description:
      "Find inspiration for your next meal, learn new recipes, and explore different cuisines from around the world.",
  },
];
