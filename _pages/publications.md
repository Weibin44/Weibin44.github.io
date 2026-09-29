---
layout: page
title: publications
permalink: /publications/
description: Papers, preprints, and other research outputs.
nav: true
nav_order: 1
---

{% capture publication_list %}{% bibliography %}{% endcapture %}
{% assign publication_content = publication_list | strip %}
{% if publication_content == "" %}
Publications will be added soon.
{% else %}

<div class="publications">
{{ publication_list }}
</div>
{% endif %}
