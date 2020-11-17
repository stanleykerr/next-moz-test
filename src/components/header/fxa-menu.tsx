import { useLocalization } from "@fluent/react"
import Link from "next/link"

import InternalLink from "@components/analytics/internal-link"

const FXA_LINKS = [
  {
    title: "Preferences",
    stringId: "preferences",
    href: "/user/preferences",
  },
  {
    title: "Firefox Account",
    stringId: "fxa-account",
    href: "getFxaUrl()", // TODO: Use AppConstants
  },
  {
    title: "Sign Out",
    stringId: "sign-out",
    href: "/user/logout",
  },
]

export const FxAMenu = (): JSX.Element => {
  const { l10n } = useLocalization()

  const getFxALinks = () =>
    FXA_LINKS.map(({ stringId, ...rest }) => ({
      ...rest,
      ...(stringId && { content: l10n.getString(stringId) }),
    }))

  const fxaMenuLinks = getFxALinks().map(({ title, content, href }, index) => (
    <Link key={index} href={href}>
      <a className="fxa-menu-link" {...InternalLink(title)}>
        {content}
      </a>
    </Link>
  ))

  return (
    <div className="fxa-menu-wrapper">
      <div
        id="avatar-wrapper"
        className="avatar-wrapper {{ addClass }}"
        tabIndex={0}
        aria-label={l10n.getString("open-fxa-menu")}
      >
        <img
          alt="{{ req.session.user.primary_email }}"
          className="avatar"
          src="{{ req.session.user.fxa_profile_json.avatar }}"
        />
      </div>
      <div id="fxa-menu" className="fxa-menu">
        <div className="fxa-menu-links">
          <div className="signed-in-as-wrap flx">
            <span className="signed-in-as">getSignedInAs</span>
          </div>
          {fxaMenuLinks}
        </div>
      </div>
    </div>
  )
}

export default FxAMenu
