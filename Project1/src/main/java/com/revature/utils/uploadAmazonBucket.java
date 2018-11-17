package com.revature.utils;


import java.io.IOException;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

public class uploadAmazonBucket {

    public static String uploadIntoBucket(String data, String key) throws IOException {
        	String clientRegion = "us-east-2";
        	String bucketName = "1810-project1receipt/receipts/";
        	String keyname = key;
        try {
        	AmazonS3 s3Client;
        	try {
    			String property = System.getProperty("db_property");
    			if (property.equals("property")) {
    				s3Client = AmazonS3ClientBuilder.standard()
    	                    .withRegion(clientRegion)
    	                    .withCredentials(DefaultAWSCredentialsProviderChain.getInstance())
    	                    .build();
    			}else {
    				s3Client = AmazonS3ClientBuilder.standard()
                    .withRegion(clientRegion)
                    .withCredentials(new ProfileCredentialsProvider())
                    .build();
    			}
        	}catch (NullPointerException e) {
        		s3Client = AmazonS3ClientBuilder.standard()
                        .withRegion(clientRegion)
                        .withCredentials(new ProfileCredentialsProvider())
                        .build();
			}
         // Upload a text string as a new object.
            s3Client.putObject(bucketName, keyname, data);
            String generatedURL = "https://s3."+clientRegion+".amazonaws.com/"+bucketName+"/"+key;
            System.out.println(generatedURL);
            return generatedURL;
           
        }
        catch(AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process 
            // it, so it returned an error response.
            e.printStackTrace();
        }
        catch(SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            e.printStackTrace();
        }
        return "";
        
       // String generatedURL = "https://s3."+clientRegion+".amazonaws.com/"+bucketName+"/"+object.getKey();
        //System.out.println(generatedURL);
    }
}