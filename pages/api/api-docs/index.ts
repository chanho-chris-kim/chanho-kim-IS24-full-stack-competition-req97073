import swagger from "./swagger.json";

export default async function getSwagger(req: any, res: any) {
  // API for GET
  if (req.method === "GET") {
    // if 200
    try {
      res.json(swagger);
      // if not success
    } catch (error) {
      res.json(error);
    }
  }
  // req.method not euqal to GET
  else {
    res.json(
      "no data found, check your api address and method. It should be req method: GET"
    );
  }
}
