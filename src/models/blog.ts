type Blog = {
  image: { url: string };
  title: string;
  description: string;
  author: { name: string; image: string };
  date: string;
  _id: string;
  isFeatured: boolean;
  slug: { current: string };
  features?: string[]
};

export default Blog;
