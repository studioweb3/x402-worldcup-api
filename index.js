const express = require('express');
const { x402 } = require('@x402/express');

const app = express();

// Le péage Web3
app.use('/api/premium', x402({
  payee: '0x18799902c24dEe7F499205f9e647C69e97EB193B' // 🔴 METTEZ VOTRE ADRESSE 0x... ICI
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

module.exports = app;