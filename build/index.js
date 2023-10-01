"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_flow_1 = require("dotenv-flow");
const aws_sdk_1 = require("aws-sdk");
(0, dotenv_flow_1.config)({ silent: true });
const aws_sdk_2 = __importStar(require("aws-sdk")); // Import from AWS SDK v3
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
    res.status(200).json({ message: 'I am online. I am a web api to test for EC2 instances' });
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
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const dotenv = require('dotenv');
// Carica le variabili di ambiente da un file .env
dotenv.config();
// Crea un oggetto ELB
const elbv2 = new aws_sdk_2.default.ELBv2({ apiVersion: '2015-12-01' });
// Esegui l'interazione con ELB qui, ad esempio, ottenere informazioni sul bilanciatore di carico
const loadBalancerName = process.env.LOAD_BALANCER_NAME;
if (loadBalancerName) {
    const params = {
        Names: [loadBalancerName],
    };
    elbv2.describeLoadBalancers(params, (err, data) => {
        if (err) {
            console.error('Errore durante la descrizione del bilanciatore di carico:', err);
        }
        else {
            console.log('Informazioni sul bilanciatore di carico:', data);
        }
    });
}
else {
    console.error('Environment variable LOAD_BALANCER_NAME is not defined or is undefined.');
}
