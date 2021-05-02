export default function() {
    const yargs = require('yargs/yargs');
    const { hideBin } = require('yargs/helpers');
    return yargs(hideBin(process.argv)).argv
}