const pg = require("pg");
const sequelize = require("sequelize");
require("dotenv").config();

require("pg").defaults.ssl = true;

exports.pool = new pg.Pool({
  host: "ec2-52-86-177-34.compute-1.amazonaws.com",
  database: "dao1khuvdt51k",
  user: "sujwaphpdhhilw",
  port: 5432,
  password: "1f20602f67ed91a5555cee0f025b05cc4b4bd54892687e6281a269446a15fada",
  ssl: { rejectUnauthorized: false },
});
