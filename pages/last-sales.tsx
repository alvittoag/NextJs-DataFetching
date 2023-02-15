import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
type Posts = {
  id: string;
  body: string;
  title: string;
};

type Props = {
  posts: Posts[];
};

const LastSalePage = ({ posts }: Props) => {
  const [dataPosts, setDataPosts] = useState(posts);
  const url = "https://jsonplaceholder.typicode.com/posts";
  const fetcher = () => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    setDataPosts(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {dataPosts?.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
};

export default LastSalePage;

export const getStaticProps: GetStaticProps = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(url);
  const data = await res.json();

  return { props: { posts: data }, revalidate: 10 };
};
