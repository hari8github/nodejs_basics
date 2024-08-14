const {MongoClient} = require('mongodb');

let dbConnection
let url = 'mongodb+srv://<user-name>:<password>@clusterhv.ew0w3qw.mongodb.net/?retryWrites=true&w=majority&appName=Clusterhv'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(url)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}
