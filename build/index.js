"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_flow_1 = require("dotenv-flow");
const aws_sdk_1 = require("aws-sdk");
(0, dotenv_flow_1.config)({ silent: true });
const aws_sdk_2 = require("aws-sdk"); // Import from AWS SDK v3
const metadata = new aws_sdk_2.MetadataService();
const app = (0, express_1.default)();
// Configura le credenziali AWS
aws_sdk_1.config.update({
    region: String(process.env.AWS_REGION),
    credentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    }
});
app.get('/', (_, res) => {
    console.log(`region ${process.env.AWS_REGION}`);
    res.status(200).json({ message: `I am online. I am a web api to test for EC2 instances region ${process.env.AWS_REGION}` });
    console.log('ciao');
});
app.get('/instance', (_, res) => {
    metadata.request('/latest/meta-data/instance-id', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
        else {
            res.status(200).json({ message: `Hello from EC2 instance id: ${data}` });
        }
    });
});
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 4999;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
