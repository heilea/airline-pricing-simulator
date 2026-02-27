import { FareClass } from "@/types/pricing";

const TOTAL_SEATS = 68;

type Season = "HIGH" | "LOW";

export function simulateDemand(fareClasses: FareClass[], season: Season) {
  let totalSold = 0;
  let totalRevenue = 0;

  const seasonMultiplier = season === "HIGH" ? 1.2 : 0.8;

  const updatedFares = fareClasses.map((fare) => {
    if (!fare.open) return fare;

    // demande simplifiée : prix inversement proportionnel
    const baseDemand = 20 - fare.price / 100;
    const demand = Math.max(0, Math.floor(baseDemand * seasonMultiplier));

    const seatsAvailable = TOTAL_SEATS - totalSold - fare.seatsProtected;

    const seatsToSell = Math.min(demand, seatsAvailable);

    totalSold += seatsToSell;
    totalRevenue += seatsToSell * fare.price;

    return {
      ...fare,
      seatsSold: seatsToSell,
    };
  });

  const loadFactor = totalSold / TOTAL_SEATS;

  return {
    updatedFares,
    totalSold,
    totalRevenue,
    loadFactor,
  };
}
