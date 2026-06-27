import express from 'express';
import * as x402Lib from '@x402/express';

// On utilise un nom différent (x402Middleware) pour éviter les doublons
const x402Middleware = x402Lib.x402 || x402Lib.default || x402Lib;

const app = express();

// Le péage Web3
app.use('/api/premium', x402Middleware({
  payee: '0x18799902c24dEe7F499205f9e647C69e97EB193B' // <-- 🔴 N'OUBLIEZ PAS DE REMETTRE VOTRE VRAIE ADRESSE ICI
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