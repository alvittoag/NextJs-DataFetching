import { GetServerSideProps } from "next";
import React from "react";

const userProfile = ({ username }: { username: string }) => {
  return <div>{username}</div>;
};

export default userProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      username: "alvito",
    },
  };
};
