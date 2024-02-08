export function ContactForm() {
  // Seleccionar el documento actual
  const d = document,
      // Crear un elemento de formulario
      $form = d.createElement("form"),
      // Obtener el elemento que contiene los estilos dinámicos
      $fragment = d.createDocumentFragment().textContent
      $styles = d.getElementById("dynamic-styles");
      


  // Agregar la clase "contact-form" al formulario
  $form.classList.add("contact-form");

  // Definir los estilos CSS dinámicos para el formulario
  $styles.innerHTML = `
      /* Estilos CSS dinámicos */
      .contact-form {
        --form-ok-color: #4caf50;
        --form-error-color: #f44336;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
      }
      
      .contact-form > * {
        padding: 0.5rem;
        margin: 1rem auto;
        display: block;
        width: 100%;
      }
      
      .contact-form textarea {
        resize: none;
      }
      
      .contact-form legend,
      .contact-form-response {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
      }
      
      .contact-form input,
      .contact-form textarea {
        font-size: 1rem;
        font-family: sans-serif;
      }
      
      .contact-form input[type="submit"] {
        width: 50%;
        font-weight: bold;
        cursor: pointer;
      }
      
      .contact-form *::placeholder {
        color: #000;
      }
      
      .contact-form [required]:user-valid {
        border: thin solid var(--form-ok-color);
      }
      
      .contact-form [required]:user-invalid {
        border: thin solid var(--form-error-color);
      }
      
      .contact-form-error {
        margin-top: -1rem;
        font-size: 80%;
        background-color: var(--form-error-color);
        color: #fff;
        transition: all 800ms ease;
      }
      
      .contact-form-error.is-active {
        display: block;
        animation: show-message 1s 1 normal 0s ease-out both;
      }
      
      .none {
        display: none;
      }
      
      @keyframes show-message {
        0% {
          visibility: hidden;
          opacity: 0;
        }
      
        100% {
          visibility: visible;
          opacity: 1;
        }
      }
      
      .loading {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
      
  `;

  // Definir el contenido HTML del formulario
  
  $form.innerHTML = `
  <!-- Contenido del formulario HTML -->
  <legend>Envíanos tus comentarios</legend>
  <input
    type="text"
    name="name"
    placeholder="Escribe tu nombre"
    title="Nombre sólo acepta letras y espacios en blanco"
    pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$"
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Escribe tu email"
    title="Email incorrecto"
    pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$"
    required
  />
  <input
    type="hidden"
    name="_subject"
    placeholder="Asunto a tratar"
    title="El Asunto es requerido"
    required
  />
  <textarea
    name="comments"
    rows="5"
    placeholder="Escribe tus comentarios"
    title="Tu comentario no debe exceder los 255 caracteres"
    data-pattern="^.{1,255}$"
    required
  ></textarea>
  <input type="submit" value="Enviar" />
  <input type="hidden" name="_template" value="basic">
  <div class="contact-form-loader none">
    <img src="app/assets/ball-triangle.svg" alt="Cargando..." />
  </div>
  <div class="contact-form-response none">
    <p>Los datos han sido enviados</p>
  </div>
  `;

  // Función para validar el formulario
  function validationForm() {
      // Seleccionar el elemento de carga del formulario
      const $loader = d.querySelector(".contact-form-loader"),
          // Seleccionar el elemento de respuesta del formulario
          $response = d.querySelector(".contact-form-response"),
          // Seleccionar todos los campos obligatorios del formulario
          $inputs = d.querySelectorAll(".contact-form [required]");

      // Iterar sobre los campos obligatorios y agregar mensajes de error
      $inputs.forEach((input) => {
          const $span = d.createElement("span");
          $span.id = input.name;
          $span.textContent = input.title;
          $span.classList.add("contact-form-error", "none");
          input.insertAdjacentElement("afterend", $span);
      });

      // Escuchar eventos de pulsación de teclas para la validación en tiempo real
      d.addEventListener("keyup", (e) => {
          if (e.target.matches(".contact-form [required]")) {
              e.preventDefault();
              let $input = e.target,
                  pattern = $input.pattern || $input.dataset.pattern;
              const data = {
                  input: $input,
                  pattern,
              };

              if (data.pattern && data.input.value !== "") {
                  let regex = new RegExp(data.pattern);
                  return !regex.test(data.input.value)
                      ? d.getElementById(data.input.name).classList.add("is-active")
                      : d.getElementById(data.input.name).classList.remove("is-active");
              }
              if (!data.pattern) {
                  return data.input.value === ""
                      ? d.getElementById(data.input.name).classList.add("is-active")
                      : d.getElementById(data.input.name).classList.remove("is-active");
              }
          }
      });
      

      // Escuchar el evento de envío del formulario
      $form.addEventListener("submit", async (e) => {
          e.preventDefault();
          if (e.target === $form) {
              // Mostrar el indicador de carga
              $loader.classList.remove("none");
              try {
                  // Realizar una solicitud fetch al servidor
                  const response = await fetch("https://formsubmit.co/ajax/thyronmiguelvegasantana@gmail.com", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                      },
                      body: new FormData(e.target),
                  });
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  // Procesar la respuesta del servidor
                  const data = await response.json();
                  console.log("correo",data.message);
                  // Mostrar la respuesta al usuario
                  $response.innerHTML = `<p>${data.message}</p>`;
                  // Restablecer el formulario después del envío exitoso
                  $form.reset();
              } catch (error) {
                  // Manejar errores de red u otros errores
                  console.error('There was an error!', error);
                  $response.innerHTML = `Error: ${error.message}`;
              } finally {
                  // Ocultar el indicador de carga después de un tiempo determinado
                  $loader.classList.add("none");
                  setTimeout(() => $response.innerHTML = '', 3000);
              }
          }
      });
  }

  // Llamar a la función de validación del formulario después de un breve retraso
  setTimeout(() => validationForm(), 100);

  // Devolver el elemento de formulario creado
  return $form;
}
