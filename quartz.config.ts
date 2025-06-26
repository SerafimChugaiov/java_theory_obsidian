import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Java Experts: Serafym and Ivan",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "java.theory.sch",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FFFFFF",      // Neutral 0 – фон страницы
          lightgray: "#F4F5F7",  // Neutral 100 – панели, карточки
          gray: "#DFE1E6",       // Neutral 200 – границы
          darkgray: "#A5ADBA",   // Neutral 300 – вторичный текст
          dark: "#172B4D",       // Neutral 900 – основной текст
          secondary: "#0052CC",  // Blue 600 – ссылки, кнопки
          tertiary: "#6B778C",   // Neutral 400 – второстепенное
          highlight: "rgba(0,82,204,0.1)",  // blue highlight
          textHighlight: "#FFAB00",        // yellow accent
        },
        darkMode: {
          light: "#091E42",      // DarkNeutral 100 – фон страницы
          lightgray: "#1D2A3A",  // DarkNeutral 200 – панели
          gray: "#253858",       // DarkNeutral 300 – границы
          darkgray: "#7A869A",   // Neutral 400 – вторичный текст
          dark: "#F4F5F7",       // Neutral 100 – основной светлый текст
          secondary: "#4C9AFF",  // Blue 400 – ссылки
          tertiary: "#7A869A",   // Neutral 400 – вспомогательное
          highlight: "rgba(76,154,255,0.1)",   // blau highlight
          textHighlight: "#FFAB00",            // жёлтый акцент
        }
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
