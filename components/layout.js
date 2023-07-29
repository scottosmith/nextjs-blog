import Head from "next/head";
import Link from "next/link";

const name = "Scott Smith";
export const siteTitle = "SOS";

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <meta name="description" content="Blog for Scott O. Smith" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className={`content${home ? " home" : ""}`}>
        <header>
          {home ? (
            <h1 className="site-title home">
              <Link href="/">{siteTitle}</Link>
            </h1>
          ) : (
            <h2 className="site-title post">
              <Link href="/">&lt; {siteTitle}</Link>
            </h2>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div>
            <Link href="/">← Back to home</Link>
          </div>
        )}
        {home && (
          <footer className="footer">
            © {new Date().getFullYear()}
            {` `}
            <div className="footer-links">{name}</div>
          </footer>
        )}
      </div>
    </>
  );
}
