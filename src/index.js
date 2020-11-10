import http from "http";
import fs from "fs";
import path from "path";
import WebSocket from "ws";

import { getCliArgs } from "./cli";
import { renderTemplate } from "./render-template";

let HTTP_PORT = 5000;
const WEBSOCKET_PORT = 5001;

const CLIENT_WEBSOCKET_CODE = fs.readFileSync(
  path.join(__dirname, "client-websocket-reload.js"),
  "utf8"
);

async function serveTemplate(res, templatePath, dataPath) {
  res.writeHead(200);

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

  let file;

  try {
    // rendering Handlebar template
    file = await renderTemplate(templateData, templatePath);

    // adding the hot reload script
    file += `\n\n<script>${CLIENT_WEBSOCKET_CODE}</script>`;
  } catch (error) {
    file =
      "<h1>Error rendering handlebar template, please check the console for error output</h1>";

    console.error(error);
  }

  res.end(file);
}

function main() {
  const { templatePath, dataPath, port } = getCliArgs(process.argv);

  HTTP_PORT = port ? Number(port) : HTTP_PORT;

  // creating a new websocket instance
  new WebSocket.Server({
    port: WEBSOCKET_PORT,
  });

  const requestHandler = async (req, res) => {
    const method = req.method.toLowerCase();
    if (method === "get") {
      serveTemplate(res, templatePath, dataPath);
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
