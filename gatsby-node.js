// Required kebab-case function for tags
const _ = require('lodash')

// Required at createPages to resolve paths
const path = require("path")

// Required at createNode 
const { createFilePath } = require("gatsby-source-filesystem")

// Add slug field for mdx nodes whose value is the path.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value: `/posts${value}`, // value starts with the / character already.
    })
  }
}

// Query allMdx and
// 1. Create all post-list pages.
// 2. Create all individual post pages.
// 3. Create all tag-posts pages.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const posts = result.data.allMdx.edges

  createPostListPages(posts, createPage)
  createPostPages(posts, createPage)
  createTagPages(posts, createPage)

}

const createPostListPages = (posts, createPage) => {
  const component = path.resolve("./src/components/post-list.js")
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)

  // Take into account that skip and limit are passed by context to the graphql
  // query defined in the component. 
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts/pages` : `/posts/pages/${i + 1}`,
      component,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

const createPostPages = (posts, createPage) => {
  const component = path.resolve(`./src/components/post.js`)

  posts.forEach(({ node }, index) => {
    // posts are DESC!
    const next = index === 0 ? null : posts[index - 1].node
    const prev = index === posts.length - 1 ? null : posts[index + 1].node

    createPage({
      path: node.fields.slug,
      component,
      context: { 
        id: node.id,
        prev,
        next
      },
    })
  })
}

const createTagPages = (posts, createPage) => {
  const postsByTag = path.resolve('./src/components/tag-posts.js')
  const allTags    = path.resolve('./src/components/all-tags.js')

  // Iterate through each post and add all tags to the tags set
  let tags = []
  posts.forEach(({node}, index) => {
    for (const tag of node.frontmatter.tags) {
      // avoid empty tag
      if (tag) {
        tags = tags.concat(tag)
      }
    }
  })

  // I dont know why a set does not work ... using a list and calling uniq.
  tags = _.uniq(tags)

  // Create individual tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: postsByTag,
      context: {
        tag,
      },
    });
  });

  // Create allTags page:
  createPage({
    path: '/tags/',
    component: allTags,
    context: {
      tags,
    }
  })
}