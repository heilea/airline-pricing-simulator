import { FareClass } from "@/types/pricing";

const TOTAL_SEATS = 68; // Capacité totale de l'avion

// Type pour gérer la saisonnalité
type Season = "HIGH" | "LOW";

/**
 * Retourne un multiplicateur selon la saison.
 * HIGH = demande plus forte
 * LOW  = demande plus faible
 */
function getSeasonMultiplier(season: Season): number {
  return season === "HIGH" ? 1.2 : 0.8;
}

/**
 * Estime la demande pour une classe tarifaire donnée.
 *
 * Logique :
 * - Plus le prix augmente → la demande diminue
 * - Puis on ajuste selon la saison
 */
function estimateDemand(price: number, seasonMultiplier: number): number {
  // Relation simple prix / demande
  // Exemple : si prix = 1000 → 20 - 10 = 10 passagers
  const baseDemand = 20 - price / 100;

  // Ajustement selon la saison (HIGH ou LOW)
  const adjustedDemand = baseDemand * seasonMultiplier;

  // On empêche la demande d’être négative
  // On arrondit à l’entier inférieur (pas de demi-passager)
  return Math.max(0, Math.floor(adjustedDemand));
}

/**
 * Fonction principale de simulation
 *
 * Elle calcule :
 * - Combien de sièges sont vendus
 * - Le revenue total
 * - Le load factor
 */
export function simulateDemand(fareClasses: FareClass[], season: Season) {
  let totalSold = 0; // Total sièges vendus
  let totalRevenue = 0; // Revenue total généré

  // Récupération du multiplicateur saison
  const multiplier = getSeasonMultiplier(season);

  const updatedFares = fareClasses.map((fare) => {
    // Si la classe est fermée → on ne vend rien
    if (!fare.open) {
      return fare;
    }

    // 1️⃣ Estimation de la demande pour cette classe
    const demand = estimateDemand(fare.price, multiplier);

    // 2️⃣ Calcul des sièges disponibles
    // On enlève :
    // - les sièges déjà vendus
    // - les sièges protégés pour classes supérieures
    const seatsAvailable = TOTAL_SEATS - totalSold - fare.seatsProtected;

    // 3️⃣ Nombre réel de sièges vendus
    // On ne peut pas vendre plus que :
    // - la demande estimée
    // - les sièges disponibles
    const seatsToSell = Math.min(demand, seatsAvailable);

    // 4️⃣ Mise à jour des totaux globaux
    totalSold += seatsToSell;
    totalRevenue += seatsToSell * fare.price;

    // 5️⃣ Retour de la classe mise à jour
    return {
      ...fare,
      seatsSold: seatsToSell,
    };
  });

  return {
    updatedFares,
    totalSold,
    totalRevenue,
    // Load factor = taux de remplissage
    loadFactor: totalSold / TOTAL_SEATS,
  };
}
