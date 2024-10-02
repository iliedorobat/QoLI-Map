import {IS_PRODUCTION, USE_TOMCAT_SERVER} from "@/app/shared/constants/env.const";

const DOMAIN = IS_PRODUCTION ? "147.79.115.139" : "localhost";
const PORT = IS_PRODUCTION
    ? USE_TOMCAT_SERVER ? "8080" : "8443"
    : "8080";
const MAIN_URI = `http://${DOMAIN}:${PORT}/qoli/api/v2`;

export {
    DOMAIN,
    MAIN_URI,
    PORT
};
