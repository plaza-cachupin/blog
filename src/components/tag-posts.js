import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from './layout';

const TagPosts = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} artículo${totalCount === 1 ? '' : 's'} 
    etiquetado${totalCount === 1 ? '' : 's'} como «${tag}»`;
    
  return (
    <Layout>
      <div>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { title, date } = node.frontmatter;
            const { slug } = node.fields;
            return (
              <li key={slug}>
                <Link to={slug}>{title} ({date})</Link>
              </li>
            );
          })}
        </ul>
        <Link to="/tags/">Todas las etiquetas</Link>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "dddd D [de] MMMM [de] YYYY", locale: "es")
          }
        }
      }
    }
  }
`;

export default TagPosts;
