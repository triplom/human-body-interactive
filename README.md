# Human Body Explorer — Interactive Anatomy Infographic

An interactive web application for exploring human anatomy. Click or hover over the body diagram to highlight organs, muscles, bones, and nerves, and get detailed scientific information about each structure.

![Human Body Explorer](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
[![CI/CD](https://github.com/triplom/human-body-interactive/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/triplom/human-body-interactive/actions/workflows/ci-cd.yml)

## Features

- **4 Body Systems** — Organs, Muscles, Skeleton, Nervous System
- **Front & Back Views** — Toggle between anterior and posterior anatomical views
- **Hover Tooltips** — Instant name and brief description as you hover over body parts
- **Click for Details** — Modal overlay with full description, function, location, key facts, and related structures
- **40+ Body Parts** — Comprehensive coverage of major anatomical structures
- **Dark Medical Theme** — Color-coded by system (red organs, crimson muscles, ivory bones, gold nerves)
- **Responsive Layout** — Works on desktop, tablet, and mobile
- **Accessible** — Keyboard navigable, ARIA labels, semantic HTML

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Graphics | Inline SVG |
| Container | Docker + nginx |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions |

## Project Structure

```
human-body-interactive/
├── src/
│   ├── types/
│   │   └── bodyPart.ts          # TypeScript interfaces and constants
│   ├── data/
│   │   ├── organs.ts            # 12 organs with full details
│   │   ├── muscles.ts           # 14 muscles (front + back)
│   │   ├── skeleton.ts          # 10 skeletal structures
│   │   └── nervous.ts           # 6 nervous system structures
│   ├── components/
│   │   ├── BodyViewer.tsx       # Main container with state management
│   │   ├── BodySVG.tsx          # SVG canvas with body outline
│   │   ├── BodyPartPath.tsx     # Individual interactive SVG path
│   │   ├── SystemSelector.tsx   # System toggle buttons
│   │   ├── ViewToggle.tsx       # Front/back view toggle
│   │   ├── Legend.tsx           # Structures list/legend
│   │   ├── Tooltip.tsx          # Hover tooltip
│   │   └── DetailModal.tsx      # Click detail modal
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── nginx/
│   └── nginx.conf               # Production nginx config
├── k8s/
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── .github/
│   └── workflows/
│       └── ci-cd.yml            # CI/CD pipeline
├── Dockerfile
└── ...
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Docker

### Build locally

```bash
docker build -t human-body-interactive .
docker run -p 8080:8080 human-body-interactive
```

Open [http://localhost:8080](http://localhost:8080).

### Using GitHub Container Registry

```bash
docker pull ghcr.io/triplom/human-body-interactive:latest
docker run -p 8080:8080 ghcr.io/triplom/human-body-interactive:latest
```

## Kubernetes Deployment (Girus Cluster)

### Prerequisites

- `kubectl` configured to point at the Girus cluster
- Container image pushed to `ghcr.io/triplom/human-body-interactive`

### Deploy

```bash
# Apply all manifests
kubectl apply -f k8s/

# Check status
kubectl get pods -n human-body-app
kubectl get svc -n human-body-app

# Watch rollout
kubectl rollout status deployment/human-body-interactive -n human-body-app
```

### Access

```bash
# Port-forward for local testing
kubectl port-forward svc/human-body-interactive 8080:80 -n human-body-app
```

Then open [http://localhost:8080](http://localhost:8080).

For production, configure the Ingress hostname in `k8s/ingress.yaml` to match your domain.

## CI/CD

The GitHub Actions pipeline (`.github/workflows/ci-cd.yml`) runs on every push to `main`:

1. **Lint** — ESLint + TypeScript type check
2. **Build** — `npm run build`, upload artifact
3. **Docker** — Multi-arch build (`linux/amd64`, `linux/arm64`), push to GHCR
4. **Deploy** — `kubectl apply` + rollout to Girus cluster

### Required Secrets

| Secret | Description |
|--------|-------------|
| `KUBECONFIG` | Base64-encoded kubeconfig for the Girus cluster |

To encode your kubeconfig:
```bash
base64 -w 0 ~/.kube/config
```

## Adding Body Parts

To add a new body structure, add an entry to the appropriate data file (`src/data/organs.ts`, etc.) following the `BodyPart` interface in `src/types/bodyPart.ts`. SVG paths use a `300×620` viewBox coordinate system.

## License

MIT
