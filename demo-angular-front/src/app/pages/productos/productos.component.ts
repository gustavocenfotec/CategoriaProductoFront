import { ModalService } from './../../services/modal.service';
import { Component, inject, ViewChild } from "@angular/core";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { IProduct } from '../../interfaces';
import { ProductosService } from '../../services/productos.service';
import { ProductFormComponent } from '../../components/products/product-form/product-form.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ProductListComponent,PaginationComponent,
    ModalComponent,ProductFormComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {

    public pProductList: IProduct[] = []
    public productService: ProductosService = inject(ProductosService);
    public fb: FormBuilder = inject(FormBuilder);
    public productForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
    public modalService: ModalService = inject(ModalService);
    @ViewChild('editProductModal') public editProductModal: any;
  
    public authService: AuthService = inject(AuthService);
    public areActionsAvailable: boolean = false;
    public route: ActivatedRoute = inject(ActivatedRoute);
  
    ngOnInit(): void {
      this.authService.getUserAuthorities();
      this.route.data.subscribe( data => {
        this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
      });
    }
  
    constructor() {
      this.productService.getAll();
    }

    saveProduct(item: IProduct) {
      this.productService.save(item);
    }

    updateProduct(item: IProduct) {
      this.productService.update(item);
      this.modalService.closeAll();
      this.productForm.reset();
    }
  

    deleteProduct(item: IProduct) {
      console.log("deleteProduct Boton llega objeto", item);
      this.productService.delete(item);
    }
  
    openEditProductModal(product: IProduct) {
      console.log("openEditProductModal", product);
      this.productForm.patchValue({
        id: JSON.stringify(product.id),
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: JSON.stringify(product.precio),
        cantidad: JSON.stringify(product.cantidad),
      });
      this.modalService.displayModal('lg', this.editProductModal);
    }

}
