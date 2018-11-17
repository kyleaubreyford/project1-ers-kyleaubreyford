package com.revature.controllers;

import java.io.Console;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dto.ReimbursementBasics;
import com.revature.dto.ReimbursementTable;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.services.ReimbursementService;
import com.revature.services.UserService;
import com.revature.utils.ResponseMapper;
import com.revature.utils.uploadAmazonBucket;

public class ReimbursementController {
	private Logger log = Logger.getRootLogger();
	private ReimbursementService rs = ReimbursementService.currentImplementation;
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
		String uri = req.getRequestURI();
		String context = "Project1";
		uri = uri.substring(context.length() + 2, uri.length());
		log.debug(uri);
		
		
		if ("admin".equals(uri)) {
			log.info("Finding all Reimbursements for ADMIN");
			
			String un = (String) req.getSession().getAttribute("username");
			List<ReimbursementTable> reimbursements = rs.tableFindAll();
			ResponseMapper.convertAndAttach(reimbursements, resp);
			
			
		} else if ("home".equals(uri)) {
			log.info("Finding all Reimbursements for User");
			
			String un = (String) req.getSession().getAttribute("username");
			final UserService us = UserService.currentImplementation;
			List<ReimbursementTable> reimbursements = rs.tableFindByUserId(us.findByUsername(un).getId());
			ResponseMapper.convertAndAttach(reimbursements, resp);
		}
	}

	private void processPost(HttpServletRequest req, HttpServletResponse resp)
			throws JsonParseException, JsonMappingException, IOException {
		log.info("Attempting to create Reimbursement");
		String un = (String) req.getSession().getAttribute("username");
		
		String uri = req.getRequestURI();
		String context = "Project1";
		uri = uri.substring(context.length() + 2, uri.length());
		
		//put check here.
		
		
		if ("home/createReimbursement".equals(uri)) {
			
			ReimbursementBasics reimbursementB = om.readValue(req.getReader(), ReimbursementBasics.class);
			User user = us.findByUsername(un);
			Reimbursement r;
			if (!reimbursementB.getReceipt().equals("empty")){
				String key = user.getFirstName()+"_"+user.getLastName()+"_"+reimbursementB.getReceipt().substring(0,10)+((int)Math.random()
				*10);
				reimbursementB.setReceipt(uploadAmazonBucket.uploadIntoBucket(reimbursementB.getReceipt(), key));
			}else {
			 reimbursementB.setReceipt("");
			}
			 r = new Reimbursement(reimbursementB,  user.getId() );
			if (rs.saveReimbursement(r)) {
				resp.setStatus(201);
				return;
			} else {
				log.debug("User could not be inserted.");
				resp.setStatus(409);
			}
		}else if ("admin/approve".equals(uri)) {
			try {
				int index = om.readValue(req.getReader(), int.class);
				rs.approveReimbursement(index, un);
				List<ReimbursementTable> reimbursements = rs.tableFindAll();
				ResponseMapper.convertAndAttach(reimbursements, resp);
				resp.setStatus(201);
			}catch (NullPointerException e){
				resp.setStatus(204);
				log.debug("No List Found Containing Indexes");
			}

		}else if ("admin/reject".equals(uri)) {
			try {
				int index = om.readValue(req.getReader(), int.class);
				rs.rejectReimbursement(index, un);
				List<ReimbursementTable> reimbursements = rs.tableFindAll();
				ResponseMapper.convertAndAttach(reimbursements, resp);
				resp.setStatus(201);
			}catch (NullPointerException e){
				resp.setStatus(204);
				log.debug("No List Found Containing Indexes");
			}
		}
	}
}
