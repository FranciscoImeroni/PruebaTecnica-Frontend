import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from '../../services/project/project.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent {

  nombre: string = '';
  descripcion: string = '';
  usuarios: string[] = [];

  constructor(private proyectoService: ProyectoService, private router: Router) {}

  async crearProyecto() {
    const nuevoProyecto = {
      name: this.nombre,
      description: this.descripcion,
      users: this.usuarios
    };

    try {
      await this.proyectoService.createProyecto(nuevoProyecto); 
      this.router.navigate(['/proyectos']); 
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }

}
