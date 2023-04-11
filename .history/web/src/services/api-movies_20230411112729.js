// login

// con mysql

// const getMoviesFromApi = (params) => {
//   console.log(params);
//   return fetch(
//     `//localhost:4000/movies/?genre=${params.genre}&sort=${params.sort}`,
//     {
//       method: "GET",
//       headers: { "content-type": "application/json" },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       return data;
//     });
// };

// const objToExport = {
//   getMoviesFromApi: getMoviesFromApi,
// };

// export default objToExport;

// con mongo:

const getMoviesFromApi = (params) => {
  console.log(params);
  return fetch(`//localhost:4000/movies_all_mongo`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .sort({field: "asc", test: -1})
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
