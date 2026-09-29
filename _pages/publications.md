---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<style>
  .post-description:empty {
    display: none;
  }

  .publications h2.bibliography {
    color: var(--global-theme-color);
  }
</style>

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>
