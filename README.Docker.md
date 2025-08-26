### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:6213.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)


### run
docker run -d -e PORT=6213 -e DB_HOST=dpg-d2lhruh5pdvs73ao8b00-a.oregon-postgres.render.com -e DB_PORT=5432 -e DB_NAME=inv_man -e DB_USER=inv_man_user -e DB_PASSWORD=IdkpcObAzBqe18TNJXMOAQ6QoUOVkNHK -e JWT_SECRET=priyanshu -p6213:6213 --name inv_app my-node-app:1.0