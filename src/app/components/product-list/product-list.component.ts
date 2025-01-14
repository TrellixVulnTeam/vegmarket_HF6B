import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  a:number[] = [1,2,3,4,5,6,7,8,9];
  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;
  constructor(private productService: ProductService ,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });
  }

listProducts(){
  this.searchMode=this.route.snapshot.paramMap.has('keyword');
  if(this.searchMode){
    this.handleSearchProducts();
  }
  else{
  this.handleListProducts();}
}
  handleSearchProducts() {
   const theKeyword: string =this.route.snapshot.paramMap.get('keyword');

   this.productService.searchProducts(theKeyword).subscribe(
      data=>{
      this.products=data;
    }
   )
  }


  handleListProducts(){
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

  if(hasCategoryId){
    this.currentCategoryId = + this.route.snapshot.paramMap.get('id');
    this.productService.getProductsListByCategory(this.currentCategoryId).subscribe(
      data => {
        this.products=data;
      }
    )
  }
  else{
    this.productService.getProductsList(this.currentCategoryId).subscribe(
      data => {
        this.products=data;
      }
    )
  }
}
}
