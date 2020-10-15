require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'UcenjeIRazvoj',
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: 'ucenjeirazvoj',
        // Url to query from
        url: `${process.env.GATSBY_API_URL}/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `UA-167145610-1`,
      },
    },
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
  proxy: {
    prefix: '/api',
    url: 'http://localhost:8001',
  },
  siteMetadata: {
    siteUrl: `https://ucenjeirazvoj.com`,
  },
};
