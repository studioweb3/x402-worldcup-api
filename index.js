import express from 'express';
import { paymentMiddleware, x402ResourceServer } from '@x402/express';
import { ExactEvmScheme } from '@x402/evm/exact/server';
import { HTTPFacilitatorClient } from '@x402/core/server';

const app = express();

// 1. On se connecte au contrôleur de paiement officiel x402
const facilitatorClient = new HTTPFacilitatorClient({ 
  url: 'https://x402.org/facilitator' 
});

// 2. Le véritable péage Web3
app.use(
  paymentMiddleware(
    {
      'GET /api/premium': {
        accepts: [
          {
            scheme: 'exact',
            price: '$0.05', 
            network: 'eip155:8453', // Code officiel du réseau Base Mainnet (Mettez 84532 si c'est Sepolia testnet)
            payTo: '0x18799902c24dEe7F499205f9e647C69e97EB193B', // <-- 🔴 REMETTEZ VOTRE VRAIE ADRESSE ICI
          },
        ],
        description: 'Data Premium Coupe du Monde',
        mimeType: 'application/json',
      },
    },
    new x402ResourceServer(facilitatorClient).register(
      'eip155:8453', 
      new ExactEvmScheme()
    )
  )
);

// 3. Vos données secrètes
app.get('/api/premium', (req, res) => {
  res.json({
    statut: "Succès",
    match: "France - Brésil",
    prediction: "Victoire de la France à 65%",
    conseil: "Pariez sur un but de Mbappé."
  });
});

export default app;