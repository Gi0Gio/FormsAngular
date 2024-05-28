import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Offers } from '../models/Offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private offersCollection = collection(this.firestore, 'ofertas'); // Asegúrate de que la colección esté correctamente nombrada.

  constructor(private firestore: Firestore) { }

  getOffers(): Observable<Offers[]> {
    return collectionData(this.offersCollection, { idField: 'id' }) as Observable<Offers[]>;
  }

  addOffers(offers: Offers) {
    console.log("Agregando estudiante:", offers);
    return addDoc(this.offersCollection, offers);
  }

  updateOffers(id: string, offers: Offers) {
    const offersDoc = doc(this.firestore, `ofertas/${id}`);
    return updateDoc(offersDoc, { ...offers });
  }

  deleteOffers(id: string) {
    const offersDoc = doc(this.firestore, `ofertas/${id}`);
    return deleteDoc(offersDoc);
  }
}
