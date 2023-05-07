import { NextApiRequest, NextApiResponse } from "next";

const blogContent = [
  {
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada velit eu enim facilisis, at varius nulla congue. Vestibulum pharetra urna euismod, hendrerit dolor eget, bibendum purus.",
    author: "John Doe",
    date: "April 25, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Praesent id velit nec felis congue suscipit eu et ipsum",
    description:
      "Praesent id velit nec felis congue suscipit eu et ipsum. Aliquam congue mi eu urna efficitur vestibulum. Donec euismod, ex ut suscipit tristique, nibh nibh venenatis nulla, quis aliquam neque ex a nunc.",
    author: "Jane Smith",
    date: "April 23, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Etiam cursus dui a neque vulputate consectetur",
    description:
      "Etiam cursus dui a neque vulputate consectetur. In ultrices eros quis enim consectetur, vitae gravida tellus hendrerit. Ut vel efficitur sapien. Sed rhoncus hendrerit sapien vitae venenatis.",
    author: "Mike Johnson",
    date: "April 20, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title:
      "Suspendisse potenti. Fusce fermentum lorem et est elementum, a pharetra turpis tincidunt.",
    description:
      "Suspendisse potenti. Fusce fermentum lorem et est elementum, a pharetra turpis tincidunt. Nam porttitor nisi nec leo molestie, eu ullamcorper velit malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce vel velit eget elit lobortis elementum non eget elit.",
    author: "Sarah Lee",
    date: "April 18, 2023",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(blogContent);
  } else {
    res.status(400).json({ message: "Unsupported method" });
  }
}
