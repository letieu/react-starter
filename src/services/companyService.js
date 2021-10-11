import axios from "axios";
import { cleanObject } from "helper/cleanObject";

export const companyService = {
  async list(filter) {
    let searchParams = new URLSearchParams(cleanObject(filter));
    return await axios.get("/companies?" + searchParams.toString());
  },
  async create(payload) {
    return await axios.post("/companies", payload);
  },
  async remove(id) {
    return await axios.delete("/companies/" + id);
  },
  async view(id) {
    return await axios.get("/companies/" + id);
  },
  async update(id, payload) {
    return await axios.patch("/companies/" + id, payload);
  },
};
