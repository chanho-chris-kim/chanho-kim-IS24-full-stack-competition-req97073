import openDb from "../../../helpers/sqliteDatabase";
const sqlite3 = require("sqlite3");


export default async function getCategories(req, res) {
  const db = await openDb();
  if (req.method === "GET") {
    const allProducts = await db.all("Select * FROM product");
    res.json(allProducts);
  } else if (req.method === "POST") {
    const createProduct = await db.prepare(
      "INSERT INTO product (productName, productOwnerName, Developers, scrumMasterName, methodology) VALUES(?,?,?,?,?)"
    );
    
    try {
      const response = await createProduct.run(
        req.body.productName,
        req.body.productOwnerName,
        req.body.Developers,
        req.body.scrumMasterName,
        req.body.methodology
        );
      await response.finalize();
    } catch (error) {
      res.json(error, "no data is inserted");
    }
  } 
  // else if (req.method === "PUT") {
  //   const updateProduct = await db.prepare(
  //     "UPDATE product SET productName = ?, productOwnerName = ?, Developers = ?, scrumMasterName = ?, methodology = ? WHERE productId = ?"
  //   );
  //   try {
  //     const response = await updateProduct.run(
  //       req.body.productId,
  //       req.body.productName,
  //       req.body.productOwnerName,
  //       req.body.Developers,
  //       req.body.scrumMasterName,
  //       req.body.methodology
  //     );
  //     await response.finalize();
  //   } catch (error) {
  //     res.json(error, "no data is updated");
  //   }
  // } 
  
  else {
    res.json("no data found");
  }
}
