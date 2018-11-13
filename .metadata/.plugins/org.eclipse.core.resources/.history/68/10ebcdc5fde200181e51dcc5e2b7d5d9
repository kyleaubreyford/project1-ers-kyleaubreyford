package com.revature.services;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.revature.dao.UserDao;
import com.revature.dto.Credential;
import com.revature.model.AppUser;

public class UserServiceImpl implements UserService {
	private UserDao ud = UserDao.currentImplementation;
	@Override
	public AppUser findById(int id) {
		return ud.findById(id);
	}

	@Override
	public List<AppUser> findAll() {
		return ud.findAll();
	}

	@Override
	public boolean login(Credential cred, HttpSession session) {
		AppUser u = ud.findByUsernameAndPassword(cred.getUsername(), cred.getPassword());
		if (u != null) {
			session.setAttribute("role", u.getRole().getName());
			return true;
		} 
		return false;
	}

	
}
