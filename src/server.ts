import express, { Request, Response, NextFunction } from "express";

// ── App setup ─────────────────────────────────────────────────────────────────

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * GET /health
 * Returns a simple JSON response to confirm the API is running.
 */
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
    message: "API is running successfully",
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────

/**
 * Catch-all for any route that was not matched above.
 * Must be placed AFTER all valid routes.
 */
app.use((_req: Request, res: Response): void => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// ── Global error handler ──────────────────────────────────────────────────────

/**
 * Express recognises a middleware with four parameters as an error handler.
 * If any route calls next(error), execution jumps here instead of crashing.
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    status: "error",
    message: "An unexpected error occurred",
  });
});

// ── Start server ──────────────────────────────────────────────────────────────

// Use the PORT environment variable when running on Render; fall back to 3000 locally.
const PORT: number = parseInt(process.env.PORT ?? "3000", 10);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

