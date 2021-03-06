package com.revature.controllers;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dto.Credential;
import com.revature.dto.UserBasics;
import com.revature.models.User;
import com.revature.services.UserService;
import com.revature.utils.PasswordMD5Hash;
import com.revature.utils.ResponseMapper;

public class UserController {
	private Logger log = Logger.getRootLogger();
	private UserService us = UserService.currentImplementation;
	private ObjectMapper om = new ObjectMapper();

	void process(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String method = req.getMethod();
		switch (method) {
		case "GET":
			processGet(req, resp);
			break;
		case "POST":
			processPost(req, resp);
			break;
		case "OPTIONS":
			return;
		default:
			resp.setStatus(404);
			break;
		}
	}

	private void processGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

	}

	private void processPost(HttpServletRequest req, HttpServletResponse resp) throws JsonParseException, JsonMappingException, IOException {
		String uri = req.getRequestURI();
		String context = "Project1";
		uri = uri.substring(context.length() + 2, uri.length());
		log.debug(uri);
		if ("welcome/login".equals(uri)) {
			log.debug("Attempting to log in");
			Credential cred = om.readValue(req.getReader(), Credential.class);
			cred.setPassword(PasswordMD5Hash.hashPassword(cred.getPassword()));
			log.debug(cred.getPassword());
			if(!us.login(cred, req.getSession())) {
				resp.setStatus(403);
			}
			User user = us.findByUsername(cred.getUsername());
			ResponseMapper.convertAndAttach(user, resp);
			String role = user.getRoleId().getUserRole();
			if ("employee".equals(role)) {
				resp.setStatus(211);
			}else if("admin".equals(role)) {
				resp.setStatus(210);
			}
		}else if ("welcome/create".equals(uri)) {
			log.info("Attempting to create user");
			UserBasics userB = om.readValue(req.getReader(), UserBasics.class);
			userB.setPassword(PasswordMD5Hash.hashPassword(userB.getPassword()));
			log.debug(userB.getPassword());
		    User user = new User(userB);
			if (us.saveUser(user)) {
				
				resp.setStatus(201);
				return;
			}else {
				log.debug("User could not be inserted.");
				resp.setStatus(409);
			}
			

		} else {
			resp.setStatus(404);
			return;
		}
	}
}
