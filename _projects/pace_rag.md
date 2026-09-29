---
layout: distill
title: PACE-RAG
date: 2026-08-25
authors:
  - name: Weibin Cai
    affiliations:
      name: Syracuse University, Data Lab
  - name: Reza Zafarani
    affiliations:
      name: Syracuse University, Data Lab
description: Evidence frontloading and pressure-adaptive budgeting for RAG.
img: assets/img/publication_preview/pace-rag.png
importance: 3
category: LLMs
github: https://github.com/Weibin44/PACE-RAG
paper_url: https://arxiv.org/abs/2608.25115
toc:
  - name: Overview
  - name: BibTeX
---

## Overview

PACE-RAG studies how the bottleneck in retrieval-augmented generation can shift between reranking and LLM generation. It combines evidence frontloading with a reranking budget that adapts to serving pressure, aiming to retain useful evidence while reducing latency.

{% include pdf_preview.liquid path="/assets/img/projects/LLMs/pace-rag.pdf" caption="PACE-RAG overview." width="200px" %}

## BibTeX

{% nocite cai2026less %}
{% bibliography --cited --group_by none --template bibtex_only %}
