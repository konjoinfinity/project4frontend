const backendUrl = window.location.host.includes("localhost")
  ? "http://localhost:4000/"
  : "https://konjomusicbackend.herokuapp.com/";

export default backendUrl;
