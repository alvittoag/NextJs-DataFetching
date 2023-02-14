import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";
import { Products } from ".";

type ProductId = {
  pid: string;
};

type Params = {
  params: ProductId;
};

type Props = {
  filteredProduct: Products;
};

const ProductDetailPage = ({ filteredProduct }: Props) => {
  if (!filteredProduct) return <p>Loading...</p>;
  return (
    <>
      <h1>{filteredProduct.title}</h1>
      <p>{filteredProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context as Params;

  const productId = params.pid;

  const data = await getData();

  const filteredProduct = data.products.find(
    (product: Products) => product.id === productId
  );

  if (!filteredProduct) return { notFound: true };

  return {
    props: { filteredProduct },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const id = data.products.map((product: Products) => {
    return {
      params: { pid: product.id },
    };
  });

  return {
    paths: id,
    fallback: true,
  };
};

export default ProductDetailPage;
