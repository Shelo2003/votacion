// 🔗 SUPABASE
const supabaseUrl =
  "https://esrgibnujebtjonablgh.supabase.co";

const supabaseKey =
  "sb_publishable_dXsrrFr8lIZSrHhJ3x-C-w_rI8y42Pb";


// 🚀 CLIENTE
window.adminSupabase =
  window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// 📊 CARGAR RESULTADOS
async function cargarResultados() {

  try {

    const { data, error } =
      await window.adminSupabase
        .from("votos")
        .select("*");


    // ❌ ERROR
    if (error) {

      console.error(error);

      document.getElementById("total")
        .innerText =
        "Error cargando votos";

      return;
    }


    // 📊 CONTAR
    const total = data.length;

    const opcion1 =
      data.filter(
        voto => voto.voto === "opcion1"
      ).length;

    const opcion2 =
      data.filter(
        voto => voto.voto === "opcion2"
      ).length;


    // 🖥️ MOSTRAR
    document.getElementById("total")
      .innerText =
      `Total votos: ${total}`;

    document.getElementById("op1")
      .innerText =
      `Opción 1: ${opcion1}`;

    document.getElementById("op2")
      .innerText =
      `Opción 2: ${opcion2}`;

  }

  catch(err) {

    console.error(err);

    document.getElementById("total")
      .innerText =
      "Error inesperado";
  }

}


// 🚀 INICIAR
cargarResultados();