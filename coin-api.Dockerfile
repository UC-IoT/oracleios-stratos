FROM ubuntu:22.04
WORKDIR /app
COPY . /app
RUN apt update && apt upgrade -y && apt install -y python3 python3-pip
RUN pip3 install -r python_api/requirements.txt
CMD ["uvicorn", "python_api.coin_api:app", "--host", "0.0.0.0", "--port", "1123","--reload"]