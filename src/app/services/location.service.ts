import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Location } from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // This is the collection of locations in Firestore.
  private locationCollection = collection(this.firestore, 'lugares'); // 

  constructor(private firestore: Firestore) { }

  getLocations(): Observable<Location[]> {
    return collectionData(this.locationCollection, { idField: 'id' }) as Observable<Location[]>;
  }

  addLocation(location: Location) {
    console.log("Adding location:", location);
    return addDoc(this.locationCollection, location);
  }

  updateLocation(id: string, location: Location) {
    const locationDoc = doc(this.firestore, `lugares/${id}`);
    return updateDoc(locationDoc, { ...location });
  }

  deleteLocation(id: string) {
    const locationDoc = doc(this.firestore, `lugares/${id}`);
    return deleteDoc(locationDoc);
  }
}
