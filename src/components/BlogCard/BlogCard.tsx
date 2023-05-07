import Image from "next/image";
import { FC } from "react";

import blogCardClassNames from "./blogCardClassNames";
import Link from "next/link";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  author: { name: string; image: string };
  date: string;
  slug: string;
}

const BlogCard: FC<BlogCardProps> = (props) => {
  const { image, title, description, author, date, slug } = props;

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <Link href={`/blog/${slug}`}>
      <div className={blogCardClassNames.card}>
        <div className={blogCardClassNames.imageContainer}>
          <Image
            width="100"
            height="100"
            className={blogCardClassNames.image}
            src={image}
            alt={title}
          />
        </div>
        <div className={blogCardClassNames.textContainer}>
          <h2 className={blogCardClassNames.title}>{title}</h2>
          <p className={blogCardClassNames.description}>
            {description.slice(0, 200)}...
          </p>
          <div className={blogCardClassNames.metaContainer}>
            <p className={blogCardClassNames.author}>By {author.name}</p>
            <p className={blogCardClassNames.date}>{formatDate(date)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
