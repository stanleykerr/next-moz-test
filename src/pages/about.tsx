import { Localized, useLocalization } from "@fluent/react"

import FxAData from "../components/analytics/fxa"
import Layout from "../components/layout"

import styles from "../styles/About.module.scss"

const aboutPageStrings = [
  {
    headline: "how-fxm-1-headline",
    subhead: "how-fxm-1-blurb",
    localizedCta: "scan-submit",
    href: "/",
    eventCategory: "About Page: Search Your Email",
  },
  {
    headline: "how-fxm-2-headline",
    subhead: "how-fxm-2-blurb",
    ctaId: "signUp",
    localizedCta: "sign-up-for-alerts",
  },
  {
    headline: "how-fxm-3-headline",
    subhead: "how-fxm-3-blurb",
    localizedCta: "download-firefox-banner-button",
    href: "https://www.mozilla.org/firefox",
    eventCategory: "About Page: Download Firefox",
    download: "download",
  },
]

export const About = (): JSX.Element => {
  function getAboutPageStrings() {
    const { l10n } = useLocalization()

    return aboutPageStrings.map(
      ({ headline, subhead, localizedCta, ...rest }) => ({
        ...rest,
        headline: l10n.getString(headline),
        subhead: l10n.getString(subhead),
        localizedCta: l10n.getString(localizedCta),
      })
    )
  }

  const aboutCards = getAboutPageStrings().map(
    (
      { headline, subhead, ctaId, localizedCta, eventCategory, download, href },
      index
    ) => (
      <div key={index} className={[styles["fxm-card-wrap"], "flx"].join(" ")}>
        <div className="fxm-card flx flx-col space-between">
          <div className="txt-cntr">
            <h4
              className={[
                styles["how-fxm-headline"],
                "feature-title",
                "ff-Met",
              ].join(" ")}
            >
              {headline}
            </h4>
            <p className="how-fxm-works-blurb feature-subhead txt-light">
              {subhead}
            </p>
          </div>
          {ctaId === "signUp" ? (
            <button
              {...FxAData("fx-monitor-about-page-sign-up")}
              data-event-category="About Page SignUp"
              className="btn-violet-secondary btn-transparent btn-small open-oauth about-cta"
            >
              {localizedCta}
            </button>
          ) : (
            <a
              className="btn-violet-secondary btn-transparent btn-small about-cta send-ga-ping"
              data-event-category={eventCategory}
              data-event-label="About Page"
              data-event-action="Click"
              {...(download && { target: "_blank" })}
              href={href}
            >
              {localizedCta}
            </a>
          )}
        </div>
      </div>
    )
  )

  return (
    <Layout title="About Firefox Monitor">
      <div className={styles["about-noodles"]}>
        <main
          className={["clear-header", styles["about-fxm"], "container"].join(
            " "
          )}
        >
          <div className={["row", styles["about-row"]].join(" ")}>
            <div className="col-8">
              <div className={styles["fx-monitor-svg"]} />
              <h2 className="headline mw-550">
                <Localized id="landing-headline" />
              </h2>
              <p className="sb-callout-body">
                <Localized id="fxm-warns-you" />
              </p>
            </div>
          </div>
          <section className="row">
            <div
              className={[
                "gradient-inset",
                styles["about-row"],
                "flx-col",
              ].join(" ")}
            >
              <div className="content-wrap">
                <div className="col-12 txt-cntr">
                  <h3 className="feature-tip-headline bold ff-Met">
                    <Localized id="how-fxm-works" />
                  </h3>
                </div>
                <div
                  className={[
                    "col-12",
                    styles["how-fxm-works"],
                    "flx-row no-vertical-padding space-between",
                  ].join(" ")}
                >
                  {aboutCards}
                </div>
                å
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export default About
