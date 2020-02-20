module.exports = {
  siteMetadata: {
    title: `Plaza Cachupín`,
    siteUrl: 'https://plazacachupin.es',
    description: 'Plaza Cachupín',
    twitterUsername: 'plazacachupin'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `plaza-cachupin`
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ( { query: { site, allMdx } } )  => {
              return allMdx.edges.map( edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug
                })  
              })
            },
            query: `{
              allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
                edges {
                  node {
                    id
                    excerpt
                    frontmatter {
                      title
                      date
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
            }`,
            output: '/rss.xml',
            title: `Plaza Cachupin RSS Feed`
          }
        ],
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-158661063-1",
      },
    },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
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
