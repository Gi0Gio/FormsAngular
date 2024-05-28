import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/Student';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class StudentComponent implements OnInit {

  studentForm: FormGroup;
  students: Student[] = [];
  currentStudentId: string | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      agno: ['', Validators.required],
      carrera: ['', Validators.required],
      cedula: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
      grupo: ['', Validators.required],
      horas: ['', Validators.required],
      nombre: ['', Validators.required],
      residencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  onSubmit() {
    console.log("Formulario enviado");
    if (this.studentForm.valid) {
      console.log("Formulario válido. Datos:", this.studentForm.value);
      this.studentService.addStudent(this.studentForm.value).then(() => {
        console.log("Estudiante agregado exitosamente");
        this.studentForm.reset();
        this.studentService.getStudents().subscribe(data => {
          this.students = data;
        });
      }).catch(error => {
        console.error('Error al agregar el estudiante: ', error);
      });
    } else {
      console.log("Formulario inválido");
      console.log("Estado del formulario:", this.studentForm);
      Object.keys(this.studentForm.controls).forEach(key => {
        const controlErrors = this.studentForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errores en el control ${key}:`, controlErrors);
        }
      });
    }
  }

  onEdit(student: Student) {
    this.currentStudentId = student.id!;
    this.studentForm.setValue({
      agno: student.agno,
      carrera: student.carrera,
      cedula: student.cedula,
      celular: student.celular,
      correo: student.correo,
      grupo: student.grupo,
      horas: student.horas,
      nombre: student.nombre,
      residencia: student.residencia
    });
  }

  onUpdate() {
    if (this.currentStudentId && this.studentForm.valid) {
      this.studentService.updateStudent(this.currentStudentId, this.studentForm.value).then(() => {
        this.studentForm.reset();
        this.currentStudentId = null;
        // Actualiza la lista de estudiantes después de actualizar uno
        this.studentService.getStudents().subscribe(data => {
          this.students = data;
        });
      }).catch(error => {
        console.error('Error updating student: ', error);
      });
    }
  }

  onDelete(id: string) {
    this.studentService.deleteStudent(id).then(() => {
      // Actualiza la lista de estudiantes después de eliminar uno
      this.studentService.getStudents().subscribe(data => {
        this.students = data;
      });
    }).catch(error => {
      console.error('Error deleting student: ', error);
    });
  }
}
