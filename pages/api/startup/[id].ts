// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from "next";
import data from "../../../lib/startups.json";
const fs = require("fs");

const startups: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    //startup id
    const { id } = req.query;
    //updated startup data
    const startupObj = JSON.parse(req.body);
    startupObj["category"] = Array.isArray(startupObj["category"])
      ? startupObj["category"]
      : startupObj["category"].split(",");
    //checking whether the startup exists in json
    const startupObjIndex = data.findIndex(
      (x) => x.id.toString() === id.toString()
    );
    if (startupObjIndex !== -1) {
      data[startupObjIndex] = startupObj;
      //save data to json
      await saveData();
      return res.status(200).json(data);
    }
    return res.status(404).json({ ok: false, message: "No such startup." });
  }
  return res
    .status(400)
    .json({ ok: false, message: "Method type not supported." });
};
//to save data to json
async function saveData() {
  fs.writeFileSync("lib/startups.json", JSON.stringify(data, null, 4));
}
export default startups;
