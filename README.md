# AfterShip full-stack exercise API

API backend for AfterShip full-stack exercise for a currency converter.

## Completeness

### Done

- [x] Index route redirecting to the frontend client
- [x] User sign up/sign in
- [x] Get, add and remove user's favorite currencies
- [x] User authentication using JSON web token
- [x] ORM using sequelize
- [x] Logging using morgan
- [x] API docs generated using apidoc
- [x] Docker container
- [x] Test cases

### Todo

- [ ] Documentation for `/usercurrency` path
- [ ] Clean up the promises
- [ ] Middleware for returning errors on invalid parameters
- [ ] Workaround/fix bcrypt segmentation fault
- [ ] Docker swarm/expressjs clustering

## Project structure

~~~plain
project_root
	bin - helpful scripts for development
	secrets - stores secrets such as jwt-secret, or mysql-password
	server
		server/models - Sequelize ORM models
		server/controllers - ExpressJS controllers
		server/middlewares - ExpressJS middlewares
		server/public - Static assets, apidoc generated will the stored here
		server/logs - Logs in production environment
		server/seeders - Seeders to populate the database
		server/test - Test cases
		server/migrations - Migrations to initialize the database
		server/config - Configuration files
~~~

## Getting Started

### Prerequisites

- docker 17.09.0-ce+
- docker-compose 1.16.1+

### Installing

#### Step 1: setting environment varialbes

In folder `/secrets`, the following files are required:

- **$PROJECT_ROOT/secrets/mysql-database**

  This file should contain one line, stating MySQL database name only.

- **$PROJECT_ROOT/secrets/mysql-root-password**

  This file should contain one line, stating MySQL database root user password only.

- **$PROJECT_ROOT/secrets/mysql-password**

  This file should contain one line, stating MySQL database password only.

- **$PROJECT_ROOT/secrets/mysql-user**

  This file should contain one line, stating MySQL database username only.

- **$PROJECT_ROOT/secrets/jwt-secret**

  This file contains a secret key to encrypt JSON web tokens used for
  user authentication.

#### Step 2: building and running images

To build the docker image:

~~~bash
$ docker-compose build
~~~

As of current version, you muse build `bcrypt` package from source for
it to work. Otherwise, it will raise segmentation fault error.

~~~bash
(host)$ docker-compose -f docker-compose.yml -f local.yml run server /bin/ash
(server)$ npm install bcrypt --build-from-source
~~~

#### Step 3: database migration

To run database migrations:

~~~bash
(host)$ docker-compose -f docker-compose.yml -f local.yml run server /bin/ash
(server)$ ./node_modules/.bin/sequelize db:migrate
(server)$ ./node_modules/.bin/sequelize db:seed:all
# Ctrl-D
(host)$
~~~

#### Step 4:

Now to run the server on port 8080:

~~~bash
(host)$ docker-compose -f docker-compose.yml -f local.yml up
~~~

## API Documentation

### Generating documentation

This exercies is documented using apidoc, to view the API
documentation, run:

~~~bash
(host)$ docker-compose -f docker-compose.yml -f local.yml run server docs
(host)$ docker-compose -f docker-compose.yml -f local.yml up
~~~

Then navigate to [localhost:8080/apidoc/](http://localhost:8080/apidoc/).

## Deployment

This backend does not ship with a web server, you may choose your own
servers such as [nginx](https://hub.docker.com/_/nginx/) or [httpd](https://hub.docker.com/_/httpd/).

For example, using
[jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy):

~~~bash
(host)$ ls ./secrets # make sure necessary env files are inside `secrets`
(host)$ cat production.yml # change `VIRTUAL_HOST` and `LETENCRYPT_HOST` if you want to use a different sub-domain
# Starting nginx-proxy
(host)$ docker run -d -p 80:80 -p 443:443 \
        --name nginx-proxy \
        -v /etc/nginx/certs:/etc/nginx/certs:ro \
        -v /etc/nginx/vhost.d \
        -v /usr/share/nginx/html \
        -v /var/run/docker.sock:/tmp/docker.sock:ro \
        --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
        jwilder/nginx-proxy
# Starting letencrypt-nginx-proxy-companion to generate SSL certificate
(host)$ docker run -d \
        -v /etc/nginx/certs:/etc/nginx/certs:rw \
        -v /var/run/docker.sock:/var/run/docker.sock:ro \
        --volumes-from nginx-proxy \
        jrcs/letsencrypt-nginx-proxy-companion
# Setting up the app
(host)$ docker-compose build # or upload your locally-built image using sftp/scp
(host)$ docker-compose -f docker-compose.yml -f production.yml run server /bin/ash
(server)$ npm install bcrypt --build-from-source
(server)$ ./node_modules/.bin/sequelize db:migrate
(server)$ ./node_modules/.bin/sequelize db:seed:all
# Ctrl-D
(host)$ docker-compose -f docker-compose.yml -f production.yml up -d
~~~

## Testing

To run integration tests:

~~~bash
(host)$ docker-compose -f docker-compose.yml -f test.yml run server /bin/ash
(server)$ npm install bcrypt --build-from-source
(server)$ ./node_modules/.bin/sequelize db:migrate
(server)$ ./node_modules/.bin/sequelize db:seed:all
# Ctrl-D
(host)$ docker-compose -f docker-compose.yml -f test.yml run server test
~~~

To lint the codes:

Linter settings can be found in `$PROJECT_ROOT/server/.eslintrc.js`

~~~bash
(host)$ docker-compose -f docker-compose.yml -f local.yml run server lint
~~~

## Built With

  - ExpressJS: RESTful API framework
  - Sequelize: ORM library
  - eslint - JS linter
  - apidoc- API documentation
  - Mocha & Chai - Testing

## License

This project is an open-sourced software licensed under the [MIT
license](http://opensource.org/licenses/MIT).
