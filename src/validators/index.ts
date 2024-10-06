import addFormats from 'ajv-formats';
import Ajv from "ajv";

// @ts-ignore
const ajv = new Ajv({
    allErrors: true,
});

// @ts-ignore
addFormats(ajv);

export { ajv };