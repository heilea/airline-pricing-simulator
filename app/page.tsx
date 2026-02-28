"use client";

import { useState } from "react";
import { initialFareClasses } from "@/lib/initialData";
import { simulateDemand } from "@/lib/simulation";
import styles from "./page.module.css";

type Season = "HIGH" | "LOW";

export default function Home() {
  const [season, setSeason] = useState<Season>("HIGH");
  const [result, setResult] = useState<{
    totalSold: number;
    totalRevenue: number;
    loadFactor: number;
  } | null>(null);

  const runSimulation = () => {
    const simulation = simulateDemand(initialFareClasses, season);
    setResult(simulation);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Airline Pricing Decision Simulator</h1>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${
              season === "HIGH" ? styles.active : ""
            }`}
            onClick={() => setSeason("HIGH")}
          >
            High Season
          </button>

          <button
            className={`${styles.button} ${
              season === "LOW" ? styles.active : ""
            }`}
            onClick={() => setSeason("LOW")}
          >
            Low Season
          </button>
        </div>

        <button
          className={`${styles.button} ${styles.runButton}`}
          onClick={runSimulation}
        >
          Run Simulation
        </button>

        {result && (
          <div className={styles.results}>
            <p>Total Sold: {result.totalSold}</p>
            <p>Total Revenue: €{result.totalRevenue}</p>
            <p>Load Factor: {(result.loadFactor * 100).toFixed(1)}%</p>
          </div>
        )}
      </div>
    </main>
  );
}
