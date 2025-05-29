FROM python:latest

WORKDIR /app

ADD . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5858

CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--port=5858", "--no-browser", "--allow-root"]