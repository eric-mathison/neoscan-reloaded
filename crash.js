

module.exports = function crash(err) {
    console.log('Encountered an error and need to close');
    console.log(err.message);
    process.exit(0);
}
