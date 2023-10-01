import { GetStaticProps } from "next";

export default function Main({ slug }: any) {
  return <div>Render: {slug}</div>;
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      slug: context.params?.domain,
    },
  };
};
