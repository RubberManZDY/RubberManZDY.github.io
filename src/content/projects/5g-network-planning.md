---
title: "5G Network Planning and Design for the BUPT Haidian Campus"
tag: "Wireless network optimization"
status: "Course project"
start: "Aug 2026"
end: "Sep 2026"
summaryLead: "Course project"
summary: "LTE drive test and log-data analysis of the BUPT Haidian campus network, followed by a complete 5G NR planning proposal."
featured: true
category: "course"
image: "/projects/5g-planning/fig3.png"
---

## Overview

Two-phase course project (Wireless Network Optimization). Phase 1 measured and analyzed the existing China Mobile LTE network on the BUPT Haidian campus through outdoor drive testing; Phase 2 delivered a complete 5G network planning proposal built on the measured data and the live-network engineering parameter database.

## Phase 1 — LTE Drive Test and Log Analysis

- **Setup** — 40-minute mobile drive test across four typical campus scenarios (teaching buildings, library, dormitories, stadium & main roads); DingLi Pioneer drive-test software on a ZTE Blade V8 terminal locked to LTE, synchronized with a GPS module; 11,512 samples at 5 samples/second, covering RSRP, SINR, RSRQ, RSSI and PCI.
- **Findings** — RSRP coverage is excellent (92.67% of samples ≥ −85 dBm, mean −75.54 dBm), yet SINR quality is only moderate (mean 11.66 dB, 69.19% in the 3–15 dB band). The joint analysis shows about two thirds of low-SINR points sit inside well-covered areas — the campus network is **"coverage-sufficient but quality-constrained"**, with interference rather than coverage as the root cause.
- **Problem localization** — three problem areas were located and diagnosed: MOD3 conflicts between cells of similar strength (P1: PCIs 478/241/184; P2: PCIs 34/241, SINR down to −0.40 dB; P3: PCIs 477/240 plus missing dominant cell and overshooting coverage). Optimization proposals include PCI replanning, antenna azimuth/tilt and reference-power adjustment, and handover parameter tuning.

<div class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
  <figure>
    <div class="flex h-full items-center justify-center overflow-hidden rounded-lg border border-line bg-white p-4">
      <img src="/projects/5g-planning/fig1.png" alt="Fig. 1: RSRP coverage map" class="h-auto w-full" loading="lazy" />
    </div>
    <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 1: RSRP coverage map</figcaption>
  </figure>
  <figure>
    <div class="flex h-full items-center justify-center overflow-hidden rounded-lg border border-line bg-white p-4">
      <img src="/projects/5g-planning/fig2.png" alt="Fig. 2: SINR coverage map" class="h-auto w-full" loading="lazy" />
    </div>
    <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 2: SINR coverage map</figcaption>
  </figure>
</div>

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/5g-planning/fig3.png" alt="Fig. 3: RSRP–SINR joint line graph" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 3: RSRP–SINR joint line graph</figcaption>
</figure>

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/5g-planning/fig4.png" alt="Fig. 4: Problem area P1 and its serving cells" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 4: Problem area P1 and its serving cells</figcaption>
</figure>

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/5g-planning/fig5.png" alt="Fig. 5: Problem area P2 and its serving cells" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 5: Problem area P2 and its serving cells</figcaption>
</figure>

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/5g-planning/fig6.png" alt="Fig. 6: Problem area P3 and its serving cells" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 6: Problem area P3 and its serving cells</figcaption>
</figure>

## Phase 2 — 5G Network Planning Proposal

The proposal follows a ten-step closed loop (data cleaning → baseline statistics → 40-m grid clustering → problem localization → band selection → site screening → engineering parameter design → beam planning → neighbor & PCI design → KPI target setting), with every AI-assisted step manually verified before entering the next stage.

### Band and carrier configuration

After a coverage/capacity trade-off analysis of candidate bands, **n41 (2615 MHz, 100 MHz)** was adopted — better propagation than n78 and far higher capacity than n28 — matching China Mobile's live Band 41 resources. Key parameters: 30 kHz SCS, DDDSU frame; 64T64R Massive MIMO AAU for macro sites (47–49 dBm) and 4T4R/8T8R low-power micro stations (33–34 dBm).

### Site planning

Seven stations — five co-located on existing outdoor macro rooftops plus two new low-power micro stations — provide 21 sectors. Site selection reuse power/transmission resources where possible, add micro stations only where gaps remain, and exclude indoor-distribution sites from co-location candidates.

