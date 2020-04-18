module.exports = {
  siteMetadata: {
    name: `Mohammed Essehemy`,
    title: `Nodejs Intro`,
    repo: `https://github.com/MohammedEssehemy/node.js-intro`,
    github: `https://github.com/mohammedessehemy`,
    linkedIn: `https://linkedin.com/in/mohammed-essehemy`,
    stackOverflow: 'https://stackoverflow.com/users/7435863/mohammed-essehemy',
    email: `mailto:mohammedessehemy@gmail.com`
  },
  plugins: [
    `gatsby-plugin-favicon`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `slides`,
        path: `${__dirname}/src/slides`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1920,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nodejs Intro`,
        short_name: `Nodejs`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#06ae0c`,
        display: `standalone`,
      }
    },
    `gatsby-plugin-offline`,
  ],
};
