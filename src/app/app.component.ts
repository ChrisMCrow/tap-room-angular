import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Keg } from './models/keg.model';
import * as anime from 'animejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'The Tap Room';
  currentKegs: Keg[] = [
    new Keg("Big Wave", "Kona Brewing Company", 9, 5.5),
    new Keg("Fat Tire Belgian White", "New Belgium", 7, 5.2),
    new Keg("Crisp Apple", "Angry Orchard", 6, 5.0),
    new Keg("Irish Creme", "Bailey's", 10, 17),
    new Keg("Belgian White", "Shock Top", 5, 5.2)
  ];
  selectedKeg: Keg = null;
  newKeg: boolean = false;

  editKeg(keg: Keg): void {
    this.selectedKeg = keg;  
  }

  hideEditKeg(): void {
    $("#editKeg").addClass("fadeOutUp");
    setTimeout(() => {
      this.selectedKeg = null;
    }, 500);
  }

  newKegOpen(): void {
    this.newKeg = true;
  }

  addNewKeg(keg: Keg): void {
    $("#newKeg").addClass("fadeOutUp");
    setTimeout(() => {
      this.currentKegs.push(keg);
      this.newKeg = false;
    }, 500);
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

  sell(keg: Keg, amount: string): void {
    if (keg.pints > 1 && amount==="pint") {
      keg.pints -= 1;
    } else if (keg.pints > 2 && amount==="growler") {
      keg.pints -= 2;
    } else if (keg.pints > 4 && amount==="largeGrowler") {
      keg.pints -= 4;
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
      return '▼';
    else
      return '▲';
  }

  toggleOrder(columnName: string) {
    this.desiredOrders[columnName] = (this.desiredOrders[columnName] === "ascending") ? "descending":"ascending";
    return this.desiredOrders[columnName];
  }

  ngAfterViewInit() {
    $('.ml12').each(function(){
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    
    anime.timeline({loop: false})
      .add({
        targets: '.ml12 .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: function(el, i) {
          return 500 + 30 * i;
        }
      });
  }

  happyHour: boolean = false;

  startHappyHour() {
    this.currentKegs.forEach(keg => {
      keg.price *= 0.9;
    });
    this.happyHour = true;
  }

  endHappyHour() {
    this.currentKegs.forEach(keg => {
      keg.price /= 0.9;
    });
    $(".happyHourTitle").addClass("rollOut");
    setTimeout(()=> {
      this.happyHour = false;
    }, 500);
  }
}

// .add({
//   targets: '.ml12 .letter',
//   translateX: [0,-30],
//   opacity: [1,0],
//   easing: "easeInExpo",
//   duration: 1100,
//   delay: function(el, i) {
//     return 100 + 30 * i;
//   }
// });