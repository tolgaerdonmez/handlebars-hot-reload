import yargs from "yargs";

export const getCliArgs = (processArgv: any) =>
  yargs(processArgv)
    .usage(
      "Usage: handlebars-hot-reload -t <template path> -d <json data path> -o <output path> -s <save output>"
    )
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
      o: {
        alias: "outputPath",
        demandOption: false,
        describe: "Save the created html output to given path",
        type: "string",
      },
      s: {
        alias: "saveOutput",
        demandOption: false,
        describe:
          "Whether to save the created html output to the same directory as the template, this will override the -o / --outputPath option",
        type: "boolean",
        default: false,
      },
      m: {
        alias: "strictMode",
        demandOption: false,
        describe: "Whether to compile handlebar template in strict mode or not",
        type: "boolean",
        default: true,
      }
    }).argv;
