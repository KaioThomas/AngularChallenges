import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../../search/emitter.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = []
  product!: Product

  filter: string = ''

  displayedColumns = ['id', 'name', 'color', 'price', 'action']

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })

    EmitterService.setSearchWord.subscribe(word => {
      if (word) {
        this.productService.read().subscribe(products => {
          this.products = products.filter(product =>
            product.name.toUpperCase().indexOf(word) >= 0
          )
        })

      } else if (!word) this.refresh()
    })

    EmitterService.sendFilter.subscribe(word => {
      this.filter = word
    })

    EmitterService.setFilterWord.subscribe(filterWord => {
      if (filterWord) {
        this.productService.read().subscribe(products => {
          this.products = products.filter(product =>
            product.color.toUpperCase().indexOf(filterWord) >= 0
          )
        })
      } else if (!filterWord) this.refresh()
    });

  }

  refresh() {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }
 
}
