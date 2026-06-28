import express from 'express';
import { paymentMiddleware, x402ResourceServer } from '@x402/express';
import { ExactEvmScheme } from '@x402/evm/exact/server';
import { HTTPFacilitatorClient } from '@x402/core/server';

const app = express();

// 1. Connexion au contrôleur de paiement officiel
const facilitatorClient = new HTTPFacilitatorClient({ 
  url: 'https://x402.org/facilitator', // 🔴 À changer par l'URL de production si x402 vous en a donné une autre
  // headers: { 'Authorization': 'Bearer VOTRE_CLE_API' } // Retirez les '//' si vous avez une clé secrète x402
});

// 2. Séparation pour éviter le bug de transmission
const resourceServer = new x402ResourceServer(facilitatorClient);
// Réseau Base Mainnet (Argent réel)
resourceServer.register('eip155:8453', new ExactEvmScheme());

// 3. Le péage Web3
app.use(
  paymentMiddleware(
    {
      'GET /api/premium': {
        accepts: [
          {
            scheme: 'exact',
            price: '$0.05', 
            network: 'eip155:8453', // Réseau Base Mainnet
            payTo: '0x18799902c24dEe7F499205f9e647C69e97EB193B', // Votre adresse
          },
        ],
        description: 'Data Premium Coupe du Monde',
        mimeType: 'application/json',
      },
    },
    resourceServer
  )
);

// 4. Vos données secrètes
app.get('/api/premium', (req, res) => {
  res.json({
    statut: "Succès",
    match: "France - Brésil",
    prediction: "Victoire de la France à 65%",
    conseil: "Pariez sur un but de Mbappé."
  });
});

// 5. L'espion
app.use((err, req, res, next) => {
  console.error("Détail du crash :", err);
  res.status(500).json({ erreur_serveur: err.message, stack: err.stack });
});

export default app;