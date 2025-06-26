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
          light: "#FFFFFF",        // фон страницы
          lightgray: "#F4F5F7",    // фон блоков и панелей
          gray: "#DFE1E6",         // границы, разделители
          darkgray: "#A5ADBA",     // вторичный текст
          dark: "#172B4D",         // основной текст
          secondary: "#0052CC",    // ссылки, активные элементы
          tertiary: "#6B778C",     // второстепенные элементы
          highlight: "rgba(0,82,204,0.1)",     // подсветка hover/selected
          textHighlight: "#FFAB00",           // акцентный текст
        },
        darkMode: {
          light: "#091E42",        // фон страницы (тёмный)
          lightgray: "#1D2A3A",    // фон панелей
          gray: "#253858",         // разделители
          darkgray: "#7A869A",     // вторичный текст
          dark: "#F4F5F7",         // основной текст светлым
          secondary: "#4C9AFF",    // ссылки/активные
          tertiary: "#7A869A",     // второстепенные
          highlight: "rgba(76,154,255,0.1)",  // hover подсветка
          textHighlight: "#FFAB00",          // акцент
        },
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
