import { GetServerSideProps } from "next";

type Params = {
  params: { uid: string } | undefined;
};

const UserIdPage = ({ id }: { id: string }) => {
  return <div>{id}</div>;
};

export default UserIdPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context as Params;

  const userId = params?.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
};
