
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {

    static setSearchWord = new EventEmitter();
    static sendFilter = new EventEmitter();
    static setFilterWord = new EventEmitter();
}
