#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
docker compose run --rm -e JEKYLL_ENV=production jekyll bash -lc 'set -e; bundle check || bundle install --jobs 4 --retry 3; bundle exec jekyll build --destination /srv/jekyll/_site'
