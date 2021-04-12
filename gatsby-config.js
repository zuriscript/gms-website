module.exports = {
  siteMetadata: {
    siteTitle: `GraphMineSuite`,
    defaultTitle: `GraphMineSuite`,
    siteTitleShort: `GMS`,
    siteDescription: `Benchmark Framework and Implementations for High-performance graph mining`,
    siteAuthor: `@spcl`,
    siteUrl: `https://zurshmaria.ch`,
    siteImage: `/banner.png`,
    siteLanguage: `en`,
    themeColor: `#111827`
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        basePath:`/docs`,
        configPath: `src/components/docs/config`,
        docsPath: `src/docs`,
        baseDir: `src/docs`
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/data`
      }
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases:{sh: "bash", js:"javascript"},
              showLineNumbers: false,
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            }
          }
        ]
      }
    },
    `gatsby-plugin-sharp`, 
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `graph-mine-suite`,
        short_name: `gms`,
        start_url: `/`,
        background_color: `#81e6d9`,
        theme_color: `#81e6d9`,
        display: `minimal-ui`,
        icon: `src/assets/images/gms-icon.png`
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`
  ],
};
