import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private categoryUrl='http://localhost:8081/api/product-category';

  private baseUrl ='http://localhost:8081/api/products';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number):Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

getProductsListByCategory(theCategoryId: number): Observable<Product[]> {

  const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
  return this.getProducts(searchUrl);
  }

getProductsList(theCategoryId: number): Observable<Product[]> {
  return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
    map(response => response._embedded.products)
  );
}
getProductCategories(): Observable<ProductCategory[]> {
  return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
    map(response => response._embedded.productCategory)
  );
}


searchProducts(theKeyword: string):Observable<Product[]> {
  const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  return this.getProducts(searchUrl);
    
}

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}