<div class="my-8 overflow-x-auto">
  <table class="w-full border-collapse text-sm">
    <caption class="mb-3 text-left font-mono text-xs text-ink2">Table 1: Planned sites (5 co-located macros + 2 new micro stations)</caption>
    <thead>
      <tr class="border-b-2 border-line text-left text-ink">
        <th scope="col" class="py-2 pr-4 font-medium">ID</th>
        <th scope="col" class="py-2 pr-4 font-medium">Site</th>
        <th scope="col" class="py-2 pr-4 font-medium">Type</th>
        <th scope="col" class="py-2 pr-4 font-medium">Height (m)</th>
        <th scope="col" class="py-2 font-medium">Coverage scenario</th>
      </tr>
    </thead>
    <tbody class="text-ink2">
      <tr class="border-b border-line"><td class="py-2 pr-4 font-mono text-xs text-ink">S01</td><td class="py-2 pr-4 text-ink">Teaching Building 3 (co-located)</td><td class="py-2 pr-4">Macro</td><td class="py-2 pr-4">26</td><td class="py-2">Teaching area & P2</td></tr>
      <tr class="border-b border-line"><td class="py-2 pr-4 font-mono text-xs text-ink">S02</td><td class="py-2 pr-4 text-ink">SW of Apartment 3 (co-located)</td><td class="py-2 pr-4">Macro</td><td class="py-2 pr-4">19</td><td class="py-2">Dormitories, west gate & P3</td></tr>
      <tr class="border-b border-line"><td class="py-2 pr-4 font-mono text-xs text-ink">S03</td><td class="py-2 pr-4 text-ink">Service Building (co-located)</td><td class="py-2 pr-4">Macro</td><td class="py-2 pr-4">21</td><td class="py-2">Service area, canteen & north road</td></tr>
      <tr class="border-b border-line"><td class="py-2 pr-4 font-mono text-xs text-ink">S04</td><td class="py-2 pr-4 text-ink">Xingtan Road (co-located)</td><td class="py-2 pr-4">Macro</td><td class="py-2 pr-4">20</td><td class="py-2">East campus & stadium east edge</td></tr>
      <tr class="border-b border-line"><td class="py-2 pr-4 font-mono text-xs text-ink">S05</td><td class="py-2 pr-4 text-ink">Mingguang Building Z (co-located)</td><td class="py-2 pr-4">Macro</td><td class="py-2 pr-4">28</td><td class="py-2">South campus & SE boundary</td></tr>
      <tr class="border-b border-line"><td class="py-2 pr-4 font-mono text-xs text-ink">S06</td><td class="py-2 pr-4 text-ink">Gymnasium South – Stadium North (new)</td><td class="py-2 pr-4">Micro</td><td class="py-2 pr-4">20</td><td class="py-2">P1 & stadium event capacity</td></tr>
      <tr><td class="py-2 pr-4 font-mono text-xs text-ink">S07</td><td class="py-2 pr-4 text-ink">Apartment 10 (new)</td><td class="py-2 pr-4">Micro</td><td class="py-2 pr-4">12</td><td class="py-2">Dormitory–canteen transition zone</td></tr>
    </tbody>
  </table>
</div>

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/5g-planning/fig7.png" alt="Fig. 7: 5G NR site selection map" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 7: 5G NR site selection map</figcaption>
</figure>

### Beam planning and interference control

Massive MIMO beam strategies are assigned per scenario: 8-beam 2-D scanning with low/mid/high three-layer vertical weights for high-rise teaching and dormitory buildings; 8-beam sector scanning for boundary and hotspot/road areas; 4-beam directional scanning for low-power micro stations. A directional interference graph was modeled among the 21 cells and colored — all 19 interference edges passed the MOD3 check, with 86 neighbor relations defined and traceable.

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/5g-planning/fig8.png" alt="Fig. 8: PCI planning" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 8: PCI planning</figcaption>
</figure>

The simulated RSRP coverage after the planned 5G NR sites deployment is shown in Fig. 9.

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/5g-planning/fig9.png" alt="Fig. 9: Simulated RSRP coverage after 5G deployment" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 9: Simulated RSRP coverage after 5G NR sites deployment</figcaption>
</figure>
