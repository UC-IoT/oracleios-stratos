from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
import pandas as pd, os
from python_api.ORJSONResponse import ORJSONResponse
# from requirements import

app=FastAPI(default_response_class=ORJSONResponse)
@app.get('/')
async def root():
    print(os.getcwd())

    btc_path = os.getcwd() + "/requirements/btc.csv" 
    btc_df = pd.read_csv(btc_path)
    data_dict = btc_df.to_dict(orient='records')
    dict_list=[]
    for index, row in btc_df.iterrows():
        data_dict = jsonable_encoder(row.to_dict())
        dict_list.append(data_dict)
    return {"metadata" : dict_list}
   
