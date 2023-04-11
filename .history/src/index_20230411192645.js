const express = require("express");
const cors = require("cors");
const path = require("path"); // para crear las rutas not found - no lo hemos usado

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs"); // para la config del motor de plantillas

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const mysql = require("mysql2/promise");

let connection; // Aquí almacenaremos la conexión a la base de datos

// conexión a mysql
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

// filtra por género + ordena por nombre

server.get("/movies", (req, res) => {
  console.log("Pidiendo a la base de datos información de netflix");
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
        results.forEach((result) => console.log(result));
        res.json({ success: true, movies: results });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    connection
      .query(
        `SELECT * from movies WHERE genre = ? ORDER BY title  ${
          sortFilterParam === "asc" ? "asc" : "desc"
        }`,
        [genreFilterParam]
      )
      .then(([results, fields]) => {
        results.forEach((result) => console.log(result));
        res.json({ success: true, movies: results });
      })
      .catch((err) => {
        throw err;
      });
  }
});

// login

server.post("/login", (req, res) => {
  console.log(req.body);
  const mailInput = req.body.email;
  const passwordInput = req.body.password;

  connection
    .query(`SELECT * from users WHERE email=? AND password=?`, [
      mailInput,
      passwordInput,
    ])
    .then(([results, fields]) => {
      console.log(results);
      if (results.length > 0) {
        res.json({ success: true, userId: results[0].idUsers });
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

// motor de plantillas - siempre antes de los servidores estáticos

server.get("/movie/:movieId", (req, res) => {
  const foundMovie = req.params.movieId;
  console.log(foundMovie);
  const sql = "SELECT  * FROM movies WHERE id = ?";

  connection
    .query(sql, [foundMovie])
    .then(([results, fields]) => {
      res.render("movie", results[0]);
    })

    .catch((err) => {
      throw err;
    });
});

// servidor de estáticos - la dirección debe ser relativa a la raiz del fichero, no al fichero index

const staticServerPathWeb = "./src/public-react"; // relative to the root of the project
server.use(express.static(staticServerPathWeb));

const staticImagesPathWeb = "./src/public-movies-images";
server.use(express.static(staticImagesPathWeb));

// estilos motor de plantillas
const staticCssPathWeb = "./src/public-movies-css";
server.use(express.static(staticCssPathWeb));

// En el front:
// http://localhost:3000 - Modo desarrollo
// http://localhost:4000 - Modo producción
// desarrollo = > producción npm run publish-react

// Mongo DB

const dbConnect = require("../config/connection");
dbConnect();

const Movie = require("../models/movies");

server.get("/movies_all_mongo", (req, res) => {
  const genreMovie = req.query.genre;
  const sortMovie = req.query.sort;
  if(genreMovie === "") {
    const query = Movie.find({}).then((docs) => {
      res.json({
        success: true,
        movies: docs,
      });
    });
  }else{
  const query = Movie.find({genre: {$eq:genreMovie}}).then((docs) => {
    res.json({
      success: true,
      movies: docs,
    });
  });
}
});

//MongoDb III - 1.2 y 1.3
//const Favorite = require("../models/favorites");
//server.post('/favorites-add', (req, res) => {
//  const query = Movies.find({}, (err, docs) => {
//    if (err) {
//      console.log(err);
//    } else {
//      console.log(docs);
//    }
//  });
//});