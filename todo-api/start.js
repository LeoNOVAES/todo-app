const app = require('./src/server');
app.listen(process.env.PORT || 3000,()=>{
    console.log(`server runing in port:${process.env.PORT || 3000}`)
});
