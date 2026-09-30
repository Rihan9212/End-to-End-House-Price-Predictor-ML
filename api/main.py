from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent.parent
model = joblib.load(BASE_DIR / "models" / "house_price_model.pkl")
defaults = joblib.load(BASE_DIR / "models" / "defaults.pkl")

app = FastAPI(title="House Price Prediction API")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class HouseInput(BaseModel):
    OverallQual: int = Field(..., ge=1, le=10, description="Overall quality (1-10)")
    GrLivArea: int = Field(..., gt=0, description="Living area (sq ft)")
    GarageCars: int = Field(..., ge=0, description="Garage capacity (cars)")
    TotalBsmtSF: int = Field(..., ge=0, description="Basement area (sq ft)")
    YearBuilt: int = Field(..., ge=1800, le=2026)
    FullBath: int = Field(..., ge=0)
    Neighborhood: str = Field("NAmes", description="Neighborhood code, e.g. NAmes, CollgCr")


@app.get("/")
def home():
    return {"message": "House Price API is running"}


@app.post("/predict")
def predict(house: HouseInput):
    row = defaults.copy()
    row.update(house.model_dump())
    df = pd.DataFrame([row])

    price_log = model.predict(df)[0]
    price = float(np.expm1(price_log))
    return {"predicted_price": round(price)}