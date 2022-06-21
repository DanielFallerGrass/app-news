# app-news
CREATE TABLE `new`.`news` ( 
`id` INT NOT NULL AUTO_INCREMENT , 
`tittle` VARCHAR(100) NOT NULL , 
`description` VARCHAR(4000) NOT NULL, 
`body` VARCHAR(10000) NOT NULL , 
`published` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


Link onde se encontra o php responsável pela conexão com o DB: [new-resp-api](https://github.com/DanielFallerGrass/new-rest-api.git)
