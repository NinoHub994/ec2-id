import * as AWS from 'aws-sdk';
import express from 'express';

const app = express();

// Ottieni l'ID dell'istanza
const instanceId = process.env.AWS_INSTANCE_ID;

// Crea un'istanza di Amazon EC2
const ec2 = new AWS.EC2({
  region: process.env.AWS_REGION,
});

// Crea un endpoint per la richiesta
const endpoint = `https://ec2.${process.env.AWS_REGION}.amazonaws.com/`;

// Definisci un gestore di richieste
app.get('/', async (req, res) => {
  // Invia l'ID dell'istanza
  res.json({ instanceId });
});

// Avvia l'app
app.listen(3000, () => {
  console.log('App in esecuzione su localhost:3000');
});
