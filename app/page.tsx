"use client";

import { useState } from "react";
import { initialFareClasses } from "@/lib/initialData";
import { simulateDemand } from "@/lib/simulation";
import styles from "./page.module.css";

type Season = "HIGH" | "LOW";

const formatXPF = (amount: number): string => {
  return new Intl.NumberFormat("fr-FR").format(amount) + " XPF";
};

const classDescriptions: Record<string, string> = {
  Y: "Plein tarif - Flexible",
  B: "Standard - Modifiable",
  Q: "Promo - Non modifiable",
};

export default function Home() {
  const [season, setSeason] = useState<Season>("HIGH");
  const [result, setResult] = useState<any>(null);

  const runSimulation = () => {
    const simulation = simulateDemand(initialFareClasses, season);
    setResult(simulation);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Air Tahiti - Revenue Management</h1>

        <p className={styles.subtitle}>
          Papeete (PPT) → Bora Bora (BOB) | ATR 72-600 | 72 sièges
        </p>

        <div className={styles.contextBox}>
          <p className={styles.legend}>
            <span>
              <strong>Y</strong> : Plein tarif (remboursable)
            </span>
            <span>
              <strong>B</strong> : Standard (modifiable avec frais)
            </span>
            <span>
              <strong>Q</strong> : Promo (non modifiable)
            </span>
          </p>
        </div>

        <div className={styles.controls}>
          <p className={styles.sectionTitle}>Saison :</p>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${
                season === "HIGH" ? styles.active : ""
              }`}
              onClick={() => setSeason("HIGH")}
            >
              Haute Saison (x1.3)
            </button>

            <button
              className={`${styles.button} ${
                season === "LOW" ? styles.active : ""
              }`}
              onClick={() => setSeason("LOW")}
            >
              Basse Saison (x0.7)
            </button>
          </div>

          <button
            className={`${styles.button} ${styles.runButton}`}
            onClick={runSimulation}
          >
            Lancer la simulation
          </button>
        </div>

        {result && (
          <>
            <div className={styles.results}>
              <h3>Résultats</h3>

              <div className={styles.metricsGrid}>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Revenu total :</span>
                  <span className={styles.metricValue}>
                    {formatXPF(result.totalRevenue)}
                  </span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Sièges vendus :</span>
                  <span className={styles.metricValue}>
                    {result.totalSold} / 72
                  </span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Load factor :</span>
                  <span className={styles.metricValue}>
                    {(result.loadFactor * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className={styles.loadBar}>
                <div
                  className={styles.loadFill}
                  style={{
                    width: `${result.loadFactor * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3>Détail par classe</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Classe</th>
                    <th>Description</th>
                    <th>Prix (XPF)</th>
                    <th>Protégés</th>
                    <th>Demande</th>
                    <th>Vendus</th>
                    <th>Refusés</th>
                    <th>Revenu</th>
                  </tr>
                </thead>
                <tbody>
                  {result.updatedFares.map((fare: any) => {
                    const refused = Math.max(0, fare.demand - fare.seatsSold);
                    return (
                      <tr key={fare.code}>
                        <td>
                          <strong>{fare.code}</strong>
                        </td>
                        <td>
                          <small>{classDescriptions[fare.code]}</small>
                        </td>
                        <td>{formatXPF(fare.price)}</td>
                        <td>{fare.seatsProtected}</td>
                        <td>{fare.demand}</td>
                        <td>{fare.seatsSold}</td>
                        <td
                          style={{ color: refused > 0 ? "#d32f2f" : "inherit" }}
                        >
                          {refused > 0 ? `${refused} ❌` : "0"}
                        </td>
                        <td>{formatXPF(fare.price * fare.seatsSold)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className={styles.note}>
                <small>
                  Les clients refusés représentent une opportunité de revenu
                  manquée.
                </small>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
