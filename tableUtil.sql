INSERT INTO user_roles(userroleid,userrole) VAlUES (1,'admin');
INSERT INTO user_roles(userroleid,userrole) VAlUES (2,'employee');

INSERT INTO reimbursement_status(statusid,status) VAlUES (1,'PENDING');
INSERT INTO reimbursement_status(statusid,status) VAlUES (2,'APPROVED');
INSERT INTO reimbursement_status(statusid,status) VAlUES (3,'REJECTED');

INSERT INTO reimbursement_type(typeid,type) VAlUES (1,'LODGING');
INSERT INTO reimbursement_type(typeid,type) VAlUES (2,'TRAVEL');
INSERT INTO reimbursement_type(typeid,type) VAlUES (3,'FOOD');
INSERT INTO reimbursement_type(typeid,type) VAlUES (4,'OTHER');


INSERT INTO users(usersid,username,password,firstname,lastname,email,userroleid) VAlUES (1,'fishai','password','Kyle','Ford','fish@gmail.com',1);
INSERT INTO reimbursement(id,amount,submitted,description,receipt,author,statusid,typeid) VAlUES (1,50,'2017-07-23 00:00:00','Trial','Reciept Picture',2,1,1);
INSERT INTO reimbursement(id,amount,submitted,description,receipt,author,resolver,statusid,typeid) VAlUES (1,50,'2017-07-23 00:00:00','Trial','Reciept Picture',2,1,1,1);

select * from reimbursement INNER JOIN reimbursement_status USING (statusid) INNER JOIN reimbursement_type USING (typeid) INNER JOIN users ON (reimbursement.author = users.usersid);