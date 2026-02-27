"use client";

import { useState } from "react";
import { initialFareClasses } from "@/lib/initialData";
import { simulateDemand } from "@/lib/simulation";

export default function Home() {
  const [season, setSeason] = useState<"HIGH" | "LOW">("HIGH");
  const [result, setResult] = useState<any>(null);

  const runSimulation = () => {
    const simulation = simulateDemand(initialFareClasses, season);
    setResult(simulation);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Airline Pricing Decision Simulator</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setSeason("HIGH")}>High Season</button>
        <button onClick={() => setSeason("LOW")}>Low Season</button>
      </div>

      <button onClick={runSimulation}>Run Simulation</button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <p>Total Sold: {result.totalSold}</p>
          <p>Total Revenue: €{result.totalRevenue}</p>
          <p>Load Factor: {(result.loadFactor * 100).toFixed(1)}%</p>
        </div>
      )}
    </main>
  );
}
