CREATE DATABASE IF NOT EXISTS ronald_livros;
USE ronald_livros;

CREATE TABLE IF NOT EXISTS AUTOR (
id_autor SMALLINT AUTO_INCREMENT PRIMARY KEY,
nome_autor VARCHAR(100) NOT NULL,
nome_completo VARCHAR(100) NOT NULL 
);

CREATE TABLE IF NOT EXISTS CATEGORIA (
id_categoria SMALLINT AUTO_INCREMENT PRIMARY KEY,
nome_categoria VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS EDITORA (
id_editora SMALLINT AUTO_INCREMENT PRIMARY KEY,
nome_editora VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS COLECAO (
id_colecao SMALLINT AUTO_INCREMENT PRIMARY KEY,
nome_colecao VARCHAR(70) NOT NULL,
volumes SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS LIVROS (
id_livro SMALLINT AUTO_INCREMENT PRIMARY KEY,
id_colecao VARCHAR(50),
nome_livro VARCHAR(100) NOT NULL UNIQUE,
id_autor SMALLINT NOT NULL,
tenho BOOL NOT NULL,
lido BOOL NOT NULL,
nota SMALLINT,
id_categoria SMALLINT NOT NULL,
id_editora SMALLINT NOT NULL,
FOREIGN KEY (id_autor) REFERENCES AUTOR(id_autor),
FOREIGN KEY (id_editora) REFERENCES EDITORA(id_editora),
FOREIGN KEY (id_colecao) REFERENCES COLECAO(id_colecao),
FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);

INSERT INTO LIVROS(id_colecao, nome_livro, id_autor, tenho, lido, nota, id_categoria, id_editora)
VALUES
(1, 'A Sociedade do Anel', 1, 1, 1, 10, 1, 1),
(1, 'As Duas Torres', 1, 1, 1, 10, 1, 1),
(1, 'O Retorno do Rei', 1, 1, 1, 10, 1, 1),
(5,'O Arqueiro', 2, 1, 1, 8, 2, 3),
(5,'O Andarilho', 2, 1, 1, 8, 2, 3),
(5,'O Herege', 2, 1, 1, 8, 2, 3),
(5,'1356', 2, 1, 0, 0, 2, 3),
(4,'O Rei do Inverno', 2, 1, 1, 9, 2, 3),
(4,'O Inimigo de Deus', 2, 1, 1, 9, 2, 3),
(4,'Excalibur', 2, 1, 1, 9, 2, 3),
(7,'O Último Reino', 2, 1, 1, 10, 2, 3),
(7,'O Cavaleiro da Morte', 2, 1, 1, 10, 2, 3),
(7,'Os Senhores do Norte', 2, 1, 1, 10, 2, 3),
(7,'A Canção da Espada', 2, 1, 1, 10, 2, 3),
(7,'Terra em Chamas', 2, 1, 1, 10, 2, 3),
(7,'Morte dos Reis', 2, 1, 1, 9, 2, 3),
(7,'O Guerreiro Pagão', 2, 1, 1, 9, 2, 3),
(7,'O Trono Vazio', 2, 1, 1, 9, 2, 3),
(7,'Guerreiros da Tempestade', 2, 1, 1, 8, 2, 3),
(7,'O Portador do Fogo', 2, 1, 0, 0, 2, 3),
(7,'A Guerra do Lobo', 2, 0, 0, 0, 2, 3),
(7,'A Espada dos Reis', 2, 0, 0, 0, 2, 3),
(7,'O Senhor da Guerra', 2, 0, 0, 0, 2, 3),
(6,'A Fortaleza de Sharpe', 2, 1, 0, 0, 2, 3),
(12,'O Filho da Luz', 3, 1, 1, 8, 2, 5),
(12,'O Templo de Milhões de Anos', 3, 1, 1, 8, 2, 5),
(12,'A Batalha de Kadesh', 3, 1, 1, 8, 2, 5),
(12,'A Dama de Abu-Simbel', 3, 1, 1, 8, 2, 5),
(12,'Sob a Acácia do Ocidente', 3, 1, 1, 8, 2, 5),
(13,'Nefer, o Silencioso', 3, 1, 1, 8, 2, 5),
(13,'A Mulher Sábia', 3, 1, 1, 8, 2, 5),
(13,'Paneb, o Ardoroso', 3, 1, 1, 8, 2, 5),
(13,'O Lugar da Verdade', 3, 1, 1, 8, 2, 5),
(2,'O Lobo das Planicies', 4, 1, 1, 9, 2, 3),
(2,'Os Senhores do Arco ', 4, 1, 1, 9, 2, 3),
(2,'Os Ossos das Colinas', 4, 1, 1, 9, 2, 3),
(2,'Império da Prata', 4, 1, 0, 0, 2, 3),
(2,'Conquistador', 4, 0, 0, 0, 2, 3),
(3,'Os Portões de Roma ', 4, 1, 1, 9, 2, 3),
(3,'A Morte dos Reis', 4, 1, 1, 9, 2, 3),
(3,'Campo de Espadas', 4, 1, 1, 9, 2, 3),
(3,'Os Deuses da Guerra', 4, 1, 1, 9, 2, 3),
(3,'Sangue dos Deuses', 4, 0, 0, 0, 2, 3),
(11,'Os Deuses da Guerra', 11, 1, 1, 7, 1, 2),
(11,'Os Deuses da Guerra', 11, 1, 1, 7, 1, 2),
(11,'Os Deuses da Guerra', 11, 1, 1, 7, 1, 2),
(18,'Aprendiz', 12, 1, 1, 10, 1, 6),
(18,'Mestre', 12, 1, 1, 10, 1, 6),
(18,'Espinho de Prata', 12, 1, 1, 10, 1, 6),
(18,'As Trevas de Sethanon', 12, 1, 1, 10, 1, 6),
(19,'A Filha do Império', 12, 1, 1, 10, 1, 6),
(19,'A Serva do Império', 12, 1, 1, 10, 1, 6),
(19,'A senhora do império', 12, 1, 1, 10, 1, 6),
(10,'Renascença', 9, 1, 1, 8, 1, 3),
(10,'Irmandade', 9, 1, 1, 8, 1, 3),
(10,'A Cruzada Secreta', 9, 1, 1, 8, 1, 3),
(10,'Revelações', 9, 1, 1, 7, 1, 3),
(10,'Renegado', 9, 1, 1, 7, 1, 3),
(10,' Bandeira Negra', 9, 1, 1, 7, 1, 3),
(10,'União', 9, 0, 0, 0, 1, 3),
(10,'Submundo', 9, 1, 1, 7, 1, 3),
(10,'Juramento do Deserto', 9, 0, 0, 0, 1, 3),
(14,'Eragon', 8, 1, 1, 9, 1, 8),
(14,'Eldest', 8, 1, 1, 9, 1, 8),
(14,'Brisingr', 8, 1, 1, 9, 1, 8),
(14,'Herança', 8, 1, 1, 9, 1, 8),
(14,'O garfo, a bruxa e o dragão', 8, 0, 0, 0, 1, 8),
(8,'Jogos Vorazes', 13, 1, 1, 8, 1, 8),
(8,'Em Chamas', 13, 1, 1, 8, 1, 8),
(8,'A Esperança', 13, 1, 1, 8, 1, 8),
(8,'A Cantiga dos pássaros e das serpentes', 13, 0, 0, 0, 1, 8),
(25,'A Maldição do Tigre', 20, 1, 1, 7, 1, 6),
(25,'O Resgate do Tigre', 20, 1, 1, 7, 1, 6),
(25,'A Viagem do Tigre', 20, 1, 1, 7, 1, 6),
(25,'O Destino do Tigre', 20, 1, 1, 7, 1, 6),
(25,'A Promessa do Tigre', 20, 0, 0, 0, 1, 6),
(25,'O Sonho do Tigre', 20, 0, 0, 0, 1, 6),
(24,'O Nome do Vento', 7, 1, 1, 10, 1, 6),
(24,'O Temor do Sábio', 7, 1, 1, 10, 1, 6),
(24,'Doors of Stone', 7, 0, 0, 0, 1, 6),
(17,'A Senhora da Magia', 14, 1, 1, 8, 1, 16),
(17,'A Grande Rainha', 14, 1, 1, 8, 1, 16),
(17,'O Gamo-Rei', 14, 1, 1, 8, 1, 16),
(17,'O Prisioneiro da Árvore', 14, 1, 1, 8, 1, 16),
(9,'Pedra Filosofal', 6, 1, 1, 8, 1, 8),
(9,'Câmara Secreta', 6, 1, 1, 8, 1, 8),
(9,'Prisioneiro de Azkaban', 6, 0, 0, 0, 1, 8),
(9,'Cálice de Fogo', 6, 0, 0, 0, 1, 8),
(9,'Ordem da Fênix', 6, 0, 0, 0, 1, 8),
(9,'Enigma do Príncipe', 6, 0, 0, 0, 1, 8),
(9,'Relíquias da Morte', 6, 0, 0, 0, 1, 8),
(9,'Criança Amaldiçoada', 6, 0, 0, 0, 1, 8),
(26,'O Sonho de Olympias', 15, 1, 1, 8, 2, 8),
(26,'As areias de Ammon', 15, 1, 1, 8, 2, 8),
(26,'Os Confins do Mundo', 15, 1, 1, 8, 2, 8),
(15,'O Último Desejo', 10, 1, 1, 10, 1, 1),
(15,'A Espada do Destino', 10, 1, 1, 10, 1, 1),
(15,'O Sangue dos Elfos', 10, 1, 1, 10, 1, 1),
(15,'Tempo do Desprezo', 10, 1, 1, 10, 1, 1),
(15,'Batismo de Fogo', 10, 1, 1, 10, 1, 1),
(15,'A Torre da Andorinha', 10, 1, 1, 10, 1, 1),
(15,'A Senhora do Lago', 10, 1, 1, 10, 1, 1),
(15,'Tempo de Tempestade', 10, 1, 1, 10, 1, 1),

();


INSERT INTO AUTOR (nome_autor, nome_completo)
VALUES
('J. R. R. Tolkien', 'John Ronald Reuel Tolkien'),
('Bernard Cornwell', 'Bernard Cornwell'),
('Christian Jacq', 'Christian Jacq'),
('Conn Iggulden', 'Conn Iggulden'),
('George R. R. Martin', 'George Raymond Richard Martin'),
('J. K. Rowling', 'Joanne Rowling'),
('Patrick Rothfuss', 'Patrick James Rothfuss'),
('Christopher Paolini', 'Christopher Paolini'),
('Oliver Bowden', 'Anton Gill'),
('Andrzej Sapkowski', 'Andrzej Sapkowski'),
('S. L. Farrell', 'Stephen Leigh'),
('Raymond E. Feist', 'Raymond Elias Feist'),
('Suzanne Collins', 'Suzanne Marie Collins'),
('Marion Zimmer Bradley', 'Marion Eleanor Zimmer Bradley'),
('Valerio Massimo Manfredi', 'Valerio Massimo Manfredi'),
('Margaret Weis', 'Margaret Edith Weis'),
('Terry Brooks', 'Terence Dean Brooks'),
('Frank Herbert', 'Frank Patrick Herbert'),
('Raphael Draccon', 'Rafael Albuquerque Pereira'),
('Colleen Houck', 'Colleen Houck'),
('T. H. White', 'Terence Hanbury White'),
('Orlando Paes Filho', 'Orlando Paes Filho'),
('Anthony Ryan', 'Anthony Ryan'),
('Scott Lynch', 'Scott Lynch'),
('David Malouf', 'David George Joseph Malouf '),
('David Gibbins', 'David Gibbins'),
('Eduardo Spohr', 'Eduardo Spohr'),
('George Lucas', 'George Walton Lucas Jr.'),
('Robert E. Vardeman', 'Robert Edward Vardeman'),
('Terry Pratchett', 'Terence David John Pratchett'),
('Nate Kenyon', 'Nate Kenyon'),
('Ernest Cline', 'Ernest Christy Cline'),
('Ken Follett', 'Kenneth Martin Follett'),
('David Colbert', 'David Colbert');


INSERT INTO EDITORA (nome_editora)
VALUES
('Martins Fontes'),
('Leya'),
('Record'),
('Galera'),
('Bertrand Brasil'),
('Arqueiro'),
('Saída de Emergência'),
('Rocco'),
('Publicações Europa-América'),
('Conrad'),
('Planeta'),
('Verus'),
('Wizards'),
('Aleph'),
('DarkSide'),
('Imago');


INSERT INTO CATEGORIA (nome_categoria)
VALUES
('Literatura fantástica'),
('Ficção histórica'),
('Ficção científica');

INSERT INTO COLECAO (nome_colecao, volumes)
VALUES
('O Senhor dos Anéis', 3),
('O Conquistador', 5),
('O Imperador', 5),
('As Crônicas de Artur', 3),
('A Busca do Graal', 4),
('As Aventuras de Sharpe', 21),
('As Crônicas Saxônicas', 11),
('Jogos Vorazes', 3),
('Harry Potter', 8),
('Assassin`s Creed', 11),
('O Trono do Sol - O Ciclo Nessântico', 3),
('Ramsés', 5),
('Pedra da Luz', 4),
('Ciclo da Herança', 5),
('The Witcher', 7),
('Duna', 6),
('As Brumas de Avalon', 4),
('A Saga do Império', 3),
('A Saga do Mago', 4),
('Saga do Assassino', 3),
('Crônicas de Dragonlance', 3),
('Dragões de Éter', 3),
('Crônicas de Gelo e Fogo', 5),
('A Crônica do Matador do Rei', 3),
('A Saga do Tigre', 6),
('Alexandros', 3);



