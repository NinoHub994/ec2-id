"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const aws_sdk_1 = require("aws-sdk"); // Import from AWS SDK v3
const metadata = new aws_sdk_1.MetadataService();
const app = (0, express_1.default)();
app.get('/', (_, res) => {
    res.status(200).json({ message: 'I am online. I am a web api to test for EC2 instances' });
});
app.get('/instance', (_, res) => {
    metadata.request('/latest/meta-data/instance-id', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
        else {
            res.status(200).json({ message: `Hello from EC2 instance id: ${data}!\n` });
        }
    });
});
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
