import yargs from "yargs";

export const getCliArgs = (processArgv) =>
  yargs(processArgv)
    .usage("Usage: -t <template path> -d <json data path>")
    .option({
      t: {
        alias: "templatePath",
        demandOption: true,
        describe: "Template path you want to render",
        type: "string",
      },
      j: {
        alias: "dataPath",
        demandOption: false,
        describe:
          "JSON data to be injected into handlebar template, if this is not given it will search for e.g example.hbs -> example.json",
        type: "string",
      },
      p: {
        alias: "port",
        demandOption: false,
        describe: "HTTP Port you want to serve the file",
        type: "number",
      },
    }).argv;
