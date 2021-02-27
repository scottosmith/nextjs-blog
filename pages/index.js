import Head from "next/head";
import Link from "next/link";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {allPostsData.map(({ id, date, year, title }) => (
        <article key={id}>
          <header>
            <h4
              style={{
                margin: "0",
                marginBottom: ".75rem",
                display: "inline-block",
              }}
            >
              <Link href={`/posts/[year]/[id]`} as={`/posts/${year}/${id}`}>
                <a style={{ boxShadow: `none` }}>
                  <Date dateString={date} />
                </a>
              </Link>
            </h4>
            <span>
              {` `}- {title}
            </span>
          </header>
        </article>
      ))}
    </Layout>
  );
}
