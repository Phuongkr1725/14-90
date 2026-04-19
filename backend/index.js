import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/*TEST DB */
const testDB = async () => {
  try {
    const db = await pool.query("SELECT current_database()");
    console.log(" DB:", db.rows[0]);

    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name='reports'
    `);

    console.log(" Tables:", tables.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
  }
};
testDB();

/* CREATE REPORT*/
app.post("/reports", async (req, res) => {
  try {
    const {
      reporter,
      plant,
      name,
      target,
      symptoms,
      solution,
      severity,
      lat,
      lng,
      image_url,
    } = req.body;

    if (!name || lat == null || lng == null) {
      return res.status(400).json({
        error: "Thiếu dữ liệu quan trọng",
      });
    }

    const result = await pool.query(
      `INSERT INTO reports
      (reporter, plant, pest_name, target, symptoms, solution, severity, lat, lng, image_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        reporter,
        plant,
        name,
        target,
        symptoms,
        solution,
        severity,
        lat,
        lng,
        image_url,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

/* GET ALL REPORTS*/
app.get("/reports", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reports ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

/* GET REPORT BY PEST*/
app.get("/reports/pest/:name", async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);

    const result = await pool.query(
      "SELECT * FROM reports WHERE pest_name = $1 ORDER BY created_at DESC",
      [name]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

/* GET CLUSTERED PESTS*/
app.get("/pests", async (req, res) => {
  try {
    const result = await pool.query(`
   SELECT 
      pest_name,

      -- nhóm theo thời gian (tháng)
      DATE_TRUNC('month', created_at) AS month,

      -- nhóm theo khoảng cách (grid ~ 0.2 độ)
      ROUND(lat::numeric / 0.2) * 0.2 AS lat_cluster,
      ROUND(lng::numeric / 0.2) * 0.2 AS lng_cluster,

      COUNT(*)::int AS total,

      MIN(image_url) AS image_url

    FROM reports

    GROUP BY 
      pest_name,
      month,
      lat_cluster,
      lng_cluster

    HAVING 
      COUNT(*) >= 5  

    ORDER BY total DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

/*START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});