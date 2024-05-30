const { Pool } = require('pg');
const dotenv = require("dotenv");

dotenv.config();
 
const pool = new Pool({
    user: "sa@postgresqlashish",
    password: "Hypeteq@2023",
    host : "postgresqlashish.postgres.database.azure.com",
    port: 5432,
    database: "NeelNodeTraining"
});
  
module.exports = pool;