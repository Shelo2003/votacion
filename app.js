let baseDatos = [];

// 🔗 CONFIG SUPABASE
const supabaseUrl =
  "https://esrgibnujebtjonablgh.supabase.co";

const supabaseKey =
  "sb_publishable_dXsrrFr8lIZSrHhJ3x-C-w_rI8y42Pb";

// 🚀 CLIENTE
const supabaseClient =
  window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

// 📥 CARGAR JSON
fetch("datos.json")
  .then(res => res.json())
  .then(data => {

    // 🔥 normalizar
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
function limpiarRut(rut){

  return rut
    .trim()
    .toLowerCase();

}


// 🔍 VALIDAR RUT
async function validarRut(){

  const input =
    document.getElementById("rutInput");

  const resultado =
    document.getElementById("resultado");

  const rutIngresado =
    limpiarRut(input.value);


  // ⏳ esperar JSON
  if(baseDatos.length === 0){

    resultado.innerHTML = `
      <p class="error">
        ⏳ Cargando base de datos...
      </p>
    `;

    return;
  }


  // ❌ NO EXISTE EN PADRÓN
  if(!baseDatos.includes(rutIngresado)){

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

    return;
  }


  // 🔎 REVISAR SI YA VOTÓ
  const { data, error } =
    await supabaseClient
      .from("votos")
      .select("rut")
      .eq("rut", rutIngresado);


  // ❌ ERROR SUPABASE
  if(error){

    console.error(error);

    resultado.innerHTML = `
      <p class="error">
        Error verificando voto
      </p>
    `;

    return;
  }


  // 🚫 YA VOTÓ
  if(data.length > 0){

    resultado.innerHTML = `
      <p class="error">
        ⚠ Este RUT ya votó
      </p>
    `;

    return;
  }


  // ✅ PUEDE VOTAR
  resultado.innerHTML = `
    <p class="ok">
      ✔ RUT válido
    </p>

    <button id="btnVotar">
      Ir a votar
    </button>
  `;


  // 💾 GUARDAR Y ENTRAR
  document
    .getElementById("btnVotar")
    .addEventListener("click", () => {

      localStorage.setItem(
        "rut",
        rutIngresado
      );

      location.href = "votar.html";

    });

}