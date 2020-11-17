import Link from "next/link"

import { useLocalization } from "@fluent/react"

import InternalLink from "@components/analytics/internal-link"
import OutboundLink from "@components/analytics/outbound-link"
import MozillaSVG from "@components/svg/mozilla"

import styles from "@styles/Footer.module.scss"

const FOOTER_LINKS = [
  {
    title: "Mozilla.org",
    content: <MozillaSVG />,
    href: "https://www.mozilla.org",
    openNewWindow: true,
    props: {
      className: styles["moz-link"],
    },
  },
  {
    title: "About Firefox Monitor",
    stringId: "about-firefox-monitor",
    href: "/about",
    internal: true,
  },
  {
    title: "Frequently Asked Questions",
    stringId: "frequently-asked-questions",
    href: "https://support.mozilla.org/kb/firefox-monitor-faq",
  },
  {
    title: "Terms & Privacy",
    stringId: "terms-and-privacy",
    href:
      "https://www.mozilla.org/privacy/firefox-monitor/?utm_campaign=fx_monitor_downloads&utm_content=site-footer-link&utm_medium=referral&utm_source=monitor.firefox.com",
  },
  {
    title: "GitHub",
    stringId: "GitHub-link-title",
    href: "https://github.com/mozilla/blurts-server",
  },
]

export const Footer = (): JSX.Element => {
  const { l10n } = useLocalization()

  const getFooterLinks = () =>
    FOOTER_LINKS.map(({ stringId, ...rest }) => ({
      ...rest,
      ...(stringId && { content: l10n.getString(stringId) }),
    }))

  const footerLinks = getFooterLinks().map(
    ({ title, content, href, openNewWindow, internal, props }, index) => (
      <li key={index} {...props}>
        <Link href={href}>
          <a
            {...{
              ...(internal ? InternalLink(title) : OutboundLink(title)),
              ...(openNewWindow && { target: "_blank" }),
            }}
            rel="noopener"
          >
            {content}
          </a>
        </Link>
      </li>
    )
  )

  return (
    <footer className={styles.footer}>
      <ul className="row-full-width">
        {/*<li class="footer-link-wrapper moz-link">
          <a
            class="footer-link mozilla-logo-wrapper"
            href="https://www.mozilla.org"
            {...OutboundLink("Mozilla.org")}
            target="_blank"
            rel="noopener"
            aria-label="Open Mozilla.org in new window"
          >
            {MozillaSVG}
          </a>
  </li>*/}
        {footerLinks}
      </ul>
    </footer>
  )
}

export default Footer
