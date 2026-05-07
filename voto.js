// 🔒 PROTEGER ACCESO DIRECTO

const rutGuardado = localStorage.getItem("rut");

if (!rutGuardado) {

  // 🚫 si no validó rut
  location.href = "index.html";

}





// 🔗 CONFIGURACIÓN SUPABASE
const supabaseUrl = "https://esrgibnujebtjonablgh.supabase.co";

const supabaseKey =
  "sb_publishable_dXsrrFr8lIZSrHhJ3x-C-w_rI8y42Pb";

// 🚀 CREAR CLIENTE GLOBAL
window.supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// 🗳️ FORMULARIO
document
  .getElementById("votoForm")
  .addEventListener("submit", async function (e) {

    e.preventDefault();

    const seleccionado = document.querySelector(
      'input[name="voto"]:checked'
    );

    if (!seleccionado) {
      alert("Selecciona una opción");
      return;
    }

    const rut = localStorage.getItem("rut");

    if (!rut) {
      alert("No se encontró el RUT");
      return;
    }

    // 💾 GUARDAR EN SUPABASE
    const { data, error } =
      await window.supabaseClient
        .from("votos")
        .insert([
          {
            rut: rut,
            voto: seleccionado.value
          }
        ]);

    // ❌ ERROR
    if (error) {
      console.error("ERROR:", error);

      alert(
        "Error al guardar voto. Revisa consola."
      );

      return;
    }

    console.log("✔ Guardado:", data);

    // ✅ REDIRECCIÓN
    window.location.href = "gracias.html";
});



