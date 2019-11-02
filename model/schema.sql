
DROP DATABASE IF EXISTS tetris;
CREATE DATABASE tetris;

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `googleid` varchar(255) NOT NULL,
 PRIMARY KEY (`id`)
);