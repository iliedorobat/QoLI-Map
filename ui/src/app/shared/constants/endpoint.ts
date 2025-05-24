import {IS_PRODUCTION, USE_TOMCAT_SERVER} from "@/app/shared/constants/env.const";

const DOMAIN = IS_PRODUCTION ? "life-index.eu" : "localhost";
const PORT = IS_PRODUCTION
    ? USE_TOMCAT_SERVER ? "8080" : "8443"
    : "8080";
const PROTOCOL = IS_PRODUCTION ? "https" : "http";
const MAIN_URI = `${PROTOCOL}://${DOMAIN}:${PORT}/qoli/api/v2`;

export {
    DOMAIN,
    MAIN_URI,
    PORT
};
