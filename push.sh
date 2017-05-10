docker build -t tagger-frontend:latest .
docker tag tagger-frontend:latest webeng.azurecr.io/tagger-frontend:latest
docker push webeng.azurecr.io/tagger-frontend:latest
