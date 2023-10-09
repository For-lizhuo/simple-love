import axios from "axios";
import { baseApi } from "./config";
import { LoginDto } from "../types/dto";

export const loginApi = (loginDto: LoginDto) =>
  axios.post(`${baseApi}/auth/login`, loginDto);