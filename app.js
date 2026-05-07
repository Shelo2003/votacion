let baseDatos = [];

// 🚀 Cargar datos JSON
fetch("datos.json")
  .then(res => res.json())
  .then(data => {

    // 🔥 normalizar RUTs
    baseDatos = data.map(rut =>
      rut.trim().toLowerCase()
    );

  })

  .catch(err => {
    console.error(
      "❌ Error cargando datos.json:",
      err
    );
  });


// 🧼 LIMPIAR RUT
function limpiarRut(rut) {

  return rut
    .trim()
    .toLowerCase();

}


// 🔍 VALIDAR RUT
function validarRut() {

  const input =
    document.getElementById("rutInput");

  const resultado =
    document.getElementById("resultado");

  const rutIngresado =
    limpiarRut(input.value);


  // ⏳ esperar carga JSON
  if (baseDatos.length === 0) {

    resultado.innerHTML = `
      <p class="error">
        ⏳ Cargando base de datos...
      </p>
    `;

    return;
  }


  // 🔍 buscar rut
  const existe =
    baseDatos.includes(rutIngresado);


  // ✅ RUT VÁLIDO
  if (existe) {

    resultado.innerHTML = `
      <p class="ok">
        ✔ RUT válido
      </p>

      <button id="btnVotar">
        Ir a votar
      </button>
    `;


    // 🔥 guardar rut y entrar
    document
      .getElementById("btnVotar")
      .addEventListener("click", () => {

        // 💾 guardar rut
        localStorage.setItem(
          "rut",
          rutIngresado
        );

        console.log(
          "✔ RUT guardado:",
          rutIngresado
        );

        // 🚀 redirigir
        location.href = "votar.html";

      });

  }

  // ❌ RUT NO EXISTE
  else {

    resultado.innerHTML = `
      <p class="error">
        ✖ RUT no registrado
      </p>

      <button
        onclick="
          window.location.href=
          'https://wa.me/56978732934?text=Quiero%20consultar%20por%20mi%20RUT'
        "
      >
        Soporte vía WhatsApp
      </button>
    `;
  }
}