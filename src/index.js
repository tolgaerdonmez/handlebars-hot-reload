#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import WebSocket from "ws";

import { getCliArgs } from "./cli";
import { renderTemplate } from "./render-template";

let HTTP_PORT = 5000;
const WEBSOCKET_PORT = 5001;

// Reading the client websocket code from ./client-websocket-reload.js
const CLIENT_WEBSOCKET_CODE = fs.readFileSync(
  path.join(__dirname, "client-websocket-reload.js"),
  "utf8"
);

async function prepareTemplate(templatePath, dataPath) {
  let templateData = {};

  // read the template's data if exists
  dataPath = dataPath ? dataPath : templatePath.replace(/\.hbs$/, ".json");
  try {
    if (fs.statSync(dataPath).isFile()) {
      templateData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    }
  } catch {
    console.log("No template data found, continuing without data");
  }

  let html; // with the script
  let rawHtml; // without the script
  try {
    // rendering Handlebar template
    rawHtml = await renderTemplate(templateData, templatePath);
    html = rawHtml;
    // adding the hot reload script
    html += `\n\n<script>${CLIENT_WEBSOCKET_CODE}</script>`;
  } catch (error) {
    html =
      "<h1>Error rendering handlebar template, please check the console for error output</h1>";

    console.error(error);
  }

  return { rawHtml, html };
}

function main() {
  const {
    port,
    templatePath,
    dataPath,
    saveOutput,
    o: _outputPath,
    ...other
  } = getCliArgs(process.argv);

  HTTP_PORT = port ? parseInt(port) : HTTP_PORT;

  // setting output path if saveOutput is true or _outputPath is given
  const outputPath = saveOutput
    ? templatePath.replace(/\.hbs$/, ".html")
    : _outputPath
    ? _outputPath
    : "";

  console.log(other);

  // creating a new websocket instance
  new WebSocket.Server({
    port: WEBSOCKET_PORT,
  });

  const requestHandler = async (req, res) => {
    const method = req.method.toLowerCase();
    if (method === "get") {
      res.writeHead(200);

      // getting the html with the rendered hbs + hot reload code
      const { html, rawHtml } = await prepareTemplate(templatePath, dataPath);
      // writing it to the request
      res.end(html);

      // saving the created output if outputPath exists
      if (outputPath) fs.writeFileSync(outputPath, rawHtml);
      return;
    }
    res.writeHead(404);
    res.end();
  };

  const server = http.createServer(requestHandler);
  server.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
  });
}
main();
// export default main;
