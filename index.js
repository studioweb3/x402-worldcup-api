const express = require('express');
const { x402 } = require('@x402/express');

const app = express();

// Le péage Web3
app.use('/api/premium', x402({
  payee: '0xVOTRE_ADRESSE_PUBLIQUE_ICI' // 🔴 METTEZ VOTRE ADRESSE 0x... ICI
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