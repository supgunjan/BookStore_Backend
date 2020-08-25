const Koa = require('koa');
const koaBody = require('koa-body');


const app = new Koa();
const router = require('./router');

const swagger = require("swagger2");
const { ui, validate } = require("swagger2-koa");

const swaggerDocument = swagger.loadDocumentSync("api3.yml");

// const swaggerUi = require('swagger-ui-koa');
// const swaggerJsDoc = require('swagger-jsdoc');
// const convert = require('koa-convert');
// const mount = require('koa-mount');
 
// const swaggerOptions = {
//     swaggerDefinition: {
//         info:{
//             title:"Books API",
//             description:"Books API Information",
//             contact:{
//                 name: "Mahesh"
//             },
//             servers:["http://localhost:3000"]
//         }
//     },
//     apis:["api2.yml"]
// };

 
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use(swaggerUi.serve);
// app.use(convert(mount('/apis',swaggerUi.setup(swaggerDocs))));
app.use(ui(swaggerDocument, "/swagger"))

app.use(require('koa-body')());
app.use(koaBody({ multipart: true, json: true }));
app.use(router.allowedMethods());
app.use(router.routes());

app.listen(3000,() => console.log("Server started.."));