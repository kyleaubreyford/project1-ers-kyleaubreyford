/*******************************************************************************
   Create Tables
********************************************************************************/

CREATE TABLE Reimbursement
(
    Id          SERIAL 		PRIMARY KEY,
    Amount  	NUMERIC		    NOT NULL,
    Submitted   TIMESTAMP 		NOT NULL,
    Resolved    TIMESTAMP,
    Description VARCHAR(250),
    Receipt 	VARCHAR(250),
    Author 		INTEGER 		NOT NULL,
    Resolver 	INTEGER,
    StatusId 	INTEGER 		NOT NULL,
    TypeId 		INTEGER 		NOT NULL
);


CREATE TABLE Users
(
    UsersId    SERIAL       PRIMARY KEY,
    Username   VARCHAR (50)  NOT NULL UNIQUE,
    Password   VARCHAR (50)  NOT NULL,
	FirstName  VARCHAR (100) NOT NULL,
	LastName   VARCHAR (100) NOT NULL,
	Email      VARCHAR (150) NOT NULL UNIQUE,
	UserRoleId NUMERIC       NOT NULL
);

CREATE TABLE Reimbursement_Status
(
    StatusId NUMERIC     PRIMARY KEY,
	Status   VARCHAR(10) NOT NULL
);   

CREATE TABLE Reimbursement_Type
(
    TypeId NUMERIC     PRIMARY KEY,
	Type   VARCHAR(10) NOT NULL
);

CREATE TABLE User_Roles
(
    UserRoleId NUMERIC     PRIMARY KEY,
	UserRole   VARCHAR(10) NOT NULL
);

ALTER TABLE Reimbursement ADD CONSTRAINT Status_FK
    FOREIGN KEY (StatusId) REFERENCES Reimbursement_Status (StatusId) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE Reimbursement ADD CONSTRAINT Type_FK
    FOREIGN KEY (TypeId) REFERENCES Reimbursement_Type (TypeId) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE Reimbursement ADD CONSTRAINT Resolver_FK
    FOREIGN KEY (Resolver) REFERENCES Users (UsersId) ON DELETE NO ACTION ON UPDATE NO ACTION;
	
ALTER TABLE Reimbursement ADD CONSTRAINT Author_FK
    FOREIGN KEY (Author) REFERENCES Users (UsersId) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE Users ADD CONSTRAINT UserRoleId
    FOREIGN KEY (UserRoleId) REFERENCES User_Roles (UserRoleId) ON DELETE NO ACTION ON UPDATE NO ACTION;
	
	
	
DROP TABLE Reimbursement;
DROP TABLE users;
DROP TABLE reimbursement_status;
DROP TABLE reimbursement_type;
DROP TABLE user_roles;