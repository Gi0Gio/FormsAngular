import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OffersService } from '../../services/offers.service';
import { Offers } from '../../models/Offers';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {
  offerForm: FormGroup;
  offer: Offers[] = [];
  currentOfferId: string | null = null;

  constructor(private fb: FormBuilder, private offerService: OffersService) {
    this.offerForm = this.fb.group({
      titulo: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      horas: ['', Validators.required],
      lugar: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.offerService.getOffers().subscribe(data => {
      this.offer = data;
    });
  }

  onSubmit() {
    console.log("Formulario enviado");
    if (this.offerForm.valid) {
      console.log("Formulario válido. Datos:", this.offerForm.value);
      this.offerService.addOffers(this.offerForm.value).then(() => {
        console.log("Oferta agregada exitosamente");
        this.offerForm.reset();
        this.offerService.getOffers().subscribe(data => {
          this.offer = data;
        });
      }).catch(error => {
        console.error('Error al agregar la oferta: ', error);
      });
    } else {
      console.log("Formulario inválido");
      console.log("Estado del formulario:", this.offerForm);
      Object.keys(this.offerForm.controls).forEach(key => {
        const controlErrors = this.offerForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errores en el control ${key}:`, controlErrors);
        }
      });
    }
  }

  onEdit(offer: Offers) {
    this.currentOfferId = offer.id!;
    this.offerForm.setValue({
      titulo: offer.titulo,
      tipo: offer.tipo,
      descripcion: offer.descripcion,
      horas: offer.horas,
      lugar: offer.lugar,
      direccion: offer.direccion
    });
  }

  onUpdate() {
    if(this.currentOfferId && this.offerForm.valid) {
      this.offerService.updateOffers(this.currentOfferId, this.offerForm.value).then(() => {
        console.log("Oferta actualizada exitosamente");
        this.offerForm.reset();
        this.currentOfferId = null;
        this.offerService.getOffers().subscribe(data => {
          this.offer = data;
        });
      }).catch(error => {
        console.error('Error al actualizar la oferta: ', error);
      });
    }
  }

  onDelete(id: string) {
    this.offerService.deleteOffers(id).then(() => {
      console.log("Oferta eliminada exitosamente");
      this.offerService.getOffers().subscribe(data => {
        this.offer = data;
      });
    }).catch(error => {
      console.error('Error al eliminar la oferta: ', error);
    });
  }
}
