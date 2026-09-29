# Personal website

An English-language personal website built with [al-folio](https://github.com/alshedivat/al-folio), with About, Publications, Projects, and CV pages.

**Editing and deployment guide (Chinese): [MAINTENANCE.md](MAINTENANCE.md).**

```bash
bash scripts/preview.sh
```

Preview on the server: http://127.0.0.1:8088 . Wait for the build with `docker compose logs -f` on first startup.

For remote development, run this on your own computer (replace the SSH destination):

```bash
ssh -N -L 8088:127.0.0.1:8088 your-user@your-server
```

Keep the terminal open, then visit http://localhost:8088 on your computer. VS Code Remote SSH users can instead forward port 8088 from the Ports panel.

```bash
bash scripts/build.sh   # Build the static site into _site/
docker compose down    # Stop the local preview
```

Personal information is clearly marked as placeholder content. Replace it before publishing. The GitHub Pages workflow is configured; no remote repository has been connected.

- Template provenance: [TEMPLATE_VERSION](TEMPLATE_VERSION)
- Upstream documentation: [docs/](docs/)
- Content templates: [docs/content-templates/](docs/content-templates/)
- License: [LICENSE](LICENSE)
