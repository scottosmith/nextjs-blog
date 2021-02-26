import Head from 'next/head'
import Link from 'next/link'

const name = 'Scott Smith'
export const siteTitle = 'SOS'

export default function Layout({ children, home }) {
  const width = home ? '30vw' : '90vw' ;

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Blog for Scott O. Smith"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: width,
          padding: '1.5rem .5rem',
        }}
      >
      <header>
        {home ? (
          <h1
            style={{
              marginBottom: "3rem",
              marginTop: '2rem',
              fontSize: '2.5rem'
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                color: 'inherit'
              }}
              href="/"
            >
              <a style={{color: 'white', marginBottom: '3rem'}}>
                {siteTitle}
              </a>
            </Link>
          </h1>
        ) : (
          <h2
            style={{
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`
              }}
              href="/"
            >
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
      <footer className="footer">
        © {new Date().getFullYear()}{` `}
        <div className="footer-links">
            <a href="https://scottosmith.net" rel="noreferrer" className="link" target="_blank">Scott Smith</a>
        </div>
      </footer>
      </div>
    </div>
  )
}