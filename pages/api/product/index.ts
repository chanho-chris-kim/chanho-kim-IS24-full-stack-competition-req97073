import openDb from "../../../helpers/sqliteDatabase";
const sqlite3 = require("sqlite3");

export default async function getCategories(req: any, res: any) {
  const db = await openDb(); //fetching data & storing it into db

  // API for GET
  if (req.method === "GET") {
    // if 200
    try {
      const allProducts = await db.all("Select * FROM product");
      res.json(allProducts);

      // if not success
    } catch (error) {
      res.json(error);
    }
  }

  // API for POST
  else if (req.method === "POST") {
    const createProduct = await db.prepare(
      "INSERT INTO product (productName, productOwnerName, Developers, scrumMasterName, startDate, methodology) VALUES(?,?,?,?,?,?)"
    );
    try {
      const response = await createProduct.run(
        req.body.productName,
        req.body.productOwnerName,
        req.body.Developers,
        req.body.scrumMasterName,
        req.body.startDate,
        req.body.methodology
      );
      await response.finalize();
      res.json(201);
      // if not success
    } catch (error) {
      res.json(error);
    }
  }

  // req.method not euqal to GET || POST
  else {
    res.json("no data found, check your api address or req method");
  }
}
