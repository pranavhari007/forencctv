# ForenCCTV Backend Service

Node.js / Express backend service skeleton for ForenCCTV (Smart India Hackathon 2026, PS ID: SIH26150).

## Architecture

- **`src/config/`**: Hardware driver configurations and blockchain node connection parameters.
- **`src/controllers/`**: Forensic workflow controllers (Acquisition, Device ID, Carving, AI, Custody, Reports).
- **`src/middleware/`**: `requireWriteBlockVerification` middleware ensuring hardware read-only compliance.
- **`src/routes/`**: Standard RESTful API routes.

## Scripts

```bash
npm install
npm run dev
npm start
```
