from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
import pandas as pd
from ORJSONResponse import ORJSONResponse

app=FastAPI(default_response_class=ORJSONResponse)
@app.get("/")
async def root():
    crash_path="../requirements/Crash.csv"
    crash_df=pd.read_csv(crash_path)
    data_dict = crash_df.to_dict(orient='records')
    dict_list=[]
    for index, row in crash_df.iterrows():
        data_dict = jsonable_encoder(row.to_dict())
        dict_list.append(data_dict)
    return {"metadata" : dict_list}
   