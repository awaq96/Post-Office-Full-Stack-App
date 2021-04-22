## Connection Info

MySQL Workbench -> New connection

Standard (TCP/IP)

Connection name: Whatever you want

hostname: us-cdbr-iron-east-04.cleardb.net

port: 3306 (default)

username: b78a74d52d7d9c

password: c9c220af

default schema/database name: heroku_e44c7f04a36cd2a

## MySQL Dump / DB Backup terminal command
$ mysqldump --user=b78a74d52d7d9c --password=c9c220af --host=us-cdbr-iron-east-04.cleardb.net --protocol=tcp --port=3306 --default-character-set=utf8 "heroku_e44c7f04a36cd2a" > ./heroku_postoffice_db_bak.sql
