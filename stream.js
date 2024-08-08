const fs = require('fs');

//readstream

const readStream = fs.createReadStream('./docs/smpl_strm.txt', {encoding: 'utf8'});

readStream.on('data', (chunk) => {
    console.log('---NEW CHUNK ---');
    console.log(chunk);
});

//writestream

const writeStream = fs.createWriteStream('./docs/wrte_strm.txt');
readStream.on('data', (chunk) => {
    console.log('---NEW CHUNK ---');
    console.log(chunk);
    writeStream.write('\nNEW DATA\n');
    writeStream.write(chunk);
});

//piping can be used instead of the above writeStream coding

readStream.pipe(writeStream);