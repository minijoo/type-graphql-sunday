# type-graphql-sunday

# Installing

1. Clone and install dependecies
```
git clone https://github.com/minijoo/type-graphql-sunday.git
cd type-graphql-sunday
yarn
```
2. Make sure you have PostgreSQL running on your computer with a database called `typegraphql-sunday` and a user who has access to that database with the username `_postgres` and password `postgres`
* Mac: https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
* Windows: https://www.guru99.com/download-install-postgresql.html
* Docker: https://www.youtube.com/watch?v=G3gnMSyX-XM
* Linux: you know what you're doing
* How to create a user: https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e

3. Make sure you have Redis running on your computer
* Mac: https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298
* Windows: https://redislabs.com/blog/redis-on-windows-10/
* Linux: you know what you're doing

4. Start the server
```
yarn start
```
To verified it worked, you can go to http://localhost:4000/graphql
