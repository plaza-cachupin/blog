import React from "react"
import { graphql, Link } from "gatsby"
import { Disqus } from 'gatsby-plugin-disqus'
import { MDXRenderer } from "gatsby-plugin-mdx"
import kebabCase from "lodash/kebabCase";

import Layout from "./layout"

const Tags = ({tags}) => tags.map((tag, i) => [
      i > 0 && ", " ,
      <Link key={i} to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
    ])


export default function PageTemplate({ data, location, pageContext }) {
  const { mdx } = data
  const { next, prev } = pageContext

  const disqusConfig = {
    url: `${"https://plazacachupin.es" + location.pathname}`,
    identifier: mdx.id,
    title: mdx.frontmatter.title,
  }

  return (
    <Layout>
      <h1>{mdx.frontmatter.title}</h1>
      <div>
        <p>
          <b>Publicado</b> el {mdx.frontmatter.date}. <b>Etiquetado</b> en <Tags tags={mdx.frontmatter.tags}/>
        </p>
      </div>
      <MDXRenderer>{mdx.body}</MDXRenderer>
      <div style={{'display' : 'flex', 'justifyContent': 'space-between'}}>
        {prev && (
            <Link to={prev.fields.slug}>Anterior: {prev.frontmatter.title}</Link>
        )}

        {next && (
            <Link to={next.fields.slug}>Siguiente: {next.frontmatter.title}</Link>
        )}
      </div>
      <Disqus config={disqusConfig} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "dddd D [de] MMMM [de] YYYY", locale: "es")
        tags
      }
    }
  }
`