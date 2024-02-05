const fs = require('fs');
const argv = require('yargs')
    .version('2.5.0')
    .options({
        'm': {
            alias: 'migration',
            describe: 'Create migration file',
            type: 'string',
            demandOption: false
        },
        's': {
            alias: 'seeder',
            describe: 'Create seeder file',
            type: 'string',
            demandOption: false
        }
    })
    .check((argv, options) => {
        let errors = [];

        if (argv.ex === undefined) {

            if (argv.m === undefined && argv.s === undefined) {
                errors.push('Choose the file type');
            }
            else if (argv.m !== undefined && argv.s !== undefined) {
                errors.push('Only choose one file type');
            }
            else if ((argv.m !== undefined && argv.m.length === 0) || (argv.s !== undefined && argv.s.length === 0)) {
                errors.push('File name is required');
            }
            
            if (errors.length > 0) {
                throw new Error (`${errors.join('\n')}\n`);
            }

        }


        return true;
    })
    .argv;



const CreateFile = ({ type = '', name = '' }) => {
    // BUILD FILENAME AND CURRENT DATE TO CREATE 
    const date = (new Date()).toISOString().replace(/(-|:)/g, '').split('T');
    const fileName = `${date[0]}${date[1].substring(0, 6)}_${name}.js`;

    // CREATE FILE CONTENT
    let context = "'use strict';";
    context += "\nconst { QueryInterface } = require('sequelize');";
    context += "\nconst Sequelize = require('sequelize');";

    context += "\n\n\n/**\n * @param {QueryInterface} queryInterface\n * @param {Sequelize} sequelize\n * @param {boolean} force\n\ */";
    context += "\nconst downMethod = async (queryInterface, sequelize, force) => {\n\n}";

    context += "\n\n\nmodule.exports = {\n\t/**\n\t * @param {QueryInterface} queryInterface\n\t * @param {Sequelize} sequelize\n\t */";
    context += "\n\tasync up (queryInterface, sequelize) {\n\n\t\ttry {\n\n\t\t} catch(err) {\n\t\t\tawait downMethod(queryInterface, sequelize, true)\n\t\t\tthrow err;\n\t\t}\n\n\t},";
    context += "\n\n\t/**\n\t * @param {QueryInterface} queryInterface\n\t * @param {Sequelize} sequelize\n\t */";
    context += "\n\tasync down (queryInterface, sequelize) {\n\t\t// await downMethod(queryInterface, sequelize, false)\n\t}";
    context += "\n}";

    const folderType = type === 'm' ? 'migrations' : 'seeders';
    const folderPath = `${mainFolderPath}/database/${folderType}`;

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.appendFileSync(`${folderPath}/${fileName}`, context);


    return fileName;
}


const main = () => {
    let fileName = '';
    
    if (argv.m) {
        fileName = createFile({ type: 'm', name: argv.m, project: argv.p });
    }
    else if (argv.s){
        fileName = createFile({ type: 's', name: argv.s, project: argv.p });
    }
    else {
        return true;
    }

    console.log(`\n     File  ${fileName}  Created    \n`);
}

main();
