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
async function cargarBaseDatos() {
  try {
    const res = await fetch("datos.json?v=" + Date.now());
    const data = await res.json();

    baseDatos = data.map(rut =>
      rut
        .replace(/\./g, "")
        .replace(/\s/g, "")
        .trim()
        .toLowerCase()
    );

  } catch (err) {
    console.error("❌ Error cargando datos.json:", err);
  }
}


// 🧼 LIMPIAR RUT
function limpiarRut(rut) {
  return rut
    .replace(/\./g, "")
    .replace(/\s/g, "")
    .trim()
    .toLowerCase();
}


// 🚀 cargar al inicio
cargarBaseDatos();


// 🔁 AUTO ACTUALIZACIÓN (cada 10 segundos)
setInterval(() => {
  cargarBaseDatos();
}, 10000);


// 🔍 VALIDAR RUT
async function validarRut() {

  const input =
    document.getElementById("rutInput");

  const resultado =
    document.getElementById("resultado");

  const rutIngresado =
    limpiarRut(input.value);


  // ⏳ esperando carga
  if (baseDatos.length === 0) {
    resultado.innerHTML = `
      <p class="error">
        ⏳ Cargando base de datos...
      </p>
    `;
    return;
  }


  // ❌ NO EXISTE EN PADRÓN
  if (!baseDatos.includes(rutIngresado)) {
    resultado.innerHTML = `
      <p class="error">
        ✖ RUT no registrado
      </p>

      <button onclick="
        window.location.href=
        'https://wa.me/56978732934?text=Quiero%20consultar%20por%20mi%20RUT'
      ">
        Soporte vía WhatsApp
      </button>
    `;
    return;
  }


  // 🔎 YA VOTÓ
  const { data, error } =
    await supabaseClient
      .from("votos")
      .select("rut")
      .eq("rut", rutIngresado)
      .limit(1);


  if (error) {
    console.error(error);

    resultado.innerHTML = `
      <p class="error">
        Error verificando voto
      </p>
    `;
    return;
  }


  if (data && data.length > 0) {
    resultado.innerHTML = `
      <p class="error">
        ⚠ Este RUT ya votó
      </p>
    `;
    return;
  }


  // ✅ OK
  resultado.innerHTML = `
    <p class="ok">
      ✔ RUT válido
    </p>

    <button id="btnVotar">
      Ir a votar
    </button>
  `;


  document
    .getElementById("btnVotar")
    .addEventListener("click", () => {

      localStorage.setItem("rut", rutIngresado);
      location.href = "votar.html";

    });
}