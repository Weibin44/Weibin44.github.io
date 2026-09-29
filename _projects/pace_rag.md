---
layout: page
title: PACE-RAG
description: Evidence frontloading and pressure-adaptive budgeting for RAG.
img: assets/img/publication_preview/pace-rag.png
importance: 3
category: LLMs
github: https://github.com/Weibin44/PACE-RAG
---

PACE-RAG studies how the bottleneck in retrieval-augmented generation can shift between reranking and LLM generation. It combines evidence frontloading with a reranking budget that adapts to serving pressure, aiming to retain useful evidence while reducing latency.

{% include pdf_preview.liquid path="/assets/img/projects/LLMs/pace-rag.pdf" caption="PACE-RAG overview." width="200px" %}


[Read the paper](https://arxiv.org/abs/2608.25115) 


[View the code](https://github.com/Weibin44/PACE-RAG) 

## BibTeX

<style>
  .post ol.bibliography {
    list-style: none;
    padding-left: 0;
  }
</style>

{% nocite cai2026less %}
{% bibliography --cited --group_by none --template bibtex_only %}
