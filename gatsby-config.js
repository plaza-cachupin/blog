module.exports = {
  siteMetadata: {
    title: `Plaza Cachupín`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `plaza-cachupin`
      }
    },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/posts/`,
      },
    },
    `gatsby-transformer-remark`
  ]
}
