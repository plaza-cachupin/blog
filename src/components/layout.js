import React from "react"

import Footer from './footer'
import Header from './header'

export default ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: 720, padding: `0 1rem` }}>
    <Header/>
    {children}
    <Footer/>
  </div>
)