import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Data load
df = pd.read_csv("data/train.csv")   # notebook root le irundha "data/train.csv"
target = "SalePrice"
print("Shape:", df.shape)

# 1. Missing values
missing = df.isnull().sum().sort_values(ascending=False)
missing = missing[missing > 0]
print("\nMissing values:")
print(missing)

# 2. Price skewness
print("\nSkewness:", df[target].skew())

# 3. Top correlations
corr = df.select_dtypes(include=np.number).corr()[target].sort_values(ascending=False)
print("\nTop 10 correlations:")
print(corr.head(10))

# 4. Price distribution plot
sns.histplot(df[target], kde=True)
plt.title("House Price Distribution")
plt.show()