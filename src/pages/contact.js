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
      <p>¿Tienes alguna sugerencia? ¿Hay algo que quieres compartir con nosotros? Puedes utilizar el formulario de abajo para contactar y hacernos llegar tu mensaje.
      </p>
      <form method="post" onSubmit={handleOnSubmit}>
        <div><label>Nombre<input type="text" name="name" id="name" /></label></div>
        <div><label>Email<input type="email" name="email" id="email" /></label></div>
        <div><label>Asunto<input type="text" name="subject" id="subject" /></label></div>
        <div><label>Mensaje<textarea name="message" id="message" rows="5" /></label></div>
        <div>
          <button type="submit" disabled={serverState.submitting}>Enviar</button>
          <input type="reset" value="Resetea"/>
        </div>
        {serverState.status && (
            <p className={!serverState.status.ok ? "errorMsg" : ""}>
            {serverState.status.msg}
            </p>
        )}
      </form>
    </Layout>
   )
}

export default ContactForm;