// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from "next";
import data from "../../lib/startups.json";

const startups: NextApiHandler = (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json(data);
  }

  return res.status(400).json({ ok: false, message: "Method type not supported." });
};

export default startups;
