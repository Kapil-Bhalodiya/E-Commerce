// import { Component } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-add-product',
//   templateUrl: './add-product.component.html',
//   styleUrls: ['./add-product.component.css']
// })
// export class AddProductComponent {
//   productForm: FormGroup;
//   successMessage: string | null = null;
//   errorMessage: string | null = null;

//   colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
//   sizes = ['S', 'M', 'L', 'XL', 'XXL'];

//   constructor(private fb: FormBuilder, private apiService: ApiService) {
//     this.productForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
//       description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
//       brand: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
//       subcategory: ['', [Validators.required, Validators.pattern(/^[0-9a-fA-F]{24}$/)]], // Dynamic in prod
//       base_price: ['', [Validators.required, Validators.min(0)]],
//       tags: ['["Casual"]'],
//       image: [null],
//       variants: this.fb.array([])
//     });
//     this.addVariant();
//   }

//   get variants(): FormArray {
//     return this.productForm.get('variants') as FormArray;
//   }

//   addVariant() {
//     const variantGroup = this.fb.group({
//       color: ['', Validators.required],
//       size: ['', Validators.required],
//       stock_quantity: ['', [Validators.required, Validators.min(0)]],
//       price: ['', [Validators.required, Validators.min(0)]],
//       images: [[]]
//     });
//     this.variants.push(variantGroup);
//   }

//   removeVariant(index: number) {
//     this.variants.removeAt(index);
//   }

//   onProductImageChange(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length) {
//       const file = input.files[0];
//       if (file.size > 5 * 1024 * 1024) {
//         this.errorMessage = 'Product image must be less than 5MB';
//         return;
//       }
//       if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
//         this.errorMessage = 'Product image must be JPEG, PNG, or GIF';
//         return;
//       }
//       this.productForm.patchValue({ image: file });
//     }
//   }

//   onVariantImagesChange(event: Event, index: number) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length) {
//       const files = Array.from(input.files);
//       if (files.length > 10) {
//         this.errorMessage = 'Maximum 10 images per variant';
//         return;
//       }
//       for (const file of files) {
//         if (file.size > 5 * 1024 * 1024) {
//           this.errorMessage = `Image ${file.name} must be less than 5MB`;
//           return;
//         }
//         if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
//           this.errorMessage = `Image ${file.name} must be JPEG, PNG, or GIF`;
//           return;
//         }
//       }
//       const variants = this.productForm.get('variants') as FormArray;
//       variants.at(index).patchValue({ images: files });
//     }
//   }

//   async onSubmit() {
//     this.successMessage = null;
//     this.errorMessage = null;

//     if (this.productForm.invalid) {
//       this.errorMessage = 'Please fill out all required fields correctly.';
//       this.productForm.markAllAsTouched();
//       return;
//     }

//     try {
//       // Step 1: Create Product
//       const productFormData = new FormData();
//       productFormData.append('name', this.productForm.get('name')?.value);
//       productFormData.append('description', this.productForm.get('description')?.value);
//       productFormData.append('brand', this.productForm.get('brand')?.value);
//       productFormData.append('subcategory', this.productForm.get('subcategory')?.value);
//       productFormData.append('base_price', this.productForm.get('base_price')?.value);
//       productFormData.append('tags', this.productForm.get('tags')?.value);
//       const productImage = this.productForm.get('image')?.value;
//       if (productImage) {
//         productFormData.append('image', productImage);
//       }

//       const productResponse = await this.apiService.createProduct(productFormData).toPromise();
//       const productId = productResponse.data._id;

//       // Step 2: Create Variants
//       const variants = this.productForm.get('variants')?.value;
//       for (const variant of variants) {
//         const variantFormData = new FormData();
//         variantFormData.append('product_id', productId);
//         variantFormData.append('color', variant.color);
//         variantFormData.append('size', variant.size);
//         variantFormData.append('stock_quantity', variant.stock_quantity);
//         variantFormData.append('price', variant.price);
//         if (variant.images && variant.images.length > 0) {
//           variant.images.forEach((image: File) => {
//             variantFormData.append('images', image);
//           });
//         }

//         await this.apiService.createProductVariant(variantFormData).toPromise();
//       }

//       this.successMessage = 'Product and variants created successfully!';
//       this.productForm.reset({
//         tags: '["Casual"]'
//       });
//       this.variants.clear();
//       this.addVariant();
//     } catch (error: any) {
//       this.errorMessage = error.message || 'Failed to create product/variants.';
//     }
//   }
// }