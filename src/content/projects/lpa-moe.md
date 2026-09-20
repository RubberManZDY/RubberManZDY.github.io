---
title: "LPA-MoE: A Lightweight Period-Aware MoE Model for Time Series Forecasting in Data Centers"
tag: "Machine learning for IIoT"
status: "Published at ICCC"
start: "Feb 2026"
end: "Aug 2026"
summaryLead: "First-author paper"
summary: "published at the 2026 IEEE/CIC International Conference on Communications in China (ICCC)."
featured: true
category: "research"
image: "/projects/lpa-moe/fig2.jpg"
links:
  - label: "Paper (IEEE Xplore)"
    url: "https://ieeexplore.ieee.org/document/11680246"
---

## Contributions

- A **period-aware modeling paradigm** for data-center scenarios that integrates FFT-based periodic embedding with sparse MoE routing to explicitly decouple periodic variations and alleviate pattern interference.
- An **efficient architecture** with gated lightweight TimesBlock and depthwise separable convolutions, achieving high inference efficiency and low computational overhead.
- **Superior real-world performance** on refrigeration datasets, validated by extensive experiments and ablation studies against mainstream methods.

## System Model

<figure class="my-8">
  <div class="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-line bg-accent-soft/40">
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink2">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.5-3.5a2 2 0 0 0-2.8 0L6 20"/></svg>
      <span class="font-mono text-xs">Image placeholder</span>
    </div>
    <img src="/projects/lpa-moe/fig1.png" alt="Fig. 1: A framework for time series forecasting in data centers." class="relative h-full w-full object-contain" loading="lazy" onerror="this.remove()" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 1: A framework for time series forecasting in data centers.</figcaption>
</figure>

## Methods

LPA-MoE, illustrated in Fig. 2, first encodes the time series via FFT-based periodic embedding, then extracts features with the lightweight TimesBlock, and finally decouples heterogeneous patterns for prediction via sparse MoE routing.

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/lpa-moe/fig2.jpg" alt="Fig. 2: The Architecture of LPA-MoE" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 2: The Architecture of LPA-MoE</figcaption>
</figure>

### Periodic Embedding

The embedding consists of two parts. The basic temporal embedding encodes the sequence: a one-dimensional convolution maps the input from dimension D to the latent dimension d<sub>model</sub> to produce the value embedding, combined with sine–cosine positional encoding and timestamp embedding (month / day / hour). The periodic pattern extraction applies FFT to the input X ∈ ℝ<sup>L×D</sup>, ranks the frequency components by amplitude and keeps the top-k dominant frequencies, from which the period T<sub>i</sub> = 1/f<sub>i</sub> and amplitude weight w<sub>i</sub> form a compact periodic vector h<sub>period</sub> ∈ ℝ<sup>2k</sup>, projected to d<sub>model</sub> and broadcast along the sequence. The two parts are fused via element-wise addition followed by LayerNorm:

<div class="relative my-6 py-1">
  <div class="text-center font-serif text-[15px] italic">
    h<sub>base</sub> = Dropout(h<sub>val</sub> + h<sub>pos</sub> + h<sub>tem</sub>) ∈ ℝ<sup>L×d<sub>model</sub></sup>
  </div>
  <span class="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs text-ink2">(3)</span>
</div>

<div class="relative my-6 py-1">
  <div class="text-center font-serif text-[15px] italic">
    h<sub>emb</sub> = LayerNorm(h<sub>base</sub> + h<sub>period_emb</sub>) ∈ ℝ<sup>L×d<sub>model</sub></sup>
  </div>
  <span class="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs text-ink2">(4)</span>
</div>

### Lightweight TimesBlock

The lightweight TimesBlock is built on a Pre-Norm + residual-connection paradigm. Depthwise separable convolution decomposes standard 1-D convolution into per-channel depthwise convolution and 1×1 pointwise fusion, sharply reducing parameters and computational cost while preserving feature-extraction capability. On top of this sits the core gated convolution block: input features are split into a feature-extraction branch and a gating branch, each processed by a dedicated depthwise separable convolution. A LayerScale mechanism applies a learnable scaling factor α at each residual connection to alleviate gradient vanishing and training oscillations, and progressively increasing kernel sizes naturally expand the receptive field, capturing long-range dependencies from local details.

<div class="relative my-6 py-1">
  <div class="text-center font-serif text-[15px] italic">
    GatedConv(h) = GELU(Conv<sub>feat</sub>(h)) ⊙ σ(Conv<sub>gate</sub>(h))
  </div>
  <span class="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs text-ink2">(5)</span>
</div>

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <img src="/projects/lpa-moe/fig3.png" alt="Fig. 3: Gated Convolution Block" class="w-full" loading="lazy" />
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 3: Gated Convolution Block</figcaption>
</figure>

