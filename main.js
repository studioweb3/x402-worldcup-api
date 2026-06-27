import { createWalletClient, custom } from 'viem';
import { base } from 'viem/chains';
import { fetch as x402fetch } from '@x402/fetch';

const connectBtn = document.getElementById('connectBtn');
const buyBtn = document.getElementById('buyBtn');
const resultBox = document.getElementById('result');

let walletClient;

// 1. Connecter le portefeuille Web3
connectBtn.addEventListener('click', async () => {
  if (typeof window.ethereum === 'undefined') {
    alert("Veuillez installer un portefeuille Web3 (comme MetaMask ou Coinbase Wallet) !");
    return;
  }

  try {
    // Demander l'autorisation à l'utilisateur
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    // Configurer le "moteur" pour signer les transactions
    walletClient = createWalletClient({
      account,
      chain: base,
      transport: custom(window.ethereum)
    });

    // Mettre à jour l'interface
    connectBtn.innerText = `✅ Connecté : ${account.slice(0, 6)}...${account.slice(-4)}`;
    connectBtn.style.backgroundColor = '#10B981'; // Le bouton passe au vert
    buyBtn.disabled = false; // On déverrouille le bouton d'achat

  } catch (error) {
    console.error("Erreur de connexion :", error);
  }
});

// 2. Acheter la donnée Premium
buyBtn.addEventListener('click', async () => {
  try {
    buyBtn.innerText = "⏳ Transaction en cours...";
    buyBtn.disabled = true;

    // L'appel magique x402 qui gère le paiement et récupère la donnée
    const response = await x402fetch('/api/premium', {
      walletClient: walletClient
    });

    if (response.ok) {
      const data = await response.json();
      
      // On affiche le résultat de l'API dans la boîte noire
      resultBox.style.display = 'block';
      resultBox.innerHTML = JSON.stringify(data, null, 2);
      
      buyBtn.innerText = "🔓 Data Débloquée !";
    } else {
      buyBtn.innerText = "❌ Échec de l'achat";
      buyBtn.disabled = false;
    }
  } catch (error) {
    console.error("Erreur lors de l'achat :", error);
    buyBtn.innerText = "❌ Erreur réseau";
    buyBtn.disabled = false;
  }
});