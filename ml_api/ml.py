from data_preprocess import *
from sklearn.linear_model import LinearRegression
from fastapi import FastAPI, Body
from typing import List, Dict, Any

app = FastAPI()

@app.get('/linear_regression')
async def root(metadata: Dict[ str, List[Dict[str, Any]]] = Body(...)):
    items = metadata.get('metadata', [])
    df = pd.DataFrame(items)
    X_train, X_test, y_train, y_test = data_preprocess(df)
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    score = lr.score(X_test, y_test)
    print("Accuracy:", score)
    return score
