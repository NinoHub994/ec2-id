import express from 'express';
import http from 'http';
import { config } from 'dotenv-flow';
config({ silent: true });
import AWS, { MetadataService, AWSError } from 'aws-sdk'; // Import from AWS SDK v3

const metadata = new MetadataService();
const app = express();

app.get('/', (_, res) => {
    res.status(200).json({message: 'I am online. I am a web api to test for EC2 instances'});
})

app.get('/instance', (_, res) => {
  metadata.request('/latest/meta-data/instance-id', (err: AWSError, data: string) => {
    if (err) {
      console.error(err);
      res.status(500).json({error: err});
    } else {
      res.status(200).json({message: `Hello from EC2 instance id: ${data}`});
    }
  });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const dotenv = require('dotenv');

// Carica le variabili di ambiente da un file .env
dotenv.config();

// Configura le credenziali AWS
AWS.config.update({
  region: process.env.AWS_REGION, // La regione AWS
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Crea un oggetto ELB
const elbv2 = new AWS.ELBv2({ apiVersion: '2015-12-01' });

// Esegui l'interazione con ELB qui, ad esempio, ottenere informazioni sul bilanciatore di carico
const loadBalancerName = process.env.LOAD_BALANCER_NAME;

if (loadBalancerName) {
  const params = {
    Names: [loadBalancerName],
  };

  elbv2.describeLoadBalancers(params, (err, data) => {
    if (err) {
      console.error('Errore durante la descrizione del bilanciatore di carico:', err);
    } else {
      console.log('Informazioni sul bilanciatore di carico:', data);
    }
  });
} else {
  console.error('Environment variable LOAD_BALANCER_NAME is not defined or is undefined.');
}

