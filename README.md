# meeting

---
can have 2 docker containers: server and db.  
docker setting
- choose your port number, db password, ... and others.
- `docker build . -t [repo name]` `docker build . -t meeting`
- `docker pull mysql:8.0.23` (optional)
- `docker run --name [db container name] -e MYSQL_ROOT_PASSWORD=[your password] -d -p 3308:3306 mysql:8.0.23` (8 or higher is ok)
- `docker run --name mysql2 -e MYSQL_ROOT_PASSWORD=1234 -d -p 3308:3306 mysql:8.0.23`
- `docker exec -it [db container name] bash` (get into db container to create database)
- `docker exec -it mysql2 bash`
- `mysql -u root -p` (use your password to log in)
- `create database test;` (must create database)
- `docker run -it --rm -p 3005:3000 --link [db container name] -e MYSQL_ROOT_PASSWORD=[your password] -e DB_HOST=[db container name] -e DB_PORT=3306 [repo name] npm test` (run test code)
- `docker run -it --rm -p 3005:3000 --link mysql2 -e MYSQL_ROOT_PASSWORD=1234 -e DB_HOST=mysql2 -e DB_PORT=3306 meeting npm test`
- `docker run -it --rm -p 3005:3000 --link [db container name] -e MYSQL_ROOT_PASSWORD=[your password] -e DB_HOST=[db container name] -e DB_PORT=3306 [repo name] npm start` (start server)
- `docker run -d --name meeting -p 3005:3000 --link mysql2 -e MYSQL_ROOT_PASSWORD=1234 -e DB_HOST=mysql2 -e DB_PORT=3306 meeting npm start`

- docker stop containers and remove images when done.


