CREATE TABLE IF NOT EXISTS methodologies (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE ,
    methodology TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS job_titles (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    job_title TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS employees (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    employee_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
     FOREIGN KEY (job_title)
        REFERENCES job_titles (job_title)
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS product (
	productId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    productOwnerName TEXT NOT NULL,
    Developers JSON NOT NULL,
    scrumMasterName TEXT NOT NULL,
    startDate DATE NOT NULL,
	methodology TEXT NOT NULL,
    FOREIGN KEY (productOwnerName)
        REFERENCES employees (employee_name)
            ON DELETE CASCADE 
            ON UPDATE NO ACTION,
    FOREIGN KEY (scrumMasterName)
        REFERENCES employees (employee_name)
            ON DELETE CASCADE 
            ON UPDATE NO ACTION,
    FOREIGN KEY (methodology)
        REFERENCES methodologies (methodology)
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
);

INSERT INTO methodologies(methodology) VALUES ('agile'),('waterfall');
INSERT INTO job_titles(job_title) VALUES ('director'),('devops'),('developer');
INSERT INTO employees(employee_name, job_title) 
VALUES ('lisa','director'),('alan','devops'),('michael','devops'),('frankie','devops'),('jason','developer'),('hassan','developer'),('jek','developer'),('vincent','developer'),('cornelia','developer'),('anna','developer'),('katie','developer');
INSERT INTO product(productName, productOwnerName, Developers,scrumMasterName, startDate, methodology)
VALUES 
("Nam tempor diam dictum sapien. Aenean massa. Integer vitae","cornelia",'["frankie","anna","cornelia","katie","vincent"]',"lisa","2023-07-19","waterfall"),
  ("lacus. Quisque purus sapien, gravida non, sollicitudin","cornelia",'["jason","hassan","cornelia","katie","vincent"]',"lisa","2024-01-04","agile"),
  ("rutrum lorem ac risus. Morbi metus. Vivamus euismod urna.","hassan",'["jek","anna","cornelia","katie","frankie"]',"lisa","2024-01-05","waterfall"),
  ("Aenean eget magna. Suspendisse tristique","anna",'["jek","frankie","hassan","katie","vincent"]',"lisa","2022-11-06","agile"),
  ("Duis volutpat nunc sit","michael",'["jek","anna","cornelia","katie","vincent"]',"lisa","2022-08-29","waterfall"),
  ("ut eros non enim commodo","frankie",'["jek","anna","cornelia","katie","frankie"]',"lisa","2023-05-26","agile"),
  ("ut aliquam iaculis, lacus pede sagittis augue, eu tempor","michael",'["jason","anna","cornelia","katie","vincent"]',"lisa","2023-10-29","waterfall"),
  ("volutpat nunc sit amet metus.","anna",'["jek","anna","hassan","katie","vincent"]',"lisa","2023-03-09","waterfall"),
  ("amet nulla. Donec non justo. Proin","cornelia",'["jek","anna","cornelia","katie","vincent"]',"lisa","2023-05-27","waterfall"),
  ("non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas","hassan",'["jek","anna","cornelia","katie","frankie"]',"lisa","2023-10-22","agile"),
  ("mollis.","hassan",'["jek","anna","cornelia","hassan","vincent"]',"lisa","2022-05-16","waterfall"),
  ("leo. Morbi neque","cornelia",'["michael","frankie","cornelia","katie","vincent"]',"lisa","2022-06-02","waterfall"),
  ("tempor bibendum. Donec felis","hassan",'["jek","anna","hassan","katie","vincent"]',"lisa","2022-04-16","waterfall"),
  ("et, euismod et, commodo at, libero.","katie",'["jason","anna","cornelia","katie","vincent"]',"lisa","2024-02-11","waterfall"),
  ("orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie","hassan",'["jek","anna","cornelia","katie","hassan"]',"lisa","2023-07-20","waterfall"),
  ("ac turpis egestas. Aliquam","michael",'["michael","jason","cornelia","katie","vincent"]',"lisa","2023-07-20","agile"),
  ("Quisque purus sapien, gravida non, sollicitudin a, malesuada","katie",'["jek","hassan","cornelia","katie","vincent"]',"lisa","2023-10-27","agile"),
  ("mauris eu elit. Nulla facilisi. Sed","jek",'["jek","anna","cornelia","hassan","vincent"]',"lisa","2022-05-16","waterfall"),
  ("aliquam eros turpis non","hassan",'["hassan","anna","michael","katie","jason"]',"lisa","2023-07-27","waterfall"),
  ("tincidunt. Donec vitae","vincent",'["jek","frankie","cornelia","katie","vincent"]',"lisa","2023-10-29","agile"),
  ("senectus et netus et","jason",'["jek","michael","cornelia","katie","hassan"]',"lisa","2023-07-27","waterfall"),
  ("tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam","cornelia",'["jek","frankie","cornelia","katie","jason"]',"lisa","2023-03-03","waterfall"),
  ("fermentum arcu. Vestibulum ante ipsum primis","alan",'["jek","michael","hassan","jason","vincent"]',"lisa","2023-03-03","agile"),
  ("in molestie","alan",'["jek","frankie","cornelia","katie","vincent"]',"lisa","2023-10-27","waterfall"),
  ("Nunc ac sem ut dolor dapibus gravida.","hassan",'["jek","frankie","jason","katie","vincent"]',"lisa","2023-03-03","agile"),
  ("facilisis non, bibendum sed, est. Nunc laoreet","cornelia",'["hassan","michael","cornelia","katie","jason"]',"lisa","2022-05-16","waterfall"),
  ("quis accumsan convallis, ante lectus convallis est, vitae sodales","alan",'["jek","frankie","cornelia","katie","vincent"]',"lisa","2023-07-27","waterfall"),
  ("Vivamus non lorem vitae","jek",'["jek","frankie","cornelia","katie","vincent"]',"lisa","2023-10-29","agile"),
  ("arcu. Morbi sit amet","michael",'["jek","michael","cornelia","katie","hassan"]',"lisa","2022-11-04","waterfall"),
  ("arcu eu odio tristique pharetra. Quisque","jason",'["jek","frankie","cornelia","katie","jason"]',"lisa","2022-05-06","waterfall"),
  ("vehicula aliquet libero. Integer","hassan",'["jek","frankie","cornelia","katie","vincent"]',"lisa","2022-05-29","waterfall"),
  ("malesuada. Integer id magna et ipsum cursus vestibulum. Mauris","frankie",'["hassan","michael","cornelia","katie","vincent"]',"lisa","2022-10-06","agile"),
  ("pulvinar arcu et pede. Nunc sed","jason",'["jek","frankie","cornelia","katie","jason"]',"lisa","2022-05-19","agile"),
  ("Pellentesque tincidunt","katie",'["jek","frankie","hassan","katie","vincent"]',"lisa","2022-05-19","agile"),
  ("auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus.","frankie",'["hassan","frankie","cornelia","katie","vincent"]',"lisa","2022-09-12","waterfall"),
  ("mus. Proin vel nisl. Quisque","vincent",'["jek","frankie","hassan","katie","jason"]',"lisa","2023-01-29","agile"),
  ("Morbi","frankie",'["jek","michael","cornelia","katie","vincent"]',"lisa","2023-05-10","agile"),
  ("Nulla eu","hassan",'["jek","frankie","hassan","katie","jason"]',"lisa","2023-11-24","agile"),
  ("enim nec tempus scelerisque","katie",'["jek","frankie","cornelia","katie","vincent"]',"lisa","2023-05-11","agile"),
  ("augue id ante dictum cursus.","anna",'["jek","michael","cornelia","hassan","jason"]',"lisa","2023-02-29","agile");


