import express from 'express';
import { createRequire } from 'module';

// 1. On recrée l'ancien système d'importation
const require = createRequire(import.meta.url);

// 2. On importe TOUTE la librairie dans une boîte
const x402Lib = require('@x402/express');

// 3. On extrait la fonction (soit elle s'appelle x402, soit on prend la fonction par défaut)
const x402Middleware = x402Lib.x402 || x402Lib.default || x402Lib;

const app = express();

// 4. On utilise la fonction de péage
app.use('/api/premium', x402Middleware({
  payee: '0x18799902c24dEe7F499205f9e647C69e97EB193B' // <-- 🔴 REMETTEZ VOTRE VRAIE ADRESSE ICI
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