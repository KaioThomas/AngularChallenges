import { ProductService } from './../products/product.service';
import { Component, OnInit } from '@angular/core';
import { EmitterService } from './emitter.service';
import { Product } from '../products/product.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductReadComponent } from '../products/product-read/product-read.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: Product[] = []
  colors = new Set();
  colorsLight!: Observable<string[]>;

  selected = 'none'
  filterMessage = "Escolha uma cor"

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products

      this.products.forEach(product => {
        if (!this.colors.has(product.color)) {
          this.colors.add(product.color)
          this.options.push(product.name)
        }
      })
    })

    this.colorsLight = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));

  }

  search(): void {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    EmitterService.setSearchWord.emit(input.value.toUpperCase())

  }

  clear(): void {
    let input = document.getElementById('searchInput') as HTMLInputElement;
    input.value = '';
    
    EmitterService.setSearchWord.emit('');

    this.selected = 'none'
  }

  reset(){
    EmitterService.setSearchWord.emit('');
  }

  sendFilter(input: any) {
    EmitterService.sendFilter.emit(input.value);
  }

  colorFilter() {
    if(this.selected != '') {
      EmitterService.setFilterWord.emit(this.selected.toUpperCase())
    } else EmitterService.setFilterWord.emit(undefined)
    console.log(this.selected)
  }
}
