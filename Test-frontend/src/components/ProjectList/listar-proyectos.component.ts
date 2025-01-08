// src/app/components/listar-proyectos/listar-proyectos.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProyectoService } from '../../services/project/project.service';

interface Proyecto {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-proyectos.component.html',
  styleUrls: ['./listar-proyectos.component.css']
})
export class ListarProyectosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'acciones'];
  dataSource = new MatTableDataSource<Proyecto>();

  constructor(private proyectoService: ProyectoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  obtenerProyectos() {
    this.proyectoService.getProyectos().then((proyectos: Proyecto[]) => {
      this.dataSource.data = proyectos;
    }).catch((error) => {
      console.error('Error cargando proyectos', error);
    });
  }

  verDetalles(id: string) {
    this.router.navigate([`/proyectos/${id}`]);
  }

  editarProyecto(id: string) {
    this.router.navigate([`/proyectos/editar/${id}`]);
  }

  eliminarProyecto(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.proyectoService.deleteProyecto(id).then(() => {
        this.obtenerProyectos();  
      }).catch((error) => {
        console.error('Error eliminando proyecto', error);
      });
    }
  }
}
