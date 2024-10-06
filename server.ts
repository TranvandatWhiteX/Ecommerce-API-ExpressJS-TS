import app from "./src/app.js";
import env from "./src/configs/config.properties.js";

const PORT = env.app.port || 3001;

const server = app.listen(PORT, () => {
    console.log(`Ecommerce server started with ${PORT}`);
})