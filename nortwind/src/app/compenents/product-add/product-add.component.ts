import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required], //validator pattern ile örneğin telefon numarası formatı verilebilir.
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(response => {        
        this.toastrService.success(response.message,"Başarılı");
      },responceError =>{
        if(responceError.error.Errors.length>0){         
          for (let i = 0; 1 < responceError.error.Errors.length; i++) {
            this.toastrService.error(responceError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")            
          }
          
        }
        
       
      })

    } else {
      this.toastrService.error('Eksik bilgi girişi');
    }
  }
}
