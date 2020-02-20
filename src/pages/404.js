import React from "react"
import Layout from "../components/layout"


export default (props) => (
  <Layout>
    <h1>¡No encontrado!</h1>
    <p>No se ha encontrado ninguna página en:{props.location.pathname}</p>
  </Layout>
) 