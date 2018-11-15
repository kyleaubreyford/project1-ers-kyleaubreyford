package com.revature.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

public class DispatcherServlet extends HttpServlet {

	private UserController uc = new UserController();
	private ReimbursementController rc = new ReimbursementController();
	private Logger log = Logger.getRootLogger();

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		resp.addHeader("Access-Control-Allow-Origin", "http://1810-projectone-kyle.s3-website.us-east-2.amazonaws.com/");
		resp.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
		resp.addHeader("Access-Control-Allow-Headers",
				"Origin, Methods, Credentials, X-Requested-With, Content-Type, Accept");
		resp.addHeader("Access-Control-Allow-Credentials", "true");
		resp.setContentType("application/json");

		String uri = req.getRequestURI();
		String context = "Project1";
		uri = uri.substring(context.length() + 2, uri.length());

		if (req.getMethod().equals("OPTIONS")) {
			return;
		}

		log.debug("request made with uri: " + uri);
		if (uri.startsWith("welcome")) {
			log.info("processing user request");
			uc.process(req, resp);

		} else if (uri.startsWith("home")) {

			if (checkAuthentication("employee", req) || checkAuthentication("admin", req)) {
				rc.process(req, resp);
			} else {
				log.debug("Rejected not employee or admin");
				resp.setStatus(404);
			}
		} else if (uri.startsWith("admin")) {
			if (checkAuthentication("admin", req)) {
				rc.process(req, resp);

			} else {
				log.debug("Rejected not admin");
				resp.setStatus(404);
			}

		} else if (uri.startsWith("logout")) {
			HttpSession session = req.getSession(false);
			if (session != null) {
				session.invalidate();
			}
			log.debug("Logged off");
		}
	}

	public boolean checkAuthentication(String r, HttpServletRequest req) {

		try {
			// Cookie ck[]=req.getCookies();
			// log.debug("Hello "+ck[0].getValue()+ck[0].getName());

			String username = (String) req.getSession().getAttribute("username");
			String role = (String) req.getSession().getAttribute("role");
			log.debug("Check Auth for:" + username + "Role Required:" + r + " Current Role:" + role);
			if (r.equals(role)) {
				return true;
			}
			return false;
		} catch (NullPointerException e) {
			return false;
		}

	}
}
