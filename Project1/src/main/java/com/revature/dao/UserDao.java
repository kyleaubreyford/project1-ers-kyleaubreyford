package com.revature.dao;

import com.revature.models.User;

public interface UserDao {
	UserDao currentImplementation = new UserDaoJdbc();

	User findById(int id);

	boolean saveUser(User user);

	User findByUsernameAndPassword(String username, String password);


	User findByUsername(String username);
}
