import { GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export type Products = {
  id: string;
  title: string;
  description?: string;
};

type Props = {
  products: Products[];
};

const HomePage = ({ products }: Props) => {
  return (
    <ul>
      {products.map((product) => (
        <Link key={product.id} href={`/${product.id}`}>
          <li>{product.title}</li>
        </Link>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("(Re-) Generating");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) return { redirect: { destination: "/no-data", permanent: false } };
  if (data.products.length === 0) return { notFound: true };

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default HomePage;
