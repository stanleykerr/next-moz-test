import React, { Children, useEffect, useState, ReactNode } from "react"

import { negotiateLanguages } from "@fluent/langneg"
import { FluentBundle, FluentResource } from "@fluent/bundle"
import { ReactLocalization, LocalizationProvider } from "@fluent/react"

const DEFAULT_LOCALE = "en"
const LOCALE_NAMES: string[] = (process.env.locales as any).LOCALE_NAMES
const LOCALE_BUNDLES = (process.env.locales as any).LOCALE_BUNDLES

function fetchMessages(locale: string): [string, [any]] {
  return [locale, LOCALE_BUNDLES[locale]]
}

function* lazilyParsedBundles(fetchedMessages: Array<[string, [any]]>) {
  for (const [locale, messages] of fetchedMessages) {
    const bundle = new FluentBundle(locale, { useIsolating: false })
    for (const parsed of Object.values(messages)) {
      const resource = new FluentResource(parsed)
      bundle.addResource(resource)
    }
    yield bundle
  }
}

interface AppLocalizationProviderProps {
  children: ReactNode
}

export const AppLocalizationProvider = (
  props: AppLocalizationProviderProps
): JSX.Element => {
  const [currentLocales, setCurrentLocales] = useState([DEFAULT_LOCALE])
  const [l10n, setL10n] = useState<ReactLocalization | null>(null)

  useEffect(() => {
    changeLocales(navigator.languages as Array<string>)
  }, [])

  async function changeLocales(userLocales: Array<string>) {
    const currentLocales = negotiateLanguages(userLocales, LOCALE_NAMES, {
      defaultLocale: DEFAULT_LOCALE,
    })

    setCurrentLocales(currentLocales)

    const fetchedMessages = currentLocales.map(fetchMessages)

    const bundles = lazilyParsedBundles(fetchedMessages)
    setL10n(new ReactLocalization(bundles))
  }

  return l10n === null ? (
    <div>Loading…</div>
  ) : (
    <>
      <LocalizationProvider l10n={l10n}>
        {Children.only(props.children)}
      </LocalizationProvider>
      <select
        id="lang"
        onChange={event => changeLocales([event.target.value])}
        value={currentLocales[0]}
      >
        {LOCALE_NAMES.map((name: string) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </>
  )
}

export default AppLocalizationProvider
