import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentCollection = collection(this.firestore, 'estudiante'); // Asegúrate de que la colección esté correctamente nombrada.

  constructor(private firestore: Firestore) { }

  getStudents(): Observable<Student[]> {
    return collectionData(this.studentCollection, { idField: 'id' }) as Observable<Student[]>;
  }

  addStudent(student: Student) {
    console.log("Agregando estudiante:", student);
    return addDoc(this.studentCollection, student);
  }

  updateStudent(id: string, student: Student) {
    const studentDoc = doc(this.firestore, `estudiante/${id}`);
    return updateDoc(studentDoc, { ...student });
  }

  deleteStudent(id: string) {
    const studentDoc = doc(this.firestore, `estudiante/${id}`);
    return deleteDoc(studentDoc);
  }
}
