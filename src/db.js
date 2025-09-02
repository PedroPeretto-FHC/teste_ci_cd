import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crud_nodejs",
    password: "!Cris1fl@2",
    port: 5430
});