### Sparse MoE Design

The MoE layer adopts a decoder-style sparse MoE structure with two categories of expert sub-networks: N non-shared experts and one shared expert. Non-shared experts are sparsely activated through a learned routing mechanism — each token is conditionally processed by only a top-K subset of experts — while the shared expert always participates to capture patterns common across all sequences. This hybrid design balances specialization and generalization, expanding model capacity without significantly increasing inference cost.

### Loss Function

Two losses are combined during training. The Huber loss provides robustness to outliers and training stability. The auxiliary balance loss alleviates load imbalance and routing collapse. The final loss is the sum of two losses.

<div class="my-6 py-1">
  <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
    <div class="flex items-center gap-6">
      <div class="flex items-center justify-center gap-2">
        <span class="font-serif text-[15px] italic">
          L<sub>pre</sub>(x<sub>t</sub>, <span class="relative inline-block"><i>x</i><span class="absolute -top-[0.45em] left-1/2 -translate-x-1/2 text-[0.62em] leading-none not-italic">^</span></span><sub>t</sub>) =
        </span>
        <span class="font-serif text-5xl leading-none text-ink" aria-hidden="true">{</span>
        <span class="flex flex-col justify-between gap-3 text-left font-serif text-[15px] italic">
          <span><sup>1</sup>⁄<sub>2</sub>(x<sub>t</sub> − <span class="relative inline-block"><i>x</i><span class="absolute -top-[0.45em] left-1/2 -translate-x-1/2 text-[0.62em] leading-none not-italic">^</span></span><sub>t</sub>)², &nbsp;if |x<sub>t</sub> − <span class="relative inline-block"><i>x</i><span class="absolute -top-[0.45em] left-1/2 -translate-x-1/2 text-[0.62em] leading-none not-italic">^</span></span><sub>t</sub>| ≤ δ</span>
          <span>δ × (|x<sub>t</sub> − <span class="relative inline-block"><i>x</i><span class="absolute -top-[0.45em] left-1/2 -translate-x-1/2 text-[0.62em] leading-none not-italic">^</span></span><sub>t</sub>| − <sup>1</sup>⁄<sub>2</sub>δ), &nbsp;otherwise</span>
        </span>
      </div>
      <span class="font-mono text-xs text-ink2">(14)</span>
    </div>
    <div class="flex items-center gap-6">
      <span class="font-serif text-[15px] italic">L<sub>bal</sub> = β · N · ∑<sub>e=1</sub><sup>N</sup> T<sub>e</sub> · P<sub>e</sub></span>
      <span class="font-mono text-xs text-ink2">(18)</span>
    </div>
  </div>
  <p class="mt-3 text-center text-[11px] leading-4 text-ink2">
    where T<sub>e</sub> and P<sub>e</sub> denote the token dispatch fraction and average routing probability of expert e, and β is a balancing coefficient
  </p>
</div>

<div class="relative my-6 py-1">
  <div class="text-center font-serif text-[15px] italic">
    L = L<sub>pre</sub> + L<sub>bal</sub>
  </div>
  <span class="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs text-ink2">(19)</span>
</div>

## Results

**Experiment setup.** The dataset is constructed from refrigeration units in a real data center: a 110-dimensional multivariate series sampled at one-minute intervals, with 18,310 time steps in total. Baselines include PatchTST, iTransformer, TimeXer, Transformer, Reformer, DLinear, Autoformer, Informer and TimesNet. We report MSE, MAE, MASE and SMAPE. Key configurations of LPA-MoE are listed in Table I.

<div class="my-8 overflow-x-auto">
  <table class="w-full border-collapse text-sm">
    <caption class="mb-3 text-left font-mono text-xs text-ink2">Table I: A high-level summary of LPA-MoE configurations.</caption>
    <thead>
      <tr class="border-b-2 border-line text-ink">
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">K<sub>FFT</sub></th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">Experts</th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">K<sub>experts</sub></th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">d<sub>model</sub></th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">d<sub>ff</sub></th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">d<sub>expert</sub></th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">β</th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">δ<sub>Huber</sub></th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">e<sub>layer</sub></th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">Learning rate</th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">Seq len</th>
        <th scope="col" class="px-3 py-2 text-left font-medium whitespace-nowrap">Pre len</th>
      </tr>
    </thead>
    <tbody class="text-ink2">
      <tr>
        <td class="px-3 py-2 whitespace-nowrap">5</td>
        <td class="px-3 py-2 whitespace-nowrap">13</td>
        <td class="px-3 py-2 whitespace-nowrap">3</td>
        <td class="px-3 py-2 whitespace-nowrap">128</td>
        <td class="px-3 py-2 whitespace-nowrap">512</td>
        <td class="px-3 py-2 whitespace-nowrap">64</td>
        <td class="px-3 py-2 whitespace-nowrap">0.01</td>
        <td class="px-3 py-2 whitespace-nowrap">2.0</td>
        <td class="px-3 py-2 whitespace-nowrap">2</td>
        <td class="px-3 py-2 whitespace-nowrap">1e-4</td>
        <td class="px-3 py-2 whitespace-nowrap">24</td>
        <td class="px-3 py-2 whitespace-nowrap">{4, 5, 6, 7, 8, 9, 10, 11, 12}</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="my-8 overflow-x-auto">
  <table class="w-full border-collapse text-sm">
    <caption class="mb-3 text-left font-mono text-xs text-ink2">Table II: Performance Comparison of Different Models on Long-Term Forecasting: The history length is set to 24 and the prediction length is set to 8 (Best results in bold, second best underlined, third best dash underlined)</caption>
    <thead>
      <tr class="border-b-2 border-line text-left text-ink">
        <th scope="col" class="py-2 pr-4 font-medium">Model</th>
        <th scope="col" class="py-2 pr-4 font-medium">MSE</th>
        <th scope="col" class="py-2 pr-4 font-medium">MAE</th>
        <th scope="col" class="py-2 pr-4 font-medium">SMAPE</th>
        <th scope="col" class="py-2 font-medium">MASE</th>
      </tr>
    </thead>
    <tbody class="text-ink2">
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">PatchTST</td>
        <td class="py-2 pr-4"><span class="underline decoration-dashed">0.182</span></td>
        <td class="py-2 pr-4"><span class="underline decoration-dashed">0.154</span></td>
        <td class="py-2 pr-4"><span class="underline decoration-dashed">29.988</span></td>
        <td class="py-2"><span class="underline decoration-dashed">1.535</span></td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">iTransformer</td>
        <td class="py-2 pr-4">0.182</td>
        <td class="py-2 pr-4"><span class="underline">0.152</span></td>
        <td class="py-2 pr-4"><span class="underline">29.525</span></td>
        <td class="py-2"><span class="underline">1.521</span></td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">TimeXer</td>
        <td class="py-2 pr-4">0.182</td>
        <td class="py-2 pr-4">0.156</td>
        <td class="py-2 pr-4">30.797</td>
        <td class="py-2">1.559</td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">Transformer</td>
        <td class="py-2 pr-4">0.493</td>
        <td class="py-2 pr-4">0.414</td>
        <td class="py-2 pr-4">80.406</td>
        <td class="py-2">4.138</td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">Reformer</td>
        <td class="py-2 pr-4">0.545</td>
        <td class="py-2 pr-4">0.447</td>
        <td class="py-2 pr-4">85.695</td>
        <td class="py-2">4.466</td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">DLinear</td>
        <td class="py-2 pr-4">0.185</td>
        <td class="py-2 pr-4">0.179</td>
        <td class="py-2 pr-4">37.196</td>
        <td class="py-2">1.788</td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">Autoformer</td>
        <td class="py-2 pr-4">0.189</td>
        <td class="py-2 pr-4">0.191</td>
        <td class="py-2 pr-4">42.912</td>
        <td class="py-2">1.909</td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">Informer</td>
        <td class="py-2 pr-4">0.566</td>
        <td class="py-2 pr-4">0.457</td>
        <td class="py-2 pr-4">86.768</td>
        <td class="py-2">4.572</td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">TimesNet</td>
        <td class="py-2 pr-4"><strong class="font-semibold text-ink">0.181</strong></td>
        <td class="py-2 pr-4">0.157</td>
        <td class="py-2 pr-4">31.142</td>
        <td class="py-2">1.570</td>
      </tr>
      <tr class="bg-accent-soft/60">
        <td class="py-2 pr-4 font-medium text-ink">LPA-MoE</td>
        <td class="py-2 pr-4"><span class="underline">0.181</span></td>
        <td class="py-2 pr-4"><strong class="font-semibold text-ink">0.148</strong></td>
        <td class="py-2 pr-4"><strong class="font-semibold text-ink">28.187</strong></td>
        <td class="py-2"><strong class="font-semibold text-ink">1.479</strong></td>
      </tr>
    </tbody>
  </table>
</div>

We further compare the top-5 models (iTransformer, PatchTST, TimeXer, TimesNet and LPA-MoE) across prediction lengths from 4 to 12, as illustrated in Fig. 4. These results demonstrate that LPA-MoE can effectively handle long-horizon forecasting tasks with remarkable stability.

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <div class="flex flex-col gap-3">
      <img src="/projects/lpa-moe/fig4-mse.png" alt="MSE comparison versus different prediction lengths" class="w-full" loading="lazy" />
      <img src="/projects/lpa-moe/fig4-mae.png" alt="MAE comparison versus different prediction lengths" class="w-full" loading="lazy" />
      <img src="/projects/lpa-moe/fig4-smape.png" alt="SMAPE comparison versus different prediction lengths" class="w-full" loading="lazy" />
      <img src="/projects/lpa-moe/fig4-mase.png" alt="MASE comparison versus different prediction lengths" class="w-full" loading="lazy" />
    </div>
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 4: Time series performance comparison versus different prediction lengths.</figcaption>
</figure>

We evaluate model performance across different context lengths, comparing the top-5 models, TimesNet, TimeXer, PatchTST, iTransformer and our proposed LPA-MoE. As shown in Fig. 5, LPA-MoE surpasses all comparative baselines across every evaluation metric.

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-line bg-white p-4">
    <div class="flex flex-col gap-3">
      <img src="/projects/lpa-moe/fig5-mse.png" alt="MSE comparison versus different context lengths" class="w-full" loading="lazy" />
      <img src="/projects/lpa-moe/fig5-mae.png" alt="MAE comparison versus different context lengths" class="w-full" loading="lazy" />
      <img src="/projects/lpa-moe/fig5-smape.png" alt="SMAPE comparison versus different context lengths" class="w-full" loading="lazy" />
      <img src="/projects/lpa-moe/fig5-mase.png" alt="MASE comparison versus different context lengths" class="w-full" loading="lazy" />
    </div>
  </div>
  <figcaption class="mt-3 text-center font-mono text-xs text-ink2">Fig. 5: Ablation study on context length: time series performance comparison versus different context lengths.</figcaption>
</figure>

To investigate the effects of core modules in LPA-MoE, we remove three key components: the MoE, Periodic embedding (PeriodEmb) and lightweight TimesBlock, creating four architectures as shown in Table III. iTransformer serves as the SOTA baseline for comparison.

<div class="my-8 overflow-x-auto">
  <table class="w-full border-collapse text-sm">
    <caption class="mb-3 text-left font-mono text-xs text-ink2">Table III: Ablation study on LPA-MoE by repeating the different prediction lengths experiment in Section IV and taking the average metrics (Best results in bold, second best underlined, third best dash underlined)</caption>
    <thead>
      <tr class="border-b-2 border-line text-left text-ink">
        <th scope="col" class="py-2 pr-4 font-medium">Model</th>
        <th scope="col" class="py-2 pr-4 font-medium">MSE</th>
        <th scope="col" class="py-2 pr-4 font-medium">MAE</th>
        <th scope="col" class="py-2 pr-4 font-medium">SMAPE</th>
        <th scope="col" class="py-2 font-medium">MASE</th>
      </tr>
    </thead>
    <tbody class="text-ink2">
      <tr class="border-b border-line bg-accent-soft/60">
        <td class="py-2 pr-4 font-medium text-ink">LPA-MoE (Original)</td>
        <td class="py-2 pr-4"><strong class="font-semibold text-ink">0.1805</strong></td>
        <td class="py-2 pr-4"><strong class="font-semibold text-ink">0.1474</strong></td>
        <td class="py-2 pr-4"><strong class="font-semibold text-ink">28.13</strong></td>
        <td class="py-2"><strong class="font-semibold text-ink">1.473</strong></td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">w/o MoE</td>
        <td class="py-2 pr-4">0.1815</td>
        <td class="py-2 pr-4">0.1489</td>
        <td class="py-2 pr-4">28.50</td>
        <td class="py-2">1.488</td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">w/o PeriodEmb</td>
        <td class="py-2 pr-4"><span class="underline">0.1807</span></td>
        <td class="py-2 pr-4"><span class="underline decoration-dashed">0.1480</span></td>
        <td class="py-2 pr-4"><span class="underline decoration-dashed">28.38</span></td>
        <td class="py-2"><span class="underline decoration-dashed">1.479</span></td>
      </tr>
      <tr class="border-b border-line">
        <td class="py-2 pr-4 text-ink">w/o TimesBlock</td>
        <td class="py-2 pr-4"><span class="underline decoration-dashed">0.1809</span></td>
        <td class="py-2 pr-4"><span class="underline">0.1477</span></td>
        <td class="py-2 pr-4"><span class="underline">28.19</span></td>
        <td class="py-2"><span class="underline">1.477</span></td>
      </tr>
      <tr>
        <td class="py-2 pr-4 text-ink">SOTA: iTransformer</td>
        <td class="py-2 pr-4">0.1821</td>
        <td class="py-2 pr-4">0.1515</td>
        <td class="py-2 pr-4">29.34</td>
        <td class="py-2">1.515</td>
      </tr>
    </tbody>
  </table>
</div>
