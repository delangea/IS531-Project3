let express = require("express");
let app = new express();
app.set("view engine","ejs");
app.use(express.static('public'))

// set up database connection
const knex = require("knex")({
    client: "mysql2",
    // client: "mysql",
    connection: {
        host:"database-1-instance-1.cqch0trtxkph.us-east-2.rds.amazonaws.com",
        // host:"localhost",
        user: "admin",
        password: "password",
        database:"professors",
        port: 3306,},});

app.get("/",(req,res) => {
    knex.select().from("professors")
    .orderBy('last_name', 'asc')
    .then((result) => {
        console.log(result);
        res.render("index", {aProfList: result});});});
app.listen(3000);
console.log("listening on port 3000")