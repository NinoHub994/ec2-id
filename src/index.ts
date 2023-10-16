import express from 'express';
import http from 'http';
import { config } from 'dotenv-flow';
import { config as awsConfig } from 'aws-sdk';
config({ silent: true });
import AWS, { MetadataService, AWSError } from 'aws-sdk'; // Import from AWS SDK v3

const metadata = new MetadataService();
const app = express();

// Configura le credenziali AWS
awsConfig.update({
  region: String(process.env.AWS_REGION), 
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  }
});

app.get('/', (_, res) => {
  console.log(
    `region ${process.env.AWS_REGION}`
  );
    res.status(200).json({message: `I am online. I am a web api to test for EC2 instances region ${process.env.AWS_REGION}`});
    console.log('ciao');
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
const PORT = process.env.PORT || 4999;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


