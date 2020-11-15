#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import WebSocket from "ws";

import { getCliArgs } from "./cli";
import { renderTemplate } from "./render-template";
import { createWatcher } from "./watcher";

let HTTP_PORT = 5000;
const WEBSOCKET_PORT = 5001;

// Reading the client websocket code from ./client-websocket-reload.js
const CLIENT_WEBSOCKET_CODE = fs.readFileSync(
  path.join(__dirname, "../utils/client-websocket-reload.js"),
  "utf8"
);

async function prepareTemplate(templatePath: string) {
  let templateData = {};

  // read the template's data if exists
  // dataPath = dataPath ? dataPath : templatePath.replace(/\.hbs$/, ".json");
  try {
    if (fs.statSync(dataPath).isFile()) {
      templateData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    }
  } catch {
    console.log("No or corrupt template data found, continuing without data");
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

type Closer = () => void;

function startServer(): Closer {
  HTTP_PORT = port ? port : HTTP_PORT;

  // setting output path if saveOutput is true or _outputPath is given
  const outputPath = saveOutput
    ? templatePath.replace(/\.hbs$/, ".html")
    : _outputPath
    ? _outputPath
    : "";

  // rendering and saving the template if outputPath exists
  if (outputPath)
    prepareTemplate(templatePath).then(({ rawHtml }) =>
      fs.writeFileSync(outputPath, rawHtml)
    );

  // creating a new websocket instance
  const ws = new WebSocket.Server({
    port: WEBSOCKET_PORT,
  });

  const requestHandler = async (
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) => {
    const method = req.method!.toLowerCase();
    if (method === "get") {
      res.writeHead(200);

      // getting the html with the rendered hbs + hot reload code
      const { html, rawHtml } = await prepareTemplate(templatePath);

      // saving the created output if outputPath exists
      if (outputPath) {
        fs.writeFileSync(outputPath, rawHtml);
      }

      // writing it to the request
      res.end(html);
      return;
    }
    res.writeHead(404);
    res.end();
  };

  const server = http.createServer(requestHandler);
  server.listen(HTTP_PORT, () => {
    console.log(`Your 🔥 hot reload is ready on http://localhost:${HTTP_PORT}`);
  });

  return () => {
    ws.close();
    server.close();
  };
}

const {
  p: port,
  t: templatePath,
  j: _dataPath,
  s: saveOutput,
  o: _outputPath,
} = getCliArgs(process.argv);

let closeConnection: Closer | undefined;
const dataPath = _dataPath
  ? _dataPath
  : templatePath.replace(/\.hbs$/, ".json");

function restartServer() {
  if (closeConnection) closeConnection();
  closeConnection = startServer();
}

function main() {
  const w = createWatcher([templatePath, dataPath]);
  closeConnection = startServer();

  w.on("change", restartServer);
}

main();
