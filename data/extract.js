/**
 * @file Transorm Contextes tool from https://voyant-tools.org/ extraction to a Cosma record
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU General Public License v3.0
 */

const fs = require('fs')
    , path = require('path')
    , ymlTool = require('js-yaml')
    , moment = require('moment');

let file = path.join(__dirname, './societe_automatique-capitalisme.json');
file = fs.readFileSync(file, 'utf-8');
file = JSON.parse(file);

const contexts = file.documentContexts.contexts;

for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i];

    console.log(context);

    const left = context.left.trim();
    const middle = context.middle.trim();
    const right = context.right.trim();

    context = `${left} ${middle} ${right}`;
    
    let record = ymlTool.dump({
        title: `Capitalisme ${context.position}`,
        id: moment().format('YYYYMMDDHHmmss') + i,
        type: 'Citation'
    })

    record =
`---
${record}---

> ${context} [[${20211124001013}]]`;

    try {
        fs.writeFileSync(
            path.join(__dirname, '../', `toto${i}.md`),
            record,
            'utf-8'
        )
    } catch (error) {
        console.log(error);
        continue;
    }
}