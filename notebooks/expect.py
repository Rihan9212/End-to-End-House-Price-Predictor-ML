import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Data load (idhu dhaan mukkiyam)
df = pd.read_csv("data/train.csv")   # notebook root le irundha "data/train.csv"

df["SalePrice_log"] = np.log1p(df["SalePrice"])

print("Before skew:", df["SalePrice"].skew())
print("After skew: ", df["SalePrice_log"].skew())

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
sns.histplot(df["SalePrice"], kde=True, ax=axes[0])
axes[0].set_title("Original")
sns.histplot(df["SalePrice_log"], kde=True, ax=axes[1])
axes[1].set_title("Log Transformed")
plt.show()

