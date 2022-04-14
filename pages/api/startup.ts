// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { responseObjectWrapper } from "@/utils/apiutil";
import { APP_CONSTANTS } from "common/constants";
import { NextApiHandler } from "next";
import data from "../../lib/startups.json";

const startups: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    return res
      .status(200)
      .json(responseObjectWrapper(true, APP_CONSTANTS.API_SUCCESS_MSG, data));
  }
  return res
    .status(400)
    .json(responseObjectWrapper(false, APP_CONSTANTS.API_METHOD_NOT_FOUND_MSG));
};

export default startups;
