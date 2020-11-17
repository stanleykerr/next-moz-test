import { useRouter } from "next/router"
import Link from "next/link"

import { Localized, useLocalization } from "@fluent/react"
import FxAData from "@components/analytics/fxa"
import InternalLink from "@components/analytics/internal-link"
import FxAMenu from "@components/header/fxa-menu"
import FxBento from "@components/header/fx-bento"
import RecruitmentBanner from "./recruitment-banner"

import styles from "@styles/Header.module.scss"

const NAV_LINKS = [
  {
    title: "Home",
    stringId: "home",
    href: "/",
  },
  {
    title: "Breaches",
    stringId: "breaches",
    href: "/breaches",
  },
  {
    title: "Security Tips",
    stringId: "security-tips",
    href: "/security-tips",
  },
]

export const Header = (): JSX.Element => {
  const router = useRouter()
  const { l10n } = useLocalization()

  const getNavLinks = () =>
    NAV_LINKS.map(({ href, stringId, ...rest }) => ({
      ...rest,
      href,
      ...(stringId && { content: l10n.getString(stringId) }),
      active: router.pathname === href,
    }))

  const navLinks = getNavLinks().map(
    ({ title, content, href, active }, index) => (
      <Link key={index} href={href}>
        <a
          className={[
            "nav-link",
            styles["nav-link"],
            ...(active ? [styles["active-link"]] : []),
          ].join(" ")}
          {...InternalLink(title)}
        >
          <span>{content}</span>
        </a>
      </Link>
    )
  )

  const signedIn = false // req.session.user

  return (
    <header id="header" className={styles.header}>
      <RecruitmentBanner />
      <div className={styles["navigation-wrapper"]}>
        <section
          className={["row-full-width", styles["fxm-branding"]].join(" ")}
        >
          <Link href={"/"}>
            <a
              className={["flx-cntr", styles["fx-monitor-logo-wrapper"]].join(
                " "
              )}
              aria-label={l10n.getString("home")}
              {...InternalLink("Fx-Monitor-Logo")}
            >
              <div
                className={[
                  "sprite",
                  styles.sprite,
                  styles["fx-monitor-logo"],
                ].join(" ")}
              >
                {/*Firefox Monitor logo */}
              </div>
              <div className={styles["fx-monitor-logotype"]} />
            </a>
          </Link>
          <nav
            className={[
              styles["desktop-menu"],
              "flx-auto",
              "flx-cntr",
              "jst-cntr",
            ].join(" ")}
          >
            {navLinks}
          </nav>
          <div
            className={["flx flx-end flx-cntr", styles["bento-sign-up"]].join(
              " "
            )}
          >
            <FxBento />
            {signedIn ? (
              <FxAMenu />
            ) : (
              <button
                id="sign-in-btn"
                className={[
                  "open-oauth sign-in btn-white btn-big btn-transparent",
                  styles.signIn,
                ].join(" ")}
                {...FxAData("fx-monitor-sign-in-button")}
                data-event-category="Sign In Button"
              >
                {l10n.getString("sign-in")}
              </button>
            )}
          </div>
        </section>
        {/* mobile navigation */}
        <section className="mobile-nav show-mobile">
          <span className={[styles.navLink, styles.dropDownMenu].join(" ")}>
            {l10n.getString("menu")} svg/toggle-down
          </span>
          <nav className="mobile-menu flx-cntr row-full-width">{navLinks}</nav>
        </section>
      </div>
    </header>
  )
}

export default Header
