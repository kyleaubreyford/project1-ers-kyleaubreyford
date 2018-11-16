const dev = {
    project1Context: "http://localhost:8080/Project1/"
  };
  
  const prod = {
    project1Context: "http://project1kyle-env.99qncmeu49.us-east-2.elasticbeanstalk.com/Project1/"
  };
  
  export const environment = process.env.NODE_ENV === "production" ? prod : dev;
  