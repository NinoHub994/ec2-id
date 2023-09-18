import express from 'express';
import http from 'http';
import { MetadataService, AWSError } from 'aws-sdk'; // Import from AWS SDK v3

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

