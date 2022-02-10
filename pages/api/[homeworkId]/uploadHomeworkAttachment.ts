import type { NextApiRequest, NextApiResponse } from "next";
import { Blob } from "node:buffer";
import { ClasschartsClient } from "classcharts-api";
import formidable from "formidable";
import fs from "fs";
import { FormData, File } from "formdata-node";
import { Encoder } from "form-data-encoder";
import { Readable } from "stream";
import { fileFromPath } from "formdata-node/file-from-path";

class BlobFromStream {
  #stream;
  size: any;

  constructor(stream: unknown, size: any) {
    this.#stream = stream;
    this.size = size;
  }

  stream() {
    return this.#stream;
  }

  get [Symbol.toStringTag]() {
    return "Blob";
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { homeworkId } = req.query;

  console.log(homeworkId, "rigged");

  if (req.method !== "POST")
    return res.status(400).json({ message: "Bad Request" });

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    if (Array.isArray(files))
      if (files.length > 5)
        return res.status(500).json({ message: "No more than 5 attachments" });
    if (!Array.isArray(files)) {
      const client = new ClasschartsClient(
        process.env.TESTING_CLASSCHARTS_CODE!,
        process.env.TESTING_BIRTHDAY
      );
      await client.login();

      const stats = fs.statSync((files as any).attachment.filepath);
      const fileSizeInBytes = stats.size;
      const readStream = fs.createReadStream(
        (files as any).attachment.filepath
      );

      const formData = new FormData();
      formData.append("file", (files as any).attachment.filepath);

      const encoder = new Encoder(formData);

      await client.makeAuthedRequest(
        `https://www.classcharts.com/apiv2student/uploadhomeworkattachment/${homeworkId}`,
        {
          method: "POST",
          headers: {
            "content-type": encoder.contentType,
          },
          body: Readable.from(encoder),
        }
      );
    }
  });

  // if (!homeworkId && !attachment)
  //   return res.status(400).json({ message: "Bad Request" });

  // // TODO add a cookie check for the code

  return res.status(200).json({ message: "OK" });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
