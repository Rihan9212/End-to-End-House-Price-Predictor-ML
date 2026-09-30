import { useState } from "react";

const NEIGHBORHOODS = [
  "Blmngtn", "Blueste", "BrDale", "BrkSide", "ClearCr", "CollgCr", "Crawfor",
  "Edwards", "Gilbert", "IDOTRR", "MeadowV", "Mitchel", "NAmes", "NoRidge",
  "NPkVill", "NridgHt", "NWAmes", "OldTown", "SWISU", "Sawyer", "SawyerW",
  "Somerst", "StoneBr", "Timber", "Veenker",
];

export default function App() {
  const [form, setForm] = useState({
    OverallQual: 7,
    GrLivArea: 1800,
    GarageCars: 2,
    TotalBsmtSF: 900,
    YearBuilt: 2005,
    FullBath: 2,
    Neighborhood: "CollgCr",
  });
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "Neighborhood" ? value : Number(value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setPrice(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Invalid input, values check pannunga");
      const data = await res.json();
      setPrice(data.predicted_price);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["OverallQual", "Overall Quality (1-10)"],
    ["GrLivArea", "Living Area (sq ft)"],
    ["GarageCars", "Garage (cars)"],
    ["TotalBsmtSF", "Basement Area (sq ft)"],
    ["YearBuilt", "Year Built"],
    ["FullBath", "Full Bathrooms"],
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">House Price Predictor</h1>

        {fields.map(([name, label]) => (
          <label key={name} className="block mb-3">
            <span className="text-sm text-gray-600">{label}</span>
            <input
              type="number"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </label>
        ))}

        <label className="block mb-4">
          <span className="text-sm text-gray-600">Neighborhood</span>
          <select
            name="Neighborhood"
            value={form.Neighborhood}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded py-2 font-medium disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {price !== null && (
          <p className="mt-4 text-xl font-semibold text-green-700">
            Predicted Price: ${price.toLocaleString()}
          </p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}