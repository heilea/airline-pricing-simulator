import { FareClass } from "@/types/pricing";

const TOTAL_SEATS = 72;

type Season = "HIGH" | "LOW";

function getSeasonMultiplier(season: Season): number {
  return season === "HIGH" ? 1.3 : 0.7;
}

function estimateDemand(price: number, seasonMultiplier: number): number {
  const baseDemand = 50 - price / 1000;
  const adjustedDemand = baseDemand * seasonMultiplier;
  return Math.max(0, Math.floor(adjustedDemand));
}

export function simulateDemand(fareClasses: FareClass[], season: Season) {
  let totalSold = 0;
  let totalRevenue = 0;

  // Ordre de traitement : du plus cher au moins cher
  const highToLow = [...fareClasses].sort((a, b) => b.price - a.price);

  // Protégés des classes supérieures
  let totalProtectedHigher = 0;

  const processedFares = highToLow.map((fare) => {
    if (!fare.open) {
      return {
        ...fare,
        seatsSold: 0,
        demand: 0,
      };
    }

    const demand = estimateDemand(fare.price, getSeasonMultiplier(season));

    // Calcul des sièges disponibles
    const availableSeats = TOTAL_SEATS - totalSold - totalProtectedHigher;

    // Protection anti-négatif
    const seatsToSell = Math.max(0, Math.min(demand, availableSeats));

    totalSold += seatsToSell;
    totalRevenue += seatsToSell * fare.price;

    // Ajout des protégés de cette classe
    totalProtectedHigher += fare.seatsProtected;

    return {
      ...fare,
      seatsSold: seatsToSell,
      demand: demand, // 👈 ON GARDE LA DEMANDE
    };
  });

  // Tri pour l'affichage : du moins cher au plus cher
  const lowToHigh = processedFares.sort((a, b) => a.price - b.price);

  return {
    updatedFares: lowToHigh,
    totalSold,
    totalRevenue,
    loadFactor: totalSold / TOTAL_SEATS,
    availableSeats: TOTAL_SEATS - totalSold,
  };
}

export { TOTAL_SEATS };
