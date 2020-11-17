import { useEffect, useRef, useState } from "react"
import { useLocalization } from "@fluent/react"

const CURRENT_SITE = "fx-monitor" // TODO: Don't use this

const BENTO_STRINGS = {
  bentoButtonTitle: "bento-button-title",
  bentoHeadline: "fx-makes-tech",
  bentoBottomLink: "made-by-mozilla",
  fxDesktop: "fx-desktop",
  fxMobile: "fx-mobile",
  fxMonitor: "fx-monitor",
  pocket: "pocket",
  mozVPN: "Mozilla VPN",
  mobileCloseBentoButtonTitle: "mobile-close-bento-button-title",
}

const getFxAppLinkInfo = (referringSiteURL: string, supportsVPN = true) => {
  const apps = [
    [BENTO_STRINGS.fxMonitor, "https://monitor.firefox.com/", "fx-monitor"],
    [
      BENTO_STRINGS.pocket,
      "https://app.adjust.com/hr2n0yz?engagement_type=fallback_click&fallback=https%3A%2F%2Fgetpocket.com%2Ffirefox_learnmore%3Fsrc%3Dff_bento&fallback_lp=https%3A%2F%2Fapps.apple.com%2Fapp%2Fpocket-save-read-grow%2Fid309601447",
      "pocket",
    ],
    [
      BENTO_STRINGS.fxDesktop,
      `https://www.mozilla.org/firefox/new/?utm_source=${referringSiteURL}&utm_medium=referral&utm_campaign=bento&utm_content=desktop`,
      "fx-desktop",
    ],
    [
      BENTO_STRINGS.fxMobile,
      `http://mozilla.org/firefox/mobile?utm_source=${referringSiteURL}&utm_medium=referral&utm_campaign=bento&utm_content=desktop`,
      "fx-mobile",
    ],
  ]
  if (supportsVPN) {
    apps.push([
      BENTO_STRINGS.mozVPN,
      `https://vpn.mozilla.org/?utm_source=${referringSiteURL}&utm_medium=referral&utm_campaign=bento&utm_content=desktop`,
      "moz-vpn",
    ])
  }
  return apps
}

export const FxBento = (): JSX.Element => {
  const [isActive, setActive] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { l10n } = useLocalization()

  const supportsVPN = navigator.language.includes("en")

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setActive(false)
      }
    }
    // Bind event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  const handleClick = () => {
    setActive(!isActive)
  }

  const appLinks = getFxAppLinkInfo(
    CURRENT_SITE, // TODO: fill this in (fx-monitor)
    supportsVPN
  ).map(([stringId, ...rest]) => [l10n.getString(stringId), ...rest])

  const appList = appLinks.map(([content, href, app], index) => (
    <a
      key={index}
      className={`fx-bento-app-link fx-bento-link ${app} ${
        app === CURRENT_SITE ? "fx-bento-current-site" : ""
      }`}
      href={href}
      data-bento-app-link-id={app}
    >
      <span className={`fx-bento-app-link-span ${app}`}>{content}</span>
    </a>
  ))

  return (
    <div
      ref={wrapperRef}
      className={[
        "firefox-apps",
        ...(isActive ? ["active", "fx-bento-open"] : []),
      ].join(" ")}
    >
      <button
        className="fx-bento-button toggle-bento"
        title={l10n.getString("bento-button-title")}
        aria-label={l10n.getString("bento-button-title")}
        onClick={handleClick}
      />
      {isActive && (
        <div className="fx-bento-content-wrapper">
          <div className="fx-bento-hide-overflow">
            <div className="fx-bento-content">
              <button
                className="fx-bento-mobile-close toggle-bento"
                title={l10n.getString("mobile-close-bento-button-title")}
                aria-label={l10n.getString("mobile-close-bento-button-title")}
                onClick={handleClick}
              />
              <div className="fx-bento-headline-logo-wrapper">
                <div className={"fx-bento-logo"} />
                <span className="fx-bento-headline">
                  {l10n.getString("fx-makes-tech")}
                </span>
              </div>
              {appList}
              <a
                className="fx-bento-bottom-link fx-bento-link"
                href="https://www.mozilla.org/"
              >
                {l10n.getString("made-by-mozilla")}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FxBento
