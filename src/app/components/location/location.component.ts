import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/Location';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent{
  locationForm: FormGroup;
  location: Location[]=[];
  currentLocationId: string | null = null;

  constructor(private fb: FormBuilder, private locationService: LocationService){
    this.locationForm = this.fb.group({
      lugar: ['', Validators.required],
      ubicacion: ['', Validators.required],
      trabajo: ['', Validators.required],
      observacion: ['', Validators.required],
      horas: ['', Validators.required],
      contacto: ['', Validators.required],
      celular: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(data => {
      this.location = data;
    });
  }

  onSubmit(){
    console.log("Formulario enviado");
    if (this.locationForm.valid) {
      console.log("Formulario válido. Datos:", this.locationForm.value);
      this.locationService.addLocation(this.locationForm.value).then(() => {
        console.log("Ubicación agregada exitosamente");
        this.locationForm.reset();
        this.locationService.getLocations().subscribe(data => {
          this.location = data;
        });
      }).catch(error => {
        console.error('Error al agregar la ubicación: ', error);
      });
    } else {
      console.log("Formulario inválido");
      console.log("Estado del formulario:", this.locationForm);
      Object.keys(this.locationForm.controls).forEach(key => {
        const controlErrors = this.locationForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errores en el control ${key}:`, controlErrors);
        }
      });
    }
  }

  onEdit(location: Location){
    this.currentLocationId = location.id!;
    this.locationForm.setValue({
      lugar: location.lugar,
      ubicacion: location.ubicacion,
      trabajo: location.trabajo,
      observacion: location.observacion,
      horas: location.horas,
      contacto: location.contacto,
      celular: location.celular
    });
  }

  onUpdate(){
    if(this.currentLocationId && this.locationForm.valid){
      this.locationService.updateLocation(this.currentLocationId, this.locationForm.value).then(() => {
        console.log("Ubicación actualizada exitosamente");
        this.locationForm.reset();
        this.locationService.getLocations().subscribe(data => {
          this.location = data;
        });
      }).catch(error => {
        console.error('Error al actualizar la ubicación: ', error);
      });
    }
  }
  
  onDelete(id: string){
    this.locationService.deleteLocation(id).then(() => {
      console.log("Ubicación eliminada exitosamente");
      this.locationService.getLocations().subscribe(data => {
        this.location = data;
      });
    }).catch(error => {
      console.error('Error al eliminar la ubicación: ', error);
    });
  }
}
