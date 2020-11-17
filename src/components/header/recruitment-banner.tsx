import styles from "@styles/Header.module.scss"

interface RecruitmentLinkResult {
  "data-ga-link": string
  "data-event-category": string
  "data-event-label": string
}

// TODO: Use AppConstants or such
const BANNER_URL = "https://mozilla.org/" // temp url
const BANNER_TEXT = "How important is Firefox Monitor to you? Let us know!"

const ESCAPED_BANNER_TEXT = BANNER_TEXT.replace(/"/g, "&quot;").replace(
  /'/g,
  "&#039;"
)

export const RecruitmentLink = (): RecruitmentLinkResult => {
  return {
    "data-ga-link": "",
    "data-event-category": "Recruitment",
    "data-event-label": ESCAPED_BANNER_TEXT,
  }
}

export const RecruitmentBanner = (): JSX.Element => {
  return (
    BANNER_URL &&
    BANNER_TEXT && (
      <div className={styles["recruitment-banner"]}>
        <a
          id="recruitment-banner"
          href={BANNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          {...RecruitmentLink()}
        >
          {BANNER_TEXT}
        </a>
      </div>
    )
  )
}

export default RecruitmentBanner
