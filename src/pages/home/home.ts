import {Component, SimpleChanges} from '@angular/core';
import { NavController } from 'ionic-angular';
import {HostListener} from "@angular/core";
import {Item} from "../../models/item";
import {ItemMark} from "../../models/itemMark";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchQuery: string = '';
  selectedItem: Item;
  items: Array<Item>;

  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [];
    this.items.push(new Item('My People', 'Family, Friends, Co-workers, Clients, Neighbors, Want-to-meets, etc.', 0));
    this.items.push(new Item('My Places', '', 1));
    this.items.push(new Item('My Pets', '', 2));
    this.items.push(new Item('My Teams', '', 3));
    this.items.push(new Item('My Home', '', 4));
    this.items.push(new Item('My Car', '', 5));
    this.items.push(new Item('My Job', '', 6));
    this.items.push(new Item('My To Do\'s', '', 7));

  }

  ngOnInit() {
    if (this.selectedItem) {
      let elem = document.getElementById(this.selectedItem.getItemElementId());
      if (elem) {
        elem.focus();
      }
    }
  }

  ngAfterViewInit() {
    if (this.selectedItem) {
      let elem = document.getElementById(this.selectedItem.getItemElementId());
      if (elem) {
        elem.focus();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      alert(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  // See MDN docs for pre-defined list of known keys:
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
  @HostListener('keydown', ['$event']) handleKeydownEvents(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    // Handle the various essential keystrokes
    switch (event.key) {
      case "ArrowDown":
        // Set the focus to the next element in the array
        let elem = document.getElementById(this.selectedItem.getItemElementId());
        if (elem) {
          if (elem.previousSibling && this.selectedItem.order < this.items.length) {
            this.selectedItem = this.items[this.selectedItem.order + 1];

            // Now go find the new element and set focus to it.
            let newElem = document.getElementById(this.selectedItem.getItemElementId());
            if (newElem) {
              newElem.focus();
            }
          }
        }
        break;

      case "ArrowUp":
        // Set the focus to the previous element in the array
          elem = document.getElementById(this.selectedItem.getItemElementId());
        if (elem) {
          if (elem.previousSibling && this.selectedItem.order > 0) {
            this.selectedItem = this.items[this.selectedItem.order - 1];

            // Now go find the new element and set focus to it.
            let newElem = document.getElementById(this.selectedItem.getItemElementId());
            if (newElem) {
              newElem.focus();
            }
          }
        }
        break;

      case "Enter":
        // Insert a new Item
        if (this.selectedItem) {
          if (this.selectedItem.title === '') {
            // A "NewLine" key on an empty line == Outdent, but ONLY when "level" > 0
            if (this.selectedItem.level > 0) {
              this.outdent(event, this.selectedItem);
            }
          }
          let newItem = new Item('', '', this.selectedItem.order + 1);
          for (let i = this.selectedItem.order + 1; i < this.items.length; i++) {
            let item = this.items[i];
            if (item) {
              item.order++;
            }
          }
          this.items.splice(newItem.order, 0, newItem);
          let originalSelectedItem = this.selectedItem;
          this.selectedItem = newItem;

          // let originalElem = document.getElementById(originalSelectedItem.getItemElementId());
          // if (originalElem) {
          //   let newElement = document.createElement('div');
          //   newElement.setAttribute("contentEditable", "true");
          //
          //   originalElem.parentNode.insertBefore(newElement, originalElem.nextSibling);
          //   newElement.focus();
          // }

          // let elem = document.getElementById('list-top-level-wrapper');
          // if (elem) {
          //   let n = document.createTextNode(' ');
          //   let disp = elem.style.display;  // don't worry about previous display style
          //
          //   elem.appendChild(n);
          //   elem.style.display = 'none';
          //
          //   setTimeout(function(){
          //     elem.style.display = disp;
          //     n.parentNode.removeChild(n);
          //   },20); // you can play with this timeout to make it as short as possible
          //
          //   // Now go find the new element and set focus to it.
          //   let newElem = document.getElementById(newItem.getItemElementId());
          //   if (newElem) {
          //     newElem.focus();
          //   }
          // }
        }
        break;

      case "Escape":
        // Do something for "esc" key press.
        break;

      case "Tab":
        // Do Indent/Outdent for the "Tab" key
        if (event.ctrlKey) {
          // Do nothing
          // return;
        } else if (event.shiftKey) {
          // Outdent
          return this.outdent(event, this.selectedItem);
        } else {
          // Indent
          return this.indent(event, this.selectedItem);
        }
        break;

      case "Backspace":
        // Do something for "esc" key press.
        break;

      case "@":
        // Create a "Person" reference
        //alert('Person Reference');
        return;

      case "^":
        // Create a "Place" reference
        //alert('Place Reference');
        return;

      case "#":
        // Create a "Tag" reference
        //alert('Tag Reference');
        return;

      case ">":
        // Create a "Link" reference
        //alert('Link Reference');
        return;

      case "*":
        // Create a "Property" reference
        //alert('Link Reference');
        if (this.selectedItem) {
          let elem = document.getElementById(this.selectedItem.getItemElementId());
          if (elem) {

          }
        }
        return;

      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();

  }

  indent(event, item: Item) {
    //alert('TAB = Indent');
    // Goal: add this item as an element in the previous node's "Children" list
    let itemToRemove = item.order;
    let parent = this.items[item.order - 1];
    if (parent) {
      // Set appropriate child values
      item.parent = parent;
      item.order = 0;
      item.level++;

      // Add item to list of parent's child nodes
      parent.children.splice(item.order, 0, item);

      // Remove item from list of parent siblings
      for (let i = this.selectedItem.order + 1; i < this.items.length; i++) {
        let curItem = this.items[i];
        if (curItem && curItem.level == parent.level) {
          curItem.order--;
        }
      }

      this.items.slice(itemToRemove, itemToRemove);
    }
  }

  outdent(event, item: Item) {
    alert('Shift-TAB = Outdent');
  }

  @HostListener('mouseenter') c_onEnterrr() {
    // Perform mouneenter action
  }

  @HostListener('mouseleave') c_onLeaveee() {
    // Perform mouseleave action
  }

  setFocus(event, item: Item) {
    // Used just to identify which item is getting keystrokes
    this.selectedItem = item;
  }

  expandCollapseMarks(event, item: Item) {
    // Expand and collapse the Marks on the item
    if (item.state.markState === ItemMark.STATE_COLLAPSED) {
      this.showMarks(item);
    } else {
      this.hideMarks(item);
    }
  }

  showMarks(item: Item) {
    //alert('show marks for ' + item.title);
    let elem = document.getElementById('item-marks-' + item.uuid);

    if (elem) {
      let val = '';
      for (let i = 0; i < item.marks.length; i++) {
        let mark = item.marks[i];
        val += mark.type + ':' + mark.name + '=' + mark.value + ' ';
      }

      elem.innerText = val;
    }

    item.state.markState = ItemMark.STATE_EXPANDED;
  }

  hideMarks(item: Item) {
    //alert('hide marks for ' + item.title);
    let elem = document.getElementById('item-marks-' + item.uuid);
    if (elem) {
      elem.innerText = '...';
    }
    item.state.markState = ItemMark.STATE_COLLAPSED;
  }

  searchForItems(ev: any) {

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
