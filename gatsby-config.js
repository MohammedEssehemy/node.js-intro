module.exports = {
  siteMetadata: {
    name: `Mohammed Essehemy`,
    title: `Nodejs Intro`,
    date: `March 15, 2019`,
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
    `gatsby-plugin-offline`,
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
  ],
};
