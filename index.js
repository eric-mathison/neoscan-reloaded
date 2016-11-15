const program = require('commander');
const analyse = require('./analyse/liveScan');
const colors = require('colors');

program
    .command('scan <name> [path]')
    .description(`Scans a neocron logfile`)
    .action(analyse)


program
  .parse(process.argv)
