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
          lightgray: "#F4F5F7",    // панели, карточки
          gray: "#DFE1E6",         // границы
          darkgray: "#6B778C",     // вторичный текст (теперь хорошо читаем)
          dark: "#1C1E21",         // основной текст
          secondary: "#0052CC",    // ссылки, кнопки
          tertiary: "#5E6C84",     // второстепенное, немного темнее
          highlight: "rgba(0,82,204,0.1)",
          textHighlight: "#FFAB00",
        },
        darkMode: {
          light: "#1E1E1E",      // фон страницы (глубокий серый)
          lightgray: "#2A2A2E",  // панели, карточки
          gray: "#3B3B41",       // границы, слабый фон
          darkgray: "#A0A0A5",   // вторичный текст
          dark: "#FFFFFF",       // основной текст
          secondary: "#8AB4F8",  // ссылки (светло-синий на тёмном)
          tertiary: "#CCCCCC",   // второстепенный текст
          highlight: "rgba(255, 255, 255, 0.05)",  // фоновая подсветка
          textHighlight: "#FFEB95",                // мягкий жёлтый акцент
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
