const { readFile } = require("fs").promises;
const hbs = require("handlebars");

async function renderTemplate(data, templateName) {
  const html = await readFile(templateName, "utf-8");

  // creates the Handlebars template object
  const template = hbs.compile(html, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  return rendered;
}

module.exports = { renderTemplate };
