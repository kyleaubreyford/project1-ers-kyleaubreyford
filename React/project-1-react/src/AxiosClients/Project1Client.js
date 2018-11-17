import axios from 'axios';
import { environment } from '../Environment';
const Project1Client = axios.create({
  baseURL: environment.project1Context,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const AWSClientBlank = axios.create({
    baseURL: "",
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default Project1Client;