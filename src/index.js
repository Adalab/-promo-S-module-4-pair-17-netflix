const express = require("express");
const cors = require("cors");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const mysql = require("mysql2/promise");

let connection; // Aquí almacenaremos la conexión a la base de datos

mysql
  .createConnection({
    host: "localhost",
    database: "netflix",
    user: "root",
    password: "31416",
  })
  .then((conn) => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log(
          `Conexión establecida con la base de datos (identificador=${connection.threadId})`
        );
      })
      .catch((err) => {
        console.error("Error de conexion: " + err.stack);
      });
  })
  .catch((err) => {
    console.error("Error de configuración: " + err.stack);
  });

server.get("/movies", (req, res) => {
  console.log("Pidiendo a la base de datos información de los empleados.");
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === "") {
    connection
      .query(
        `SELECT * from movies ORDER BY title ${
          sortFilterParam === "asc" ? "asc" : "desc"
        }`
      )
      .then(([results, fields]) => {
        console.log("Información recuperada:");
        results.forEach((result) => {
          console.log(result);
        });
        res.json({
          success: true,
          movies: results,
        });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    connection
      .query(
        `SELECT * from movies WHERE gender = ? ORDER BY title  ${
          sortFilterParam === "asc" ? "asc" : "desc"
        }`,
        [genreFilterParam]
      )
      .then(([results, fields]) => {
        console.log("Información recuperada:");
        results.forEach((result) => {
          console.log(result);
        });
        res.json({
          success: true,
          movies: results,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
});

server.post("/login", (req, res) => {
  console.log(req.body);
  const mailInput = req.body.email;
  const passwordInput = req.body.password;

  connection
    .query(`SELECT idUsers from users WHERE email=? AND password=?`, [
      mailInput,
      passwordInput,
    ])
    .then(([results, fields]) => {
      console.log(result);
      if (idUsers) {
        res.json({
          success: true,
          userId: "id_de_la_usuaria_encontrada",
        });
      } else {
        res.json({
          success: false,
          errorMessage: "Usuaria/o no encontrada/o",
        });
      }
    })
    .catch((err) => {
      throw err;
    });
});
