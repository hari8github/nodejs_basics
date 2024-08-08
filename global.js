console.log(global);

global.setTimeout(() => {
    console.log('hi da bodysoda');
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log('in the timeout');
}, 1000);

console.log(__dirname);
console.log(__filename);