import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";

// ⚠️ N'oubliez pas d'insérer votre vraie clé privée de test commençant par 0x
const PRIVATE_KEY = "0x681c0a59f96529b9b0bcd7397f147fb522f95d3d16582f873ef2f28b5c2b4717"; 

const signer = privateKeyToAccount(PRIVATE_KEY);
const client = new x402Client();

client.register("eip155:*", new ExactEvmScheme(signer)); 

const fetchWithPayment = wrapFetchWithPayment(fetch, client);

async function testerCatalogueComplet() {
  console.log("🚀 Lancement du test complet du catalogue x402...\n");

  try {
    // --- TRANSACTION 1 : BASIC ---
    console.log("🛒 1. Interrogation de l'API Basic (0.01 USDC)...");
    
    // Ajout du paramètre ?t= pour forcer Vercel à donner une facture fraîche sans cache
    const urlBasic = "https://x402-worldcup-api.vercel.app/api/scores?t=" + Date.now();
    const responseBasic = await fetchWithPayment(urlBasic);
    
    if (!responseBasic.ok) {
        console.log(`❌ Erreur Basic ${responseBasic.status}:`, await responseBasic.text());
    } else {
        const dataBasic = await responseBasic.json();
        console.log("✅ Succès Basic ! Données débloquées :");
        console.log(dataBasic);
    }

    console.log("\n--------------------------------------------------\n");

    // --- TRANSACTION 2 : PREMIUM ---
    console.log("💎 2. Interrogation de l'API Premium (0.05 USDC)...");
    
    const urlPremium = "https://x402-worldcup-api.vercel.app/api/premium?t=" + Date.now();
    const responsePremium = await fetchWithPayment(urlPremium);
    
    if (!responsePremium.ok) {
        console.log(`❌ Erreur Premium ${responsePremium.status}:`, await responsePremium.text());
    } else {
        const dataPremium = await responsePremium.json();
        console.log("✅ Succès Premium ! Données débloquées :");
        console.log(JSON.stringify(dataPremium, null, 2));
    }

  } catch (error) {
    console.error("❌ Échec complet de l'exécution :", error.message);
  }
}

testerCatalogueComplet();