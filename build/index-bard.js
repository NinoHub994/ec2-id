"use strict";
// import express from 'express';
// import { config } from 'dotenv-flow';
// import { config as awsConfig } from 'aws-sdk';
// config({ silent: true });
// import AWS, { MetadataService, AWSError } from 'aws-sdk';
// const app = express();
// awsConfig.update({
//   credentials: {
//     accessKeyId: String(process.env.ENV_AWS_ACCESS_KEY_ID),
//     secretAccessKey: String(process.env.ENV_AWS_SECRET_KEY),
//   },
// });
// // Ottieni l'ID delle istanze
// const instanceId1 = "i-0a964177723bd7f49";
// const instanceId2 = "i-03d9bc5dd1178ced6";
// // Crea un'istanza di Amazon EC2
// const ec2 = new AWS.EC2({
//   region: process.env.AWS_REGION,
// });
// // Definisci un gestore di richieste
// app.get('/', async (req, res) => {
//   try {
//     // Utilizza il metodo describeInstances per ottenere le informazioni sulle istanze
//     const params = {
//       InstanceIds: [instanceId1, instanceId2], // Add more instance IDs if needed
//     };
//     const data = await ec2.describeInstances(params).promise(); // Use promise() to get a promise
//     // Extract the instance IDs from the response
//     const instanceIds = data.Reservations?.map((reservation) =>
//       reservation.Instances?.map((instance) => instance.InstanceId)
//     );
//     // Invia l'elenco degli ID delle istanze
//     res.json({ instanceIds });
//   } catch (err) {
//     console.error('Errore durante la richiesta EC2:', err);
//     res.status(500).json({ error: 'Errore durante la richiesta EC2' });
//   }
// });
// // Avvia l'app
// app.listen(3000, () => {
//   console.log('App in esecuzione su localhost:3000');
// });
// const dotenv = require('dotenv');
// // Carica le variabili di ambiente da un file .env
// dotenv.config();
// // Crea un oggetto ELB
// const elbv2 = new AWS.ELBv2({ apiVersion: '2015-12-01' });
// // Esegui l'interazione con ELB qui, ad esempio, ottenere informazioni sul bilanciatore di carico
// const loadBalancerName = process.env.LOAD_BALANCER_NAME;
// if (loadBalancerName) {
//   const params = {
//     Names: [loadBalancerName],
//     Targets: [
//       { Id: 'i-04a2fdc767beb7422' },
//       { Id: 'i-0678f7725c7cec50d' },
//     ],
//   };
//   elbv2.describeLoadBalancers(params, (err, data) => {
//     if (err) {
//       console.error('Errore durante la descrizione del bilanciatore di carico:', err);
//     } else {
//       console.log('Informazioni sul bilanciatore di carico:', data);
//     }
//   });
// } else {
//   console.error('Environment variable LOAD_BALANCER_NAME is not defined or is undefined.');
// }
