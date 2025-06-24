import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ICategory } from "../../../interfaces";

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent {

  
    public fb: FormBuilder = inject(FormBuilder);
      @Input() form!: FormGroup;
      @Output() callSaveMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
      @Output() callUpdateMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();

      callSave() {
        let item: ICategory = {
          nombre: this.form.controls["nombre"].value,
          descripcion: this.form.controls["descripcion"].value,
        }
       
  
        if(this.form.controls['id'].value) {
          item.id = this.form.controls['id'].value;
        } 
        if(item.id) {
          this.callUpdateMethod.emit(item);
        } else {
          this.callSaveMethod.emit(item);
        }
      }

}
