# House Price Prediction (End-to-End ML)

An end-to-end machine learning project that predicts house prices from the Ames Housing dataset: data analysis, model training, a REST API and a web app.

## Demo

![App screenshot](screenshot.png)

## Tech Stack

- **ML:** Python, pandas, scikit-learn, XGBoost
- **API:** FastAPI
- **Frontend:** React, Vite, Tailwind CSS

## Results

5-fold cross-validation (RMSE on log price, lower is better):

| Model | RMSE (log) |
|-------|-----------|
| XGBoost | 0.1172 |
| Ridge | 0.1247 |
| Random Forest | 0.1389 |

XGBoost was selected as the final model.

## Project Structure

```
├── api/            # FastAPI app
├── data/           # dataset (not included)
├── frontend/       # React app
├── models/         # saved model (generated)
├── notebooks/      # EDA and modeling
└── requirements.txt
```

## Setup

### 1. Get the data
Download `train.csv` from the Kaggle competition
[House Prices - Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data)
and place it in the `data/` folder.

### 2. Install dependencies
```
pip install -r requirements.txt
```

### 3. Train the model
Run all cells in `notebooks/02_modeling.ipynb`. This creates
`models/house_price_model.pkl` and `models/defaults.pkl`.

### 4. Start the API
```
python -m uvicorn api.main:app --reload
```
API docs: http://127.0.0.1:8000/docs

### 5. Start the frontend
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## How it works

1. **EDA:** explored missing values, skewness and outliers
2. **Preprocessing:** median/"None" imputation, one-hot encoding, log transform of the target
3. **Modeling:** compared Ridge, Random Forest and XGBoost with cross-validation
4. **Serving:** the trained pipeline is loaded by FastAPI; the user provides 7 key features and the rest are filled with default values
5. **Frontend:** a React form sends the inputs to the API and shows the predicted price

## Limitations

- The dataset is from Ames, Iowa (USD prices), so predictions do not apply to other markets.
- The API takes only 7 inputs, so predictions are approximate.

## Future Work

- Add Sri Lankan housing data
- Hyperparameter tuning
- Deploy the API and frontend
