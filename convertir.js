const fs = require("fs");

const csv = fs.readFileSync("datos.csv", "utf-8");

const ruts = csv
  .split("\n")
  .slice(1) // elimina encabezado
  .map(linea => linea.split(";")[0].trim()) // solo columna RUT
  .filter(r => r !== "");

fs.writeFileSync("datos.json", JSON.stringify(ruts, null, 2));

console.log("✅ RUTs convertidos correctamente");