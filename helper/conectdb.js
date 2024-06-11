const mongoose = require('mongoose')
const { base_url, databaseliveurl, databasetesturl } = require('./utils')

const coonectdb = () => {
    let base = 'mongodb+srv://emmanueleneyoh:rguKd8CtjXtX3dZF@clusterhybrid.r8nsfxx.mongodb.net/sofa?retryWrites=true&w=majority&appName=Clusterhybrid'
    // let base = 'mongodb+srv://amirazorak0vah:ecCACleUxLqif5RI@cluster0.cre9wxa.mongodb.net/sofa?retryWrites=true&w=majority&appName=Cluster0';
    // if (process.env.NODE_ENV === 'production') {
    //     base = databaseliveurl;
    //     console.log('live server' , process.env.NODE_ENV , databaseliveurl)
    // } else {
    //     base = databasetesturl;
    //     console.log('test server' ,process.env.NODE_ENV , databasetesturl)
    // }
  
    mongoose.set('strictQuery', false);
    mongoose.connect(base)
      .then(() => console.log('Database connected !'))
      .catch((err) => console.log(err));
  };

module.exports = {
    coonectdb
}