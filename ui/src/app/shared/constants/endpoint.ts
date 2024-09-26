const IS_PRODUCTION = true;
const DOMAIN = "localhost";
const PORT = IS_PRODUCTION ? "8080" : "3070";
const PREFIX = IS_PRODUCTION ? "/qoli" : "";
const MAIN_URI = `http://${DOMAIN}:${PORT}${PREFIX}/api/v2`;

export {
    DOMAIN,
    IS_PRODUCTION,
    MAIN_URI,
    PORT
};
