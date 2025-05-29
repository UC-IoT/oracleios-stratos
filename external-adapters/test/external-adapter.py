# Import FastAPI library
from fastapi import FastAPI, Request
import requests

app = FastAPI()

@app.post("/endpoint")
async def handle_request(request: dict):
    try:
        job_data = request['jobData']
        # Implement the logic to extract parameters from job_data and construct your API request
        # For example, assuming the job_data contains the URL of the external API:
        api_url = job_data['api_url']

        # Make the API call to the external API
        response = requests.get(api_url)
        response.raise_for_status()  # Check for any HTTP error in the response

        # Process the API response and construct the final result to be returned to Chainlink node
        data = response.json()

        # In this example, we assume the response should contain the 'result' key
        result = data['result']
        return {"result": result}

    except (KeyError, requests.RequestException, ValueError) as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)