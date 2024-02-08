export function ContactForm() {
  // Seleccionar el documento actual
  const d = document,
      // Crear un elemento de formulario
      $form = d.createElement("form"),
      // Obtener el elemento que contiene los estilos dinámicos
      $styles = d.getElementById("dynamic-styles");

  // Agregar la clase "contact-form" al formulario
  $form.classList.add("contact-form");

  // Definir los estilos CSS dinámicos para el formulario
  $styles.innerHTML = `
      /* Estilos CSS dinámicos */
  `;

  // Definir el contenido HTML del formulario
  $form.innerHTML = `
      <!-- Contenido del formulario HTML -->
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
                  console.log(data);
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
