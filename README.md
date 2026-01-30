# Den Niwa Portfolio

A clean portfolio website showcasing selected works.

## Tech Stack

## License

© 2026 Den Niwa. All rights reserved.

## Regenerate Images List

- The site reads image paths from `images/list.json` to display photos.
- A local generator at `tools/generate_images_list.py` regenerates this file.
- It now scans `images/` recursively, so files in subfolders are included. Paths in `list.json` are relative (e.g. `sub/dir/photo.jpg`).

### Regenerate Locally

```bash
python3 tools/generate_images_list.py
```

### Auto-Regenerate on Push

- A GitHub Action at `.github/workflows/update-images-list.yml` regenerates `images/list.json` on pushes to `main` and commits changes automatically.
- If you add new images and push, the workflow will update `list.json`; GitHub Pages will pick it up shortly after.
