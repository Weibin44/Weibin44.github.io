#!/bin/bash
set -euo pipefail
# Keep the lockfile: do not delete or restore it on preview startup.
bundle check || bundle install --jobs 4 --retry 3
exec bundle exec jekyll serve --watch --port=8080 --host=0.0.0.0 \
  --livereload --force_polling --destination /tmp/_site --config _config.yml
