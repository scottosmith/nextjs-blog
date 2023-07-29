import Head from "next/head";

import Layout from "../../../components/layout";
import { getAllPostIds, getPostData } from "../../../lib/posts";
import Date from "../../../components/date";

export default function Post({ postData }) {
  const pageTitle = `${postData.title} - SOS`;
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <article>
        <header>
          <h2
            style={{
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <Date dateString={postData.date} />
          </h2>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          style={{ textAlign: "center" }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.year, params.id);
  return {
    props: {
      postData,
    },
  };
}
