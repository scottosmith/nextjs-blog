import Head from "next/head";
import Link from "next/link";

export const siteTitle = "SOS";

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <meta name="description" content="Blog for Scott O. Smith" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className={`content${home ? ' home' : ''}`}>
        <header>
          {home ? (
            <h1 className="site-title home">
              <Link href="/">
                <a>
                  {siteTitle}
                </a>
              </Link>
            </h1>
          ) : (
            <h2 className="site-title post">
              <Link href="/">
                <a>
                  &lt; {siteTitle}
                </a>
              </Link>
            </h2>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
        {home && (
          <footer className="footer">
            © {new Date().getFullYear()}
            {` `}
            <div className="footer-links">
              <a href="https://scottosmith.net" className="link">
                {name}
              </a>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
