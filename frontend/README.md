# ForenCCTV Frontend Client

React + Vite + Tailwind CSS forensic investigation client for **Smart India Hackathon 2026 (PS ID: SIH26150)**.

## Architecture

- **`src/pages/`**: Feature-segregated investigation modules (Device ID, Acquisition, Video Recovery, AI CV, Timeline, Chain of Custody, Section 65B Reports).
- **`src/layouts/`**: `MainLayout` and `AuthLayout` shells.
- **`src/services/`**: Forensic simulation and API abstraction layer.
- **`src/data/`**: Structured mock surveillance datasets.
- **`src/context/`**: Global state management (`AuthContext`, `CaseContext`, `NotificationContext`).
- **`src/utils/`**: Canvas CCTV procedural renderer, cryptographic formatters.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```
