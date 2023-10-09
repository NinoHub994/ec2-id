"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_flow_1 = require("dotenv-flow");
const aws_sdk_1 = require("aws-sdk");
(0, dotenv_flow_1.config)({ silent: true });
const aws_sdk_2 = __importDefault(require("aws-sdk"));
const app = (0, express_1.default)();
aws_sdk_1.config.update({
    credentials: {
        accessKeyId: String(process.env.ENV_AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.ENV_AWS_SECRET_KEY),
    },
});
// Ottieni l'ID delle istanze
const instanceId1 = "i-0a964177723bd7f49";
const instanceId2 = "i-03d9bc5dd1178ced6";
// Crea un'istanza di Amazon EC2
const ec2 = new aws_sdk_2.default.EC2({
    region: process.env.AWS_REGION,
});
// Definisci un gestore di richieste
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Utilizza il metodo describeInstances per ottenere le informazioni sulle istanze
        const params = {
            InstanceIds: [instanceId1, instanceId2], // Add more instance IDs if needed
        };
        const data = yield ec2.describeInstances(params).promise(); // Use promise() to get a promise
        // Extract the instance IDs from the response
        const instanceIds = (_a = data.Reservations) === null || _a === void 0 ? void 0 : _a.map((reservation) => { var _a; return (_a = reservation.Instances) === null || _a === void 0 ? void 0 : _a.map((instance) => instance.InstanceId); });
        // Invia l'elenco degli ID delle istanze
        res.json({ instanceIds });
    }
    catch (err) {
        console.error('Errore durante la richiesta EC2:', err);
        res.status(500).json({ error: 'Errore durante la richiesta EC2' });
    }
}));
// Avvia l'app
app.listen(3000, () => {
    console.log('App in esecuzione su localhost:3000');
});
