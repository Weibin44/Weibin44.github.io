# Personal website

Built with [al-folio](https://github.com/alshedivat/al-folio). The original English page structure and layout are preserved. News, blog posts, projects, publications, repository cards, and each retained CV data section contain at most two examples; collections with fewer entries are left as-is. Replace the demo content with your own information as needed.

The original al-folio palette is used: purple in light mode and cyan in dark mode. Name and website URL are configured in `_config.yml`.

**Editing, preview, and deployment guide (Chinese): [MAINTENANCE.md](MAINTENANCE.md).**

```bash
bash scripts/preview.sh
```

Server preview: http://127.0.0.1:8088 . On first startup, wait for `Server running` in `docker compose logs -f`.

For VS Code Remote SSH, forward port **8088** in the Ports panel. Alternatively, run this on your own computer:

```bash
ssh -N -L 8088:127.0.0.1:8088 your-user@your-server
```

Keep the terminal open and visit http://localhost:8088 .

```bash
bash scripts/build.sh   # Build the static site into _site/
docker compose down    # Stop preview
```

- Template provenance: [TEMPLATE_VERSION](TEMPLATE_VERSION)
- Upstream documentation: [docs/](docs/)
- License: [LICENSE](LICENSE)

The navigation CV link downloads the PDF configured in `_data/socials.yml` (`cv_pdf`). It currently points to the template PDF; upload your own before publishing. The old `/cv/` URL redirects to that PDF.
