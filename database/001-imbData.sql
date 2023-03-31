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

INSERT INTO methodologies(methodology) VALUES ('Agile'),('Waterfall');
INSERT INTO job_titles(job_title) VALUES ('Director'),('DevOps'),('Developer');
INSERT INTO employees(employee_name, job_title) 
VALUES ('Lisa','Director'),('Alan','DevOps'),('Michael','DevOps'),('Frankie','DevOps'),('Jason','Developer'),('Hassan','Developer'),('Hanna','Developer'),('Vincent','Developer'),('Cornelia','Developer'),('Anna','Developer'),('Katie','Developer');
INSERT INTO product(productName, productOwnerName, Developers,scrumMasterName, startDate, methodology)
VALUES 
("Nam tempor diam dictum sapien. Aenean massa. Integer vitae","Cornelia",'["Frankie","Anna","Cornelia","Katie","Vincent"]',"Lisa","2023-07-19","Waterfall"),
  ("lacus. Quisque purus sapien, gravida non, sollicitudin","Cornelia",'["Jason","Hassan","Cornelia","Katie","Vincent"]',"Lisa","2024-01-04","Agile"),
  ("rutrum lorem ac risus. Morbi metus. Vivamus euismod urna.","Hassan",'["Hanna","Anna","Cornelia","Katie","Frankie"]',"Lisa","2024-01-05","Waterfall"),
  ("Aenean eget magna. Suspendisse tristique","Anna",'["Hanna","Frankie","Hassan","Katie","Vincent"]',"Lisa","2022-11-06","Agile"),
  ("Duis volutpat nunc sit","Michael",'["Hanna","Anna","Cornelia","Katie","Vincent"]',"Lisa","2022-08-29","Waterfall"),
  ("ut eros non enim commodo","Frankie",'["Hanna","Anna","Cornelia","Katie","Frankie"]',"Lisa","2023-05-26","Agile"),
  ("ut aliquam iaculis, lacus pede sagittis augue, eu tempor","Michael",'["Jason","Anna","Cornelia","Katie","Vincent"]',"Lisa","2023-10-29","Waterfall"),
  ("volutpat nunc sit amet metus.","Anna",'["Hanna","Anna","Hassan","Katie","Vincent"]',"Lisa","2023-03-09","Waterfall"),
  ("amet nulla. Donec non justo. Proin","Cornelia",'["Hanna","Anna","Cornelia","Katie","Vincent"]',"Lisa","2023-05-27","Waterfall"),
  ("non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas","Hassan",'["Hanna","Anna","Cornelia","Katie","Frankie"]',"Lisa","2023-10-22","Agile"),
  ("mollis.","Hassan",'["Hanna","Anna","Cornelia","Hassan","Vincent"]',"Lisa","2022-05-16","Waterfall"),
  ("leo. Morbi neque","Cornelia",'["Michael","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2022-06-02","Waterfall"),
  ("tempor bibendum. Donec felis","Hassan",'["Hanna","Anna","Hassan","Katie","Vincent"]',"Lisa","2022-04-16","Waterfall"),
  ("et, euismod et, commodo at, libero.","Katie",'["Jason","Anna","Cornelia","Katie","Vincent"]',"Lisa","2024-02-11","Waterfall"),
  ("orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie","Hassan",'["Hanna","Anna","Cornelia","Katie","Hassan"]',"Lisa","2023-07-20","Waterfall"),
  ("ac turpis egestas. Aliquam","Michael",'["Michael","Jason","Cornelia","Katie","Vincent"]',"Lisa","2023-07-20","Agile"),
  ("Quisque purus sapien, gravida non, sollicitudin a, malesuada","Katie",'["Hanna","Hassan","Cornelia","Katie","Vincent"]',"Lisa","2023-10-27","Agile"),
  ("mauris eu elit. Nulla facilisi. Sed","Hanna",'["Hanna","Anna","Cornelia","Hassan","Vincent"]',"Lisa","2022-05-16","Waterfall"),
  ("aliquam eros turpis non","Hassan",'["Hassan","Anna","Michael","Katie","Jason"]',"Lisa","2023-07-27","Waterfall"),
  ("tincidunt. Donec vitae","Vincent",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2023-10-29","Agile"),
  ("senectus et netus et","Jason",'["Hanna","Michael","Cornelia","Katie","Hassan"]',"Lisa","2023-07-27","Waterfall"),
  ("tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam","Cornelia",'["Hanna","Frankie","Cornelia","Katie","Jason"]',"Lisa","2023-03-03","Waterfall"),
  ("fermentum arcu. Vestibulum ante ipsum primis","Alan",'["Hanna","Michael","Hassan","Jason","Vincent"]',"Lisa","2023-03-03","Agile"),
  ("in molestie","Alan",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2023-10-27","Waterfall"),
  ("Nunc ac sem ut dolor dapibus gravida.","Hassan",'["Hanna","Frankie","Jason","Katie","Vincent"]',"Lisa","2023-03-03","Agile"),
  ("facilisis non, bibendum sed, est. Nunc laoreet","Cornelia",'["Hassan","Michael","Cornelia","Katie","Jason"]',"Lisa","2022-05-16","Waterfall"),
  ("quis accumsan convallis, ante lectus convallis est, vitae sodales","Alan",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2023-07-27","Waterfall"),
  ("Vivamus non lorem vitae","Hanna",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2023-10-29","Agile"),
  ("arcu. Morbi sit amet","Michael",'["Hanna","Michael","Cornelia","Katie","Hassan"]',"Lisa","2022-11-04","Waterfall"),
  ("arcu eu odio tristique pharetra. Quisque","Jason",'["Hanna","Frankie","Cornelia","Katie","Jason"]',"Lisa","2022-05-06","Waterfall"),
  ("vehicula aliquet libero. Integer","Hassan",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2022-05-29","Waterfall"),
  ("malesuada. Integer id magna et ipsum cursus vestibulum. Mauris","Frankie",'["Hassan","Michael","Cornelia","Katie","Vincent"]',"Lisa","2022-10-06","Agile"),
  ("pulvinar arcu et pede. Nunc sed","Jason",'["Hanna","Frankie","Cornelia","Katie","Jason"]',"Lisa","2022-05-19","Agile"),
  ("Pellentesque tincidunt","Katie",'["Hanna","Frankie","Hassan","Katie","Vincent"]',"Lisa","2022-05-19","Agile"),
  ("auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus.","Frankie",'["Hassan","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2022-09-12","Waterfall"),
  ("mus. Proin vel nisl. Quisque","Vincent",'["Hanna","Frankie","Hassan","Katie","Jason"]',"Lisa","2023-01-29","Agile"),
  ("Morbi","Frankie",'["Hanna","Michael","Cornelia","Katie","Vincent"]',"Lisa","2023-05-10","Agile"),
  ("Nulla eu","Hassan",'["Hanna","Frankie","Hassan","Katie","Jason"]',"Lisa","2023-11-24","Agile"),
  ("enim nec tempus scelerisque","Katie",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","2023-05-11","Agile"),
  ("augue id ante dictum cursus.","Anna",'["Hanna","Michael","Cornelia","Hassan","Jason"]',"Lisa","2023-02-29","Agile");


