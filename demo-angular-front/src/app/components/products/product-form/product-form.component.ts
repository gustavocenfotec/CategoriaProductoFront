import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IProduct } from "../../../interfaces";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ ReactiveFormsModule,
    CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  public fb: FormBuilder = inject(FormBuilder);
    @Input() form!: FormGroup;
    @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
    @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  
    callSave() {
      let item: IProduct = {
        nombre: this.form.controls["nombre"].value,
        descripcion: this.form.controls["descripcion"].value,
        precio: this.form.controls["precio"].value,
        cantidad: this.form.controls["cantidad"].value,
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
