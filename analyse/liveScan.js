const Tail = require('tail').Tail
const logPath = "C:\\Games\\Neocron 2.2 CE\\logs"
const newTypeRegex = new RegExp(/Damage:\s([0-9]+\.[0-9])+\sTarget\s([\w]+)\s/);
const newHitRegex = new RegExp(/Local Player:Damage/);
const newReduction = new RegExp(/Damage:\s([0-9]+\.[0-9]+)\s\(Reduction: ([0-9]+\.[0-9]+)\s\-\s([0-9]+\.[0-9]+)\sPercentage\)\s\-[\w\s]+(armor|skills|shields)/);
let currentHit = new Hit();

function createPath(characterName, basePath) {
    basePath = basePath || logPath;
    return `${basePath}\\${characterName}_00.log`;
}

function beginScan(path) {
    console.log('beginning scan');
    const scan = new Tail(path);

    scan.on('line', lineScanned);
    scan.on('error', crash);
}

function lineScanned(line) {
    if(line.startsWith('Character System: Acceleration ')) return;
    parse(line);
    console.log(line)
}

function parse(line) {
    if(newHitRegex.test(line)) {
        currentHit.log();
        currentHit = new Hit();
        return;
    }

    const newType = newTypeRegex.exec(line)
    if(newType.length) {
        currentHit.closeType();
        const damage = parseFloat(newType[0]);
        const type = newType[1];
        currentHit.regesterType(type, damage);
        return;
    }

    const newReduction = newReduction.exec(line);
    if(newReduction.length) {
        const damageAfterReduction = newReduction[0];
        const ongoingTotalReduction = newReduction[1];
        const ongoingTotalPercentage = newReduction[2];
        const reductionSource = newReduction[3];
        currentHit.reduceType(damageAfterReduction);
    }
}

function analyseLogFile(characterName, path) {
    beginScan(createPath(characterName, path));
}

function crash(err) {
    console.log('Encountered an error and need to close');
    console.log(err.message);
    process.exit(0);
}

module.exports = analyseLogFile;
