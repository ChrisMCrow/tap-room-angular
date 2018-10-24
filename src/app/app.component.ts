import { Component } from '@angular/core';
import { $ } from 'jquery';
import { Keg } from './models/keg.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tap room';
  currentKegs: Keg[] = [
    new Keg("Big Wave", "Kona Brewing Company", 9, 5.5),
    new Keg("Fat Tire Belgian White", "New Belgium", 7, 5.2),
    new Keg("Crisp Apple", "Angry Orchard", 6, 5.0),
    new Keg("Irish Creme", "Bailey's", 10, 17)
    new Keg("Belgian White", "Shock Top", 5, 5.2)
  ];
  selectedKeg: Keg = null;
  newKeg: boolean = false;

  editKeg(keg: Keg): void {
    this.selectedKeg = keg;  
  }

  hideEditKeg(): void {
    this.selectedKeg = null;
  }

  newKegOpen(): void {
    this.newKeg = true;
  }

  addNewKeg(keg: Keg): void {
    this.currentKegs.push(keg);
    this.newKeg = false;
  }
  
  lessThan10Pints(keg: Keg): string {
    if (keg.pints < 10) {
      return "text-danger";
    }
    else {
      return "text-default";
    }
  }

  alcoholContentColor(keg: Keg): string {
    if (keg.alcoholContent > 10) {
      return "text-danger";
    }
    else if (keg.alcoholContent > 5) {
      return "text-default";
    }
    else {
      return "text-secondary";
    }
  }

  sellPint(keg: Keg): void {
    if (keg.pints > 0) {
      keg.pints -= 1;
    } else {
      this.deleteKeg(keg);
    }
  }

  deleteKeg(keg): void {
    this.currentKegs.splice(this.currentKegs.indexOf(keg), 1);
  }

  priceColor(keg): string {
    if (keg.price >= 9) {
      keg.priceText = "$$$";
      return "badge badge-danger";
    } else if (keg.price >= 7) {
      keg.priceText = "$$";
      return "badge badge-warning";
    } else {
      keg.priceText = "$";
      return "badge badge-success";
    }
  }

  desiredColumn: string = "name";
  desiredOrder: string = "ascending";

  columnSortClicked(desiredColumn, desiredOrder) {
    this.desiredColumn = desiredColumn;
    this.desiredOrder = desiredOrder;
  }
  
  desiredOrders: object = {
    name: "ascending",
    brand: "ascending",
    price: "ascending",
    alcoholContent: "ascending",
    pints: "ascending"
  }

  triangles(columnName): string {
    if (this.desiredOrders[columnName] === "ascending")
      return '▲';
    else
      return '▼';
  }

  toggleOrder(columnName: string) {
    this.desiredOrders[columnName] = (this.desiredOrders[columnName] === "ascending") ? "descending":"ascending";
    return this.desiredOrders[columnName];
  }
}