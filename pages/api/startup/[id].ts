import { Startup } from "./../../../types/startup";
import { ResponseMessage } from "./../../../types/response";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from "next";
import data from "../../../lib/startups.json";
import fs from "fs";
import { APP_CONSTANTS } from "common/constants";
import { responseObjectWrapper } from "@/utils/apiutil";

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
      return res
        .status(200)
        .json(
          responseObjectWrapper(
            true,
            APP_CONSTANTS.API_STARTUP_UPDATE_SUCCESS_MSG,
            data
          )
        );
    }
    return res
      .status(404)
      .json(responseObjectWrapper(true, APP_CONSTANTS.API_NO_SUCH_STARTUP_MSG));
  }
  return res
    .status(400)
    .json(responseObjectWrapper(false, APP_CONSTANTS.API_METHOD_NOT_FOUND_MSG));
};
//to save data to json
async function saveData() {
  fs.writeFileSync("lib/startups.json", JSON.stringify(data, null, 4));
}
export default startups;
