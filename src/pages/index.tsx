import Link from "next/link"

import Layout from "@components/layout"

import styles from "../styles/Home.module.css"

export const Home = (): JSX.Element => {
  return (
    <Layout title="Firefox Monitor">
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <a href="https://github.com/mozilla/blurts-server">Fx-Monitor</a>{" "}
            SSR Test
          </h1>

          <p className={styles.description}>
            Recreated using
            <code className={styles.code}>
              Next.js, React, TypeScript, & Sass
            </code>
          </p>

          <div className={styles.grid}>
            <a
              href="https://github.com/stanleykerr/next-moz-test"
              className={styles.card}
            >
              <h3>View Source &rarr;</h3>
              <p>Current source code is available on GitHub</p>
            </a>

            <Link href="/about">
              <a className={styles.card}>
                <h3>View About Page &rarr;</h3>
                <p>The about page is a relatively complete recreation</p>
              </a>
            </Link>

            <a href="#lang" className={styles.card}>
              <h3>l10n Support &rarr;</h3>
              <p>
                Use the select at the bottom of the page to change the language
                <br />
                <small style={{ fontSize: 13, fontStyle: "italic" }}>
                  (note: only has a few locales from fx-monitor)
                </small>
              </p>
            </a>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
