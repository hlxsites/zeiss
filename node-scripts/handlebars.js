import Handlebars from 'handlebars';
import glob from 'glob';
import fs from 'node:fs';
import path from 'path';

const cwd = process.cwd();

fs.copyFileSync(
  path.join(cwd, 'node_modules/handlebars/dist/handlebars.runtime.min.js'),
  path.join(cwd, 'libs/handlebars.runtime.min.js')
);

glob(path.join(cwd, 'blocks', '**', 'template.hbs'), (er, files) => {
  files.forEach((file) => {
    const template = fs.readFileSync(file, 'utf-8');
    const compiled = Handlebars.precompile(template);
    fs.writeFileSync(file.replace('template.hbs', 'template.js'), `export default ${compiled}`);
  });
});
