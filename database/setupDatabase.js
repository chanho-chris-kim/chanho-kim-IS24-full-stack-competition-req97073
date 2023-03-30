const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function openDb() {
  return sqlite.open({
    filename: "./imbData.db",
    driver: sqlite3.Database,
  });
}

async function setup() {
  const db = await openDb();
  await db.migrate({
    migrationsPath: "./database",
    force: "last",
  });

  const product = await db.all("SELECT * FROM product");
  console.log("all products", JSON.stringify(product, null, 2));
}

setup();
