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
    } catch (error) {
      res.json(`${error} no data is deleted`);
    }
  } else if (req.method === "PUT") {
    const updateProduct = await db.prepare(
      "UPDATE product SET productName = ?, productOwnerName = ?, Developers = ?, scrumMasterName = ?, startDate=?, methodology = ? WHERE productId = ?"
    );
    try {
      const response = await updateProduct.run(
        req.body.productName,
        req.body.productOwnerName.lowercase(),
        req.body.Developers.lowercase(),
        req.body.scrumMasterName.lowercase(),
        req.body.startDate,
        req.body.methodology.lowercase(),
        productId
      );
      console.log(response);
        res.json(response);
    //   await response.finalize();
    } catch (error) {
      res.json(`${error} no data is edited`);
    }
  } else {
    console.log("check your req method or API address");
  }
}
