import {User} from "./user";
import {DateTime} from "ionic-angular";
import {uuid} from "uuid";
import {ItemMark} from "./itemMark";

/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 *
 * Created by patrick.hoeffel on 6/25/2017.
 */
export class Item {
  // Data Structure for a list item
  uuid: string;
  title: string;
  note: string;
  owner: User;
  lastSaved: DateTime;
  state: any = {};
  marks: Array<ItemMark>;
  order: number = 0;

  // "Level" is relative to the current "page" the user is looking at, so a "level-0" on this page
  // is a "level-1" to its parent page, and so on. Ever time there is a page transition, that
  // page's "levels" will be set accordingly.
  level: number = 0;
  parent: Item;
  children: Item[];
  isRoot: boolean = false;

  constructor(title: string, note: string, order: number) {
    this.uuid = Math.random().toString();
    //this.uuid = uuid();
    this.title = title;
    this.note = note;
    this.order = order;

    this.state = {
      'markState': ItemMark.STATE_COLLAPSED
    };

    this.marks = [];
    this.marks.push(new ItemMark(ItemMark.TYPE_PROPERTY, 'DateCreated', '2017-06-25T10:00:05Z', this.marks.length));
  }

  getItemElementId() {
    return 'item-title-text-' + this.uuid;
  }

}
