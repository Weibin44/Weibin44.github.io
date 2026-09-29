---
layout: page
title: projects
permalink: /projects/
description: Problems, methods, contributions, and results.
nav: true
nav_order: 2
---

The following entries are placeholders. Replace them with your own projects.

<div class="projects">
  <div class="row row-cols-1 row-cols-md-2">
    {% assign sorted_projects = site.projects | sort: "importance" %}
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
