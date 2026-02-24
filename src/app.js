const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");


const propertyRoutes = require("./routes/property.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

/* =========================
   🔐 SECURITY MIDDLEWARE
========================= */

// Secure HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: "*", // change later in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api", limiter);

// Body parser with size limit
app.use(express.json({ limit: "10kb" }));

// Prevent XSS attacks


/* =========================
   📌 ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
  res.json({ message: "SaaS Backend Running 🚀" });
});

/* =========================
   ❌ GLOBAL ERROR HANDLER
========================= */

app.use(errorHandler);

module.exports = app;
