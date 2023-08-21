let URL, KEY;

// Production API
if (
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("radio-ad-spread-front-end")
) {
  URL = "http://localhost:5000/api/v3";
  // URL = "https://radadspd-server.azurewebsites.net/api/v3";
  KEY = "pk_live_e017bd836d9f4//6e661f9b82e076219ee33f66d9c";
} else {
  URL = "https://radadspd-server.azurewebsites.net/api/v3";
}

export { URL, KEY };
