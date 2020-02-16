import React from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'

import Layout from './layout';

const allTags = ({ pageContext, data }) => {
  const { tags } = pageContext

  // Tag paths are kebabCase as in gatsby-node.
  return <Layout>
    <h1>Etiquetas</h1>
    <ul>
      {tags.map((tag, index) => <li key={index}>
        <Link to={`/tags/${_.kebabCase(tag)}`}>{tag}</Link>
      </li>)}
    </ul>
  </Layout>
}

export default allTags