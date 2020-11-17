import { AppLocalizationProvider } from "../components/l10n.tsx"
import "../styles/globals.scss"

function MyApp({ Component, pageProps }) {
  return (
    <AppLocalizationProvider>
      <Component {...pageProps} />
    </AppLocalizationProvider>
  )
}

export default MyApp
