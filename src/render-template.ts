import { getCliArgs } from "./cli";

const { readFile } = require("fs").promises;
const hbs = require("handlebars");

const { m: strictMode } = getCliArgs(process.argv);

export async function renderTemplate(data: any, templateName: string) {
  const html = await readFile(templateName, "utf-8");

  // creates the Handlebars template object
  const template = hbs.compile(html, {
    strict: strictMode,
  });

  // renders the html template with the given data
  const rendered = template(data);

  return rendered;
}
