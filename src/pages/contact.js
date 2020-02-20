import React, { useState }  from "react"
import axios from "axios";
import Layout from "../components/layout"

const ContactForm = () => {
 const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg }
    });

    if (ok) {
      form.reset();
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: "https://getform.io/f/edfdb554-90eb-4411-967d-f44c843f70e4",
      data: new FormData(form)
    })
      .then(r => {
        handleServerResponse(true, "¡Gracias!", form);
      })
      .catch(r => {
        handleServerResponse(false, "Ha ocurrido un error: " + r.response.data.error, form);
      });
  };
  return (
    <Layout>
      <h1>Contacta</h1>
      <p>¿Tienes alguna sugerencia? ¿Hay algo que quieres compartir? Puedes utilizar el formulario de abajo para contactar y hacer llegar tu mensaje.
      </p>
      <form method="post" onSubmit={handleOnSubmit}>
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
          <label>Nombre<input type="text" name="name" id="name"/></label>
          <label>Email<input type="email" name="email" id="email" /></label>
          <label>Asunto<input type="text" name="subject" id="subject" /></label>
          <label>Mensaje<textarea name="message" id="message" rows="5" /></label>
          <button type="submit" disabled={serverState.submitting}>Enviar</button>
          <input type="reset" value="Resetea"/>
          {serverState.status && (
            <p className={!serverState.status.ok ? "errorMsg" : ""}>{serverState.status.msg}</p> 
          )}
        </div>
      </form>
    </Layout>
   )
}

export default ContactForm;