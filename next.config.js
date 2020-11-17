const { readdirSync, readFileSync } = require("fs");
const { join, resolve } = require("path");

const getLocaleDirectories = (source) =>
  Object.fromEntries(
    readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map(({ name: lang }) => {
        const ftlFolder = join(source, lang);
        return [
          lang,
          Object.fromEntries(
            readdirSync(ftlFolder, {
              withFileTypes: true,
            })
              .filter((f) => f.name.endsWith(".ftl"))
              .map(({ name }) => [
                name,
                readFileSync(join(ftlFolder, name), "utf8"),
              ])
          ),
        ];
      })
  );

const LOCALE_BUNDLES = getLocaleDirectories(resolve(__dirname, "locales"));
const LOCALE_NAMES = Object.keys(LOCALE_BUNDLES);

///Object.freeze(LOCALE_BUNDLES);
//Object.freeze(LOCALE_NAMES);

module.exports = (phase, { defaultConfig }) => {
  return {
    sassOptions: {
      includePaths: [join(__dirname, "styles")],
    },
    env: {
      locales: {
        LOCALE_NAMES,
        LOCALE_BUNDLES,
      },
    },
    /* config options here */
  };
};
