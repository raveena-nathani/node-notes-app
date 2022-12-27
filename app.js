const fs  = require('fs'); // node module
const addition = require ('./utils.js'); //custom file
const validator = require('validator'); // npm package
const chalk = require('chalk'); //npm package : for styling the printed logs in terminal
//nodemon: nodemon is a tool that helps develop Node.js based applications by 
//automatically restarting the node application when file changes 
//in the directory are detected.

const yargs = require('yargs'); //Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface.

const notes = require('./notes.js');
 
// fs.writeFileSync('notes.txt',"This file was created by node.js!");

// fs.appendFileSync('notes.txt', "Appended text");

// console.log('app.js');

// console.log("sum",addition(2,3));

// console.log(validator.isEmail("raveena@example.com"));

// console.log(validator.isURL('https://test.com'));

// console.log(validator.isURL('https:/test.com'));

// console.log(chalk.red.bold.inverse('Error!'));



//Getting input from users

const command = process.argv[2];  //gives an array with first 2 elements as paths

if(command === 'add'){  // ex: "node app.js add" / more arguments "node app.js add --title="this is a title"
   // console.log('Adding note!');
}else if(command === 'remove'){
    //console.log("Remove note!")
}

//example: node app.js add --title="This is a title"
//console: { _: [ 'add' ], title: 'This is a title', '$0': 'app.js' }

//customize yargs version
yargs.version('1.1.0');



// Create add command
yargs.command({
    command: 'add',
    describe: "Add a new note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, //to make the option required
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: "Remove a note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//list command
yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    build:{
        title:{
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})


//console.log(yargs.argv);
//OR
yargs.parse();

//check all the commands registered and default options
 //node app.js --help