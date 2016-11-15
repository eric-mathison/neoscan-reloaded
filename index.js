const program = require('commander');
const watch = require('./analyse/liveScan')().watchLogFile;
const scanner = require('./analyse/scan')();
const colors = require('colors');

program
    .command('watch <name> [path]')
    .description(`Watches a neocron log file in real-time`)
    .action(watch)

program
    .command('scan <name> [path]')
    .description(`Scans an existing neocron log file and exits`)
    .action(scanner.scan)

program
    .command('dumbscan <name> [path]')
    .description(`Scans an existing neocron log file and exits`)
    .action(scanner.dumb)


program
  .parse(process.argv)
