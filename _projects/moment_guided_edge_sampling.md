---
layout: distill
title: Moment-guided edge sampling
date: 2026-09-29
authors:
  - name: Weibin Cai
    affiliations:
      name: Syracuse University, Data Lab
  - name: Reza Zafarani
    affiliations:
      name: Syracuse University, Data Lab
description: Connecting local edge edits to global graph structure through spectral moments.
img: assets/img/projects/graph/moment-guided-edge-sampling/only_classic_with_graphs2.png
importance: 1
category: Graph
github: https://github.com/Weibin44/Moment-guided-graph-sampling
paper_url: https://arxiv.org/abs/2609.30472
toc:
  - name: Overview
  - name: Illustration
  - name: BibTeX
---

## Overview

Moment-guided edge sampling quantifies how local edge additions and removals alter global graph structure through spectral moments of the random-walk transition matrix. Exact combinatorial and low-rank updates give local edits interpretable structural signatures. The paper also studies preservation of related graph properties, including the triangle-weighted clustering coefficient, and applications to node classification and graph contrastive learning.

## Illustration

{% include pdf_preview.liquid path="/assets/img/projects/graph/moment-guided-edge-sampling/only_classic_with_graphs2.pdf" caption="Moment changes overview." width="400px" %}

## BibTeX

{% nocite cai2026moment %}
{% bibliography --cited --group_by none --template bibtex_only %}
