const PORT = process.env.PORT || 80;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PROTOCOL = process.env.PROTOCOL || 'http';
const HOST_ADDRESS = `${PROTOCOL}://${HOSTNAME}:${PORT}`;

export {
    HOST_ADDRESS,
    HOSTNAME,
    PORT
};
