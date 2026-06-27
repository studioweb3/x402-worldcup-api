import express from 'express';
import { createRequire } from 'module';

// 1. On recrée le traducteur de l'ancienne école
const require = createRequire(import.meta.url);

// 2. On importe x402 avec son système natif
const { x402 } = require('@x402/express');

const app = express();

// 3. Le péage Web3
app.use('/api/premium', x402({
  payee: '0x18799902c24dEe7F499205f9e647C69e97EB193B' // <-- 🔴 REMETTEZ VOTRE VRAIE ADRESSE ICI AVEC LES GUILLEMETS
}));

// La donnée qui sera débloquée après le paiement
app.get('/api/premium', (req, res) => {
  res.json({
    statut: "Succès",
    match: "France - Brésil",
    prediction: "Victoire de la France à 65%",
    conseil: "Pariez sur un but de Mbappé."
  });
});

export default app;