export function ContactForm() {
    const d = document,
      $form = d.createElement("form"),
      $syles = d.getElementById("dynamic-styles");
    console.log($syles);
    $form.classList.add("contact-form");
  
  
  
    $form.innerHTML = ` 
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
              <img src="app/assets/loader.svg" alt="Cargando" />
            </div>
            <div class="contact-form-response none">
              <p>Los datos han sido enviados</p>
            </div>
          `;
  
    function validationForm() {
      const $form = d.querySelector(".contact-form"),
        $inputs = d.querySelectorAll(".contact-form [required]");
  
      $inputs.forEach((input) => {
        const $span = d.createElement("span");
  
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none");
  
        input.insertAdjacentElement("afterend", $span);
      });
  
      d.addEventListener("keyup", (e) => {
        if (e.target.matches(".contact-form [required]")) {
          e.preventDefault();
          let $input = e.target,
            pattern = $input.pattern || $input.dataset.pattern;
          const data = {
            input: $input,
            pattern,
          };
  
          if (data.pattern && data.input !== "") {
            // console.log("input tiene pattern ");
            let regex = new RegExp(data.pattern);
            return !regex.exec(data.input.value)
              ? d.getElementById(data.input.name).classList.add("is-active")
              : d.getElementById(data.input.name).classList.remove("is-active");
          }
          if (!data.pattern) {
            //console.log("input no tiene pattern");
            return data.input.value === ""
              ? d.getElementById(data.input.name).classList.add("is-active")
              : d.getElementById(data.input.name).classList.remove("is-active");
          }
        }
      });
  
      d.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target === $form) {
          const $loader = d.querySelector(".contact-form-loader"),
            $response = d.querySelector(".contact-form-response");
  
          $loader.classList.remove("none");
          fetch("https://formsubmit.co/ajax/use.d.v.a.dev@gmail.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: new FormData(e.target),
          })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => {
              console.log(data);
              $loader.classList.add("none");
              $response.classList.remove("none");
              $response.innerHTML = `<p>${data.message}</p>`;
              $form.reset();
            })
            .catch((err) => {
              let message =
                err.statusText ||
                "Ocurrio un error al enviar, intenta nuevamente";
              $response.innerHTML = `Error ${err.status}: ${message}`;
            })
            .finally(() => {
              setTimeout(() => $response.classList.add("none"), 3000);
            });
        }
      });
    }
  
    //le doy 100 milisegundos para que valla a la pila y carque los estilos dom de validacion
    setTimeout(() => validationForm(), 100);
  
    return $form;
  }