#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
docker compose up -d
echo "预览地址：http://localhost:8088"
echo "首次运行请等待构建完成：docker compose logs -f"
