import { Injectable } from '@angular/core';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/projects';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {

  constructor() {}

  getProyectos() {
    return axios.get(apiUrl).then(response => response.data);
  }

  getProyecto(id: string) {
    return axios.get(`${apiUrl}/${id}`).then(response => response.data);
  }

  deleteProyecto(id: string) {
    return axios.delete(`${apiUrl}/${id}`);
  }

  createProyecto(proyecto: any) {
    return axios.post(apiUrl, proyecto).then(response => response.data);
  }

  updateProyecto(id: string, proyecto: any) {
    return axios.put(`${apiUrl}/${id}`, proyecto).then(response => response.data);
  }
}
