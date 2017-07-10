import {User} from "./user";
import {DateTime} from "ionic-angular";
import {Item} from "./item";
/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 *
 * Created by patrick.hoeffel on 6/25/2017.
 */
export class ItemMark {
  // Data Structure for a list item "Mark"
  type: string;
  name: string;
  value: string;
  order: number;
  state: any;
  parent: Item;

  //Constants
  public static TYPE_TAG: string = 'Tag';
  public static TYPE_LINK: string = 'Link';
  public static TYPE_PLACE: string = 'Place';
  public static TYPE_PERSON: string = 'Person';
  public static TYPE_PROPERTY: string = 'Property';

  public static STATE_COLLAPSED: string = 'collapsed';
  public static STATE_EXPANDED: string = 'expanded';

  constructor(type: string, name: string, value: string, order?: number) {
    this.type = type;
    this.name = name;
    this.value = value;
    this.order = order ? order : 0;

    this.state = {
      'markState': ItemMark.STATE_COLLAPSED
    };

  }

}
