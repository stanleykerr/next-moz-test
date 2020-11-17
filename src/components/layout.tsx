import Head from "next/head"

import { useLocalization } from "@fluent/react"

import DefaultDataset from "./analytics/default-dataset"
import Header from "./header"
import Footer from "./footer"

interface LayoutProp {
  children: JSX.Element[] | JSX.Element
  title?: string
}

export const Layout = ({
  children,
  title = "This is the default title",
}: LayoutProp): JSX.Element => {
  const { l10n } = useLocalization()
  // TODO: Don't use false, use signedIn variable, add other data vars from default.hbs
  return (
    <div {...DefaultDataset(false)} data-bento-app-id="fx-monitor">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta
          name="description"
          content={l10n.getString("og-site-description")}
        />
        <meta name="theme-color" content="#002275" />
        <meta
          property="og:title"
          content={l10n.getString("share-facebook-headline")}
        />
        <meta
          property="og:description"
          content={l10n.getString("share-facebook-blurb")}
        />
        <meta property="og:url" content="{{ SERVER_URL }}" />
        <meta
          property="og:image"
          content="{{ SERVER_URL }}/img/firefox-monitor.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Firefox Monitor" />
        <meta
          name="twitter:description"
          content={l10n.getString("share-twitter")}
        />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        {/* TODO: import other favicons, pontoonjs, etc */}
      </Head>
      <Header />

      {children}

      <Footer />
    </div>
  )
}

export default Layout
