import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BlogCategoryCardProps {
  image: string;
  name: string;
  slug: string;
  description: string;
}

const BlogCategoryCard: FC<BlogCategoryCardProps> = (props) => {
  const { image, name, slug, description } = props;

  return (
    <div className={blogCategoryCardClassNames.categoryCard}>
      <Image
        width={200}
        height={200}
        className={blogCategoryCardClassNames.categoryImage}
        src={image}
        alt={name}
      />
      <h3 className={blogCategoryCardClassNames.categoryName}>{name}</h3>
      <p className={blogCategoryCardClassNames.categoryDescription}>
        {description.slice(0, 100)}...
      </p>
    </div>
  );
};

export default BlogCategoryCard;

const blogCategoryCardClassNames = {
  categoryCard: "w-full overflow-hidden bg-white p-6 rounded-lg shadow-md",
  categoryImage:
    "h-48 w-full object-cover rounded-lg mb-6 hover:scale-125 transition-all duration-500",
  categoryName: "text-xl font-bold mb-2",
  categoryDescription: "text-gray-500",
};
