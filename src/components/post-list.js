import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from './layout'

class PostList extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMdx

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = `/posts/pages/${currentPage - 1 === 1 ? "" : (currentPage - 1).toString()}`
    const nextPage = `/posts/pages/${(currentPage + 1).toString()}`

    return (
      <Layout>
        <h1>Artículos</h1>
        <ul>
         {posts.map(({ node: post }) => (
           <li key={post.id}>
             <Link to={post.fields.slug}>
               <h2>{post.frontmatter.title}</h2>
             </Link>
             <p>{post.excerpt}</p>
           </li>
         ))}
        </ul>
        <div style={{display: 'flex', justifyContent: 'space-between  '}}>
          {!isFirst && (
            <Link to={prevPage} rel="prev">← Recientes</Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">Antiguos →</Link>
          )}
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query blogIndex ($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default PostList