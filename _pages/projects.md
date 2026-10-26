---
layout: page
title: projects
permalink: /projects/
description: .
nav: true
nav_order: 3
display_categories: [Graph, LLMs]
category_descriptions:
  Graph: impact of structural perturbations
  LLMs: efficient and effective LLM systems
horizontal: false
---

<!-- pages/projects.md -->

<style>
  .projects .card {
    position: relative;
    max-width: 440px;
  }

  /* Let each card end after its own content instead of filling the tallest column. */
  .projects .card.h-100 {
    height: auto !important;
  }

  .projects .card figure {
    display: grid;
    place-items: center;
    aspect-ratio: 3 / 2;
    max-height: 250px;
    margin-bottom: 0;
    overflow: hidden;
  }

  .projects .card figure picture {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  .projects .card figure img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .projects .card-body {
    padding: 0.75rem 1.1rem 1rem;
  }

  .projects .card-title {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
    transition: color 0.2s ease;
  }

  .projects .card:hover .card-title {
    color: var(--global-theme-color);
  }

  .projects .card-text {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .projects .github-icon {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--global-bg-color);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16);
  }

  .projects .github-icon a {
    color: var(--global-theme-color);
  }

  .projects .github-icon .gh-icon {
    font-size: 1.1rem;
  }

  .projects h2.category {
    color: var(--global-theme-color);
    text-align: left;
  }

  .projects h2.category .category-subtitle {
    margin-left: 0.55rem;
    color: var(--global-text-color-light);
    font-size: 0.5em;
    font-weight: 400;
  }

  .projects > a:first-of-type h2.category {
    margin-top: 0.5rem;
  }
</style>

<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}{% assign category_description = page.category_descriptions[category] %}{% if category_description %}<em class="category-subtitle">{{ category_description }}</em>{% endif %}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
