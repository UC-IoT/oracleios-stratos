FROM ubuntu:22.04
WORKDIR /app
COPY . /app
RUN apt update && apt upgrade -y && apt install -y python3 python3-pip
RUN pip3 install -r ml_api/requirements.txt
CMD ["uvicorn", "ml_api.coin_api:app", "--host", "0.0.0.0", "--port", "5813","--reload"]