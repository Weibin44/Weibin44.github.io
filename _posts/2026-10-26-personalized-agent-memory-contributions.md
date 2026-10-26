---
layout: distill
title: "Personalized Agent Memory: Findings and Contributions"
description: A record of potential bug reports, code contributions, and research discussions.
date: 2026-10-26
last_modified_at: 2026-10-26
tags: agent memory personalization
categories: research
featured: false
related_posts: false
authors:
  - name: Weibin Cai
    affiliations:
      name: Syracuse University, Data Lab
toc:
  - name: iAgent
  - name: PersonaMem-v3
  - name: Acknowledgment
  - name: Cite this post
---

{% capture introduction_note %}
As AI automates more research, papers are appearing faster, with widely varying quality. I want to slow down and build **useful, interesting projects that anyone can understand**. I also need a place to document and share my contributions, so I write posts like this one. My comments on others' work are not attacks. They reflect my own perspective and aim to help the field and those building on that work.
{% endcapture %}
{% include article_note.liquid content=introduction_note %}

## iAgent

[GitHub issue #4](https://github.com/agiresearch/iAgent/issues/4)

I found potential information leakage in the dataset. The following example comes from the book dataset.

**User 51's instruction:**

> In my search for a book that offers a powerful and enlightening perspective on history, I am on the lookout for a narrative that can provide a firsthand account of the events that shaped our world, much like how a newsroom leader might seek out a mentor with years of experience to guide their team. The author should possess a deep understanding of the subject matter, offering a nuanced and insightful portrayal of the human experience. The story should be compelling and thought-provoking, challenging the reader to question their assumptions and consider new perspectives. **By recounting the life of a former member of the Hitler Youth and his journey to understanding the manipulation that led to WWII**, this book should provide a reading experience that is both informative and impactful, much like how a mentor can offer guidance and inspiration to a team of journalists. A newsroom leader who values the mentor's experience and trusts their judgement.

**User 51's target item:**

> **Defeating the Totalitarian Lie: A Former Hitler Youth Warns America**

I initially expected LLM-based agents to perform worse on recommendation tasks than traditional approaches, such as graph-based methods. However, the results reported in iAgent and MemRec show substantial gains over graph-based baselines. My current hypotheses focus on two factors:

1. **Explicit and highly specific user intent.** In the iAgent example above, the user instruction describes the target item in considerable detail. I doubt users would typically provide such detailed descriptions and requirements in practice. This makes the task resemble a “word game” of matching a description to an item, which plays to an LLM's strengths.
2. **Cold-start items.** In the book dataset, many items have no recorded interactions. Recommendations therefore rely heavily on item text and user instructions, leaving less interaction structure for graph-based methods to use.

## PersonaMem-v3

[GitHub pull request #10](https://github.com/bowen-upenn/PersonaMem-v3/pull/10)

This PR focuses on the personalized recommendation task (personalized feed ranking). It provides four contributions:

- Identifies limitations of zero-clipped NDCG in evaluating rankings.
- Adds a min–max NDCG function for optional use. Evaluation still uses the original NDCG.
- Validates candidate rankings, excludes invalid rankings from NDCG averages, and reports valid and invalid counts.
- Compares zero-clipped, unclipped, and min–max NDCG, showing that the choice of metric affects conclusions about methods' relative performance.

### 1. Limitations of zero-clipped NDCG@K

In the personalized recommendation task (`personalized_recommendation.py`, line 375), I noticed that the final NDCG score is clipped at zero (around line 416). This clipping can hide differences in ranking quality. For example:

- **Result A:** One positive followed by four hard negatives.
- **Result B:** Five hard negatives.

A should score higher than B, yet both receive NDCG@5 = 0. Removing the final clipping gives −48.04 and −149.35, respectively (×100). Although clipping keeps scores non-negative, it loses this distinction.

### 2. Min–max NDCG@K

Min–max NDCG normalizes DCG between the worst and best possible rankings, preserving differences that zero-clipping can hide.

Relevance values remain unchanged: positive = +2, filler = +1, hard negative = −2.

$$
\mathrm{DCG}@K = \sum_{i=1}^{K}\frac{\mathrm{rel}_i}{\log_2(i+1)}
$$

$$
\mathrm{MinMaxNDCG}@K = \frac{\mathrm{DCG}@K - \mathrm{WDCG}@K}{\mathrm{IDCG}@K - \mathrm{WDCG}@K}
$$

- **IDCG@K:** DCG of the best possible ranking.
- **WDCG@K:** DCG of the worst possible ranking.
- The score remains in the range [0, 1].

### 3. Validating candidate rankings before evaluation

LLMs may generate duplicate, out-of-range, or missing candidate indexes. We exclude invalid rankings from NDCG averages to prevent malformed outputs from distorting the comparison.

### 4. How NDCG metrics affect methods' relative results

I also compared Long-context and mem0, both using `Qwen2.5-1.5B-Instruct`. Scores were recomputed on the same 2,448 queries where both methods succeeded and returned five distinct, valid candidate indexes in the top five. IDCG uses the complete candidate set. Random represents the exact expected score of a uniformly random ranking. All scores are multiplied by 100.

<div class="article-table" role="region" aria-label="NDCG metric comparison" tabindex="0" markdown="1">

| Method       | Original NDCG@5 (zero-clipped) | Original NDCG@3 (zero-clipped) | Unclipped NDCG@5 | Unclipped NDCG@3 | Min–max NDCG@5 | Min–max NDCG@3 |
| ------------ | -----------------------------: | -----------------------------: | ---------------: | ---------------: | -------------: | -------------: |
| mem0         |                          16.68 |                          20.99 |            −9.16 |            −8.36 |          54.89 |          53.78 |
| Long-context |                      **17.19** |                      **21.66** |            −9.86 |            −9.53 |          54.65 |          53.29 |
| Random       |                          17.04 |                          21.60 |        **−8.74** |        **−7.97** |      **55.08** |      **53.95** |

</div>

Removing only the final zero-clipping operation reverses the ordering of mem0 and Long-context at both K=3 and K=5.

With `Qwen2.5-1.5B-Instruct`, neither method consistently outperforms random ranking across these metrics.

## Acknowledgment

Thanks to [Weixin Chen](https://weixinchen.com/), author of [MemRec](https://github.com/rutgerswiselab/MemRec), for the discussions and exchange of ideas!

## Cite this post

```bibtex
@misc{cai2026personalizedmemory,
  author       = {Cai, Weibin},
  title        = {Personalized Agent Memory: Findings and Contributions},
  year         = {2026},
  howpublished = {Personal blog},
  url          = {https://weibin44.github.io/blog/2026/personalized-agent-memory-contributions/}
}
```
