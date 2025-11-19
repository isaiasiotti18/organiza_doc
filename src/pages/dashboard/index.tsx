"use client";

import { Header } from "./components/header";
import { StatisticsCards } from "./components/statistics-cards";
import { DocumentsChart } from "./components/documents-chart";
import { ExpiringDocuments } from "./components/expiring-documents";
import { TopAccessedDocuments } from "./components/top-accessed-documents";

export default function Dashboard() {
  return (
    <main className="from-background to-muted/30 min-h-screen bg-gradient-to-br p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <Header />

        {/* Statistics Cards */}
        <StatisticsCards />

        {/* Alerts Section */}
        {/* <Alerts /> */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="space-y-6 lg:col-span-2">
            <DocumentsChart />
            {/* <ProcessingMetrics /> */}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ExpiringDocuments />
            {/* <TopAccessedDocuments /> */}
          </div>
        </div>

        {/* Bottom Row */}
        {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DocumentStatus />
        </div> */}
      </div>
    </main>
  );
}
