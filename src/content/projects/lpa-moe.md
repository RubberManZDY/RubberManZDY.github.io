---
title: "LPA-MoE: Period-Aware MoE for Time-Series Forecasting"
tag: "Efficient deep learning"
status: "Published at ICCC"
start: "Feb 2026"
end: "Aug 2026"
summary: "A lightweight period-aware Mixture-of-Experts model for time-series forecasting in data centers, published as a first-author paper at ICCC."
featured: true
links:
  - label: "Paper (IEEE Xplore)"
    url: "https://ieeexplore.ieee.org/document/11680246"
---

## Background

Data-center refrigeration systems produce time-series data with multi-scale periodic patterns and heterogeneous dynamics, which makes accurate forecasting difficult. Dense models either overfit pattern noise or cost too much at inference time.

## Approach

We designed LPA-MoE around two ideas:

- **Period-aware modeling** — FFT-based periodic embeddings combined with sparse Mixture-of-Experts routing explicitly decouple periodic variations and mitigate pattern interference.
- **Lightweight feature extraction** — a gated lightweight TimesBlock with depthwise separable convolutions extracts fine-grained temporal and multi-scale periodic features, keeping inference efficient and computational overhead low.

## Results

Validated on real-world IoT datasets from data-center refrigeration units, LPA-MoE improves prediction accuracy and stability for multi-pattern time-series data, showing superior generalization and demonstrating the industrial value of MoE in energy-saving scenarios. The work was published as a first-author paper at the International Conference on Computer and Communications (ICCC).
