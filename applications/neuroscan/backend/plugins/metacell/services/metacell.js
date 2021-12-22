'use strict';

const uuid = require('uuid');
const fs = require('fs');
const hbjs = require('handbrake-js');

module.exports = {
  webm2avi: async ctx => {
    const { type, data } = ctx.request.body.webmData;

    const id = uuid.v4();
    const inputFile = `/tmp/${id}.webm`;
    const outputFile = `/tmp/${id}.avi`;
    console.log(`Writing webm to: ${inputFile}`);
    const buf = Buffer.from(data);
    fs.writeFileSync(inputFile, buf);

    const output = await hbjs.run({ input: inputFile, output: outputFile });

    const aviData = fs.readFileSync(outputFile);

    fs.unlinkSync(inputFile);
    fs.unlinkSync(outputFile);

    return {"result": aviData};
  },
};
