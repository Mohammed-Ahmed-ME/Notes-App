const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note :  node app.js add --title="add Your Title Her " --body="Add Your Content Her"',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        console.log(chalk.green.inverse('Adding a new note'))
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note : node app.js remove --title="add note title you want to remove"',
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    handler: argv => {
        console.log(chalk.green.inverse('Removing the note'))
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes : node app.js list',
    handler: function () {
        console.log(chalk.green.inverse('Listing out all notes'))
        notes.getNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note : node app.js read --title="add Your Title Her "',
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    handler: argv => {
        console.log(chalk.green.inverse('Reading a note'))
        notes.readNote(argv.title)
    }
})

yargs.parse()