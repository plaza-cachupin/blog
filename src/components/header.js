import React from "react"
import { Link } from "gatsby"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default () => (
  <header>
    <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
      {/** TODO Use siteMetadata */}
      <h3 style={{ display: `inline` }}>Plaza Cachupín</h3>
    </Link>
    <ul style={{ display: `inline`, float: `right` }}>
      <ListLink to="/posts/pages">Artículos</ListLink>
      <ListLink to="/contact">Contacto</ListLink>
      <ListLink to="/recommended">Recomendamos</ListLink>
      <ListLink to="/about/">Acerca</ListLink>
    </ul>
    <hr/>
</header>
)