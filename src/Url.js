const backendUrl = window.location.host.includes("localhost")
  ? "http://localhost:4000/"
  : "https://konjure-backend.onrender.com";

export default backendUrl;
