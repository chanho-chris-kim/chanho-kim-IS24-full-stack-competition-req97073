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
    startDate DATE DEFAULT (datetime('now', 'localtime')),
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
INSERT INTO product(productName, productOwnerName, Developers,scrumMasterName, methodology)
VALUES 
("Nam tempor diam dictum sapien. Aenean massa. Integer vitae","Cornelia",'["Frankie","Anna","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("lacus. Quisque purus sapien, gravida non, sollicitudin","Cornelia",'["Jason","Hassan","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("rutrum lorem ac risus. Morbi metus. Vivamus euismod urna.","Hassan",'["Hanna","Anna","Cornelia","Katie","Frankie"]',"Lisa","Waterfall"),
  ("Aenean eget magna. Suspendisse tristique","Anna",'["Hanna","Frankie","Hassan","Katie","Vincent"]',"Lisa","Agile"),
  ("Duis volutpat nunc sit","Michael",'["Hanna","Anna","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("ut eros non enim commodo","Frankie",'["Hanna","Anna","Cornelia","Katie","Frankie"]',"Lisa","Agile"),
  ("ut aliquam iaculis, lacus pede sagittis augue, eu tempor","Michael",'["Jason","Anna","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("volutpat nunc sit amet metus.","Anna",'["Hanna","Anna","Hassan","Katie","Vincent"]',"Lisa","Waterfall"),
  ("amet nulla. Donec non justo. Proin","Cornelia",'["Hanna","Anna","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas","Hassan",'["Hanna","Anna","Cornelia","Katie","Frankie"]',"Lisa","Agile"),
  ("mollis.","Hassan",'["Hanna","Anna","Cornelia","Hassan","Vincent"]',"Lisa","Waterfall"),
  ("leo. Morbi neque","Cornelia",'["Michael","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("tempor bibendum. Donec felis","Hassan",'["Hanna","Anna","Hassan","Katie","Vincent"]',"Lisa","Waterfall"),
  ("et, euismod et, commodo at, libero.","Katie",'["Jason","Anna","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie","Hassan",'["Hanna","Anna","Cornelia","Katie","Hassan"]',"Lisa","Waterfall"),
  ("ac turpis egestas. Aliquam","Michael",'["Michael","Jason","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("Quisque purus sapien, gravida non, sollicitudin a, malesuada","Katie",'["Hanna","Hassan","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("mauris eu elit. Nulla facilisi. Sed","Hanna",'["Hanna","Anna","Cornelia","Hassan","Vincent"]',"Lisa","Waterfall"),
  ("aliquam eros turpis non","Hassan",'["Hassan","Anna","Michael","Katie","Jason"]',"Lisa","Waterfall"),
  ("tincidunt. Donec vitae","Vincent",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("senectus et netus et","Jason",'["Hanna","Michael","Cornelia","Katie","Hassan"]',"Lisa","Waterfall"),
  ("tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam","Cornelia",'["Hanna","Frankie","Cornelia","Katie","Jason"]',"Lisa","Waterfall"),
  ("fermentum arcu. Vestibulum ante ipsum primis","Alan",'["Hanna","Michael","Hassan","Jason","Vincent"]',"Lisa","Agile"),
  ("in molestie","Alan",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("Nunc ac sem ut dolor dapibus gravida.","Hassan",'["Hanna","Frankie","Jason","Katie","Vincent"]',"Lisa","Agile"),
  ("facilisis non, bibendum sed, est. Nunc laoreet","Cornelia",'["Hassan","Michael","Cornelia","Katie","Jason"]',"Lisa","Waterfall"),
  ("quis accumsan convallis, ante lectus convallis est, vitae sodales","Alan",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("Vivamus non lorem vitae","Hanna",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("arcu. Morbi sit amet","Michael",'["Hanna","Michael","Cornelia","Katie","Hassan"]',"Lisa","Waterfall"),
  ("arcu eu odio tristique pharetra. Quisque","Jason",'["Hanna","Frankie","Cornelia","Katie","Jason"]',"Lisa","Waterfall"),
  ("vehicula aliquet libero. Integer","Hassan",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("malesuada. Integer id magna et ipsum cursus vestibulum. Mauris","Frankie",'["Hassan","Michael","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("pulvinar arcu et pede. Nunc sed","Jason",'["Hanna","Frankie","Cornelia","Katie","Jason"]',"Lisa","Agile"),
  ("Pellentesque tincidunt","Katie",'["Hanna","Frankie","Hassan","Katie","Vincent"]',"Lisa","Agile"),
  ("auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus.","Frankie",'["Hassan","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Waterfall"),
  ("mus. Proin vel nisl. Quisque","Vincent",'["Hanna","Frankie","Hassan","Katie","Jason"]',"Lisa","Agile"),
  ("Morbi","Frankie",'["Hanna","Michael","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("Nulla eu","Hassan",'["Hanna","Frankie","Hassan","Katie","Jason"]',"Lisa","Agile"),
  ("enim nec tempus scelerisque,","Katie",'["Hanna","Frankie","Cornelia","Katie","Vincent"]',"Lisa","Agile"),
  ("augue id ante dictum cursus.","Anna",'["Hanna","Michael","Cornelia","Hassan","Jason"]',"Lisa","Agile");


