import { useEffect, useState } from "react";
import useSWR from "swr";
type Posts = {
  id: string;
  body: string;
  title: string;
};

const LastSalePage = () => {
  // const [posts, setPosts] = useState<Posts[] | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const url = "https://jsonplaceholder.typicode.com/posts";
  const fetcher = () => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(url, fetcher);

  // useEffect(() => {
  //   getData();
  //   setIsLoading(true);
  // }, []);

  // const getData = async () => {
  //   const url = "https://jsonplaceholder.typicode.com/posts";
  //   const res = await fetch(url);
  //   const data = await res.json();

  //   setIsLoading(false);
  //   setPosts(data);
  //   return data;
  // };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data?.map((post: Posts) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default LastSalePage;
