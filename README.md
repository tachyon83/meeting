# meeting

---
docker setting
- choose your port number, db password, ...and others.
- `docker build . -t [repo name]`
- `docker pull mysql:8.0.23` (optional)
- `docker run --name [db container name] -e MYSQL_ROOT_PASSWORD=[your password] -d -p 3308:3306 mysql:8.0.23` (8 or higher is ok)
- `docker exec -it [db container name] bash` (get into db container to create database)
- `mysql -u root -p` (use your password to log in)
- `create database test;` (must create database)
- `docker run -it --rm -p 3005:3000 --link [db container name] -e MYSQL_ROOT_PASSWORD=[your password] -e DB_HOST=[db container name] -e DB_PORT=3306 [repo name] npm test` (run test code)
- `docker run -it --rm -p 3005:3000 --link [db container name] -e MYSQL_ROOT_PASSWORD=[your password] -e DB_HOST=[db container name] -e DB_PORT=3306 [repo name] npm start` (start server)

- docker stop your unused containers and remove unused images (rmi)


