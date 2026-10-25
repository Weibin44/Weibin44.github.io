---
layout: about
title: about
permalink: /
subtitle: >-
  <strong>[Sep 2026]</strong> I am open to <strong>internship opportunities</strong> involving <strong>research</strong> or <strong>open-source projects</strong>.
  Please feel free to reach out if you think there may be a good fit.

profile:
  align: right
  image: prof_pic.jpg # Add your photo filename after placing it in assets/img/
  image_circular: false # crops the image to make it circular
  social: true # show enabled social icons below the profile email
  email_user: weibin44
  email_domain: data.syr.edu
  # more_info: >
  #   <p>Your office number</p>
  #   <p>Your address</p>
  #   <p>Your city</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: false # social icons are displayed below the profile photo instead

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 2 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 2 # leave blank to include all the blog posts
---

<style>
  .profile-email {
    margin-top: 0.75rem;
    text-align: center;
    font-size: 0.9rem;
    overflow-wrap: anywhere;
  }

  .post .home-section {
    border-top: 1px solid var(--global-divider-color);
    margin-top: 1.6rem;
    padding-top: 1.4rem;
  }

  .post .home-section > h2 {
    position: relative;
    margin: 0 0 0.9rem;
    padding-bottom: 0.7rem;
  }

  .post .home-section > h2::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 2.4rem;
    height: 2px;
    border-radius: 2px;
    background: var(--global-theme-color);
  }

  .post .home-section .news table {
    margin-bottom: 0;
  }

  @media (max-width: 575px) {
    .post .home-section {
      margin-top: 1.05rem;
      padding-top: 1rem;
    }

    .post .home-section > h2 {
      margin-bottom: 0.65rem;
      padding-bottom: 0.55rem;
    }
  }

  .post-header .desc {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0.65rem 0 1.5rem;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(181, 9, 172, 0.2);
    border-left: 4px solid #b509ac;
    border-radius: 0.35rem;
    background: color-mix(in srgb, #b509ac 6%, var(--global-bg-color));
    color: var(--global-text-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
  }

  .post-header .desc strong {
    font-weight: 600;
  }

  @media (min-width: 576px) {
    .profile {
      width: 25%;
      margin-left: 0;
    }

    .post-header .desc,
    .post .about-intro {
      width: 74%;
    }

    .post .about-intro {
      box-sizing: border-box;
      padding-right: 1rem;
    }
  }
</style>


<!-- Write your biography here. Tell the world about yourself. Link to your favorite [subreddit](https://www.reddit.com). You can put a picture in, too. The code is already in, just name your picture `prof_pic.jpg` and put it in the `img/` folder. -->

`Second-year Ph.D. student` at Syracuse University · **Advisor:** [Prof. Reza Zafarani](https://reza.zafarani.net/).

Main research interests:

- **Graph**: *impact of structural perturbations*
  1. **Edge sampling** — *Why drop edges at random?* [Moment-guided edge sampling]({{ '/projects/moment_guided_edge_sampling/' | relative_url }}) links local edge edits to global structure, providing an interpretable tool to visualize graph structure, preserve graph properties, and guide graph learning.
  2. **Downstream application:**<br>**(1) fake news propagation** — *How do fake and real news spread differently, and which edge edits make a propagation graph structurally more fake-like or real-like?* [Spectral Analysis of Fake News Propagation]({{ '/projects/spectral_fake_news/' | relative_url }}) uses spectral bounds to compare fake and real news propagation, then studies how edge edits steer a propagation graph toward more fake-like or real-like structures.
- **LLMs**: *efficient and effective LLM systems*
  1. **Efficient and effective RAG** — *When reranking becomes the bottleneck, can we reduce its budget without losing crucial evidence?* [PACE-RAG]({{ '/projects/pace_rag/' | relative_url }}) frontloads complementary evidence and adapts the reranking budget to serving pressure, improving evidence recall while reducing tail latency.
- **Personalization**:  
  1. **Agent Memory** *(exploring)*


<!--
Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page]({{ '/publications/' | relative_url }}) automatically.

Link to your social media connections, too. This theme is set up to use [Font Awesome icons](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/), like the ones below. Add your Facebook, Twitter, LinkedIn, Google Scholar, or just disable all of them.
-->
