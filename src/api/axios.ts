import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// const api = axios.create({
//   baseURL: "http://192.168.100.116:3000",
// });

// const api = axios.create({
//   baseURL: "https://813cw4cg-3000.asse.devtunnels.ms",
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   async (error) => {
//     //disini lakukan pengecekan kalau tokennya expired
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       const res = await axios.post("http://localhost:8000/auth/refresh", {
//         refreshToken,
//       });
//       console.log(res.data);
//       localStorage.setItem("accessToken", res.data.accessToken);
//       localStorage.setItem("refreshToken", res.data.refreshToken);
//     } catch (error) {
//       console.log(error);
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
