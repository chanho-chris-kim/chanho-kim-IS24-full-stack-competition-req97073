import { NextApiRequest, NextApiResponse } from "next";
import openDb from "../../../helpers/sqliteDatabase";
const sqlite3 = require("sqlite3");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productId = req.query.id;
  const db = await openDb();

  if (req.method === "DELETE") {
    const deleteProduct = await db.prepare(
      "DELETE FROM product WHERE productId = ?"
    );
    try {
      const response = await deleteProduct.run(productId);
      await response.finalize();
      res.json(200);
    } catch (error) {
      res.json(error);
    }
  } else if (req.method === "PUT") {
    const updateProduct = await db.prepare(
      "UPDATE product SET productName = ?, productOwnerName = ?, Developers = ?, scrumMasterName = ?, startDate=?, methodology = ? WHERE productId = ?"
    );
    try {
      const response = await updateProduct.run(
        req.body.productName,
        req.body.productOwnerName,
        req.body.Developers,
        req.body.scrumMasterName,
        req.body.startDate,
        req.body.methodology,
        productId
      );
      await response.finalize();
      res.json(200);
    } catch (error) {
      res.json(error);
    }
  } else {
    console.log("check your req method or API address");
  }
}
