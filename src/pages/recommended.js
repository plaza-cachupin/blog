import React from "react"
import {Link} from "gatsby"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>Recomendamos</h1>
    <h2>Podcasts</h2>
      <ul>
        <li><a href="https://www.ivoox.com/podcast-memorias-tambor_sq_f1380545_1.html">Memorias de un tambor</a></li>
        <li><a href="https://www.ivoox.com/podcast-casus-belli-podcast_sq_f1391278_1.html">Casus Belli</a></li>
      </ul>
    <h2>Youtube</h2>
      <ul>
        <li><a href="https://www.youtube.com/user/fgbuenotv">Fundación Gustavo Bueno</a></li>
        <li><a href="https://www.youtube.com/channel/UCyXHCFqljyxn8U50Cgoax6w">Fortunata y Jacinta</a></li>
      </ul>
    <h2>Libros</h2>
      <p>Los comentados en la etiqueta <Link to="/tags/hoy-leemos/">Hoy leemos</Link></p>
  </Layout>
)

