---
layout: page
permalink: /repo/
title: Repository
description:
nav: true
nav_order: 2
---

## GitHub Profile

{% if site.data.repositories.github_users %}
<div class="repositories repository-grid repository-grid-profile">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.html username=user %}
  {% endfor %}
</div>
{% endif %}

## Contribution Activity

<a class="repo-snake" href="https://github.com/GUOkekkk" aria-label="View GUOkekkk's GitHub contribution activity"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/GUOkekkk/GUOkekkk/output/github-snake-dark.svg"><img src="https://raw.githubusercontent.com/GUOkekkk/GUOkekkk/output/github-snake.svg" alt="Animated snake moving through GUOkekkk's GitHub contribution graph" width="880" height="192" loading="lazy"></picture></a>

## GitHub Repositories

{% if site.data.repositories.github_repos %}
<div class="repositories repository-grid">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}

<script defer src="{{ '/assets/js/repositories.js' | relative_url }}"></script>
