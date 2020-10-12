module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout`),
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
  siteMetadata: {
    siteUrl: `https://ucenjeirazvoj.com`,
  },
};
