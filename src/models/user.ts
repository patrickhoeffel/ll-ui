import {DateTime} from "ionic-angular";
/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * The Users service manages creating instances of User, so go ahead and rename
 * that something that fits your app as well.
 *
 * Created by patrick.hoeffel on 6/25/2017.
 */
export class User {
  // Data Structure for a User
  userId: string;
  familarName: string;
  firstName: string;
  lastName: string;
  dateCreated: DateTime;
  lastUsedItems: any;

  constructor(private fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (let f in fields) {
      this[f] = fields[f];
    }
  }

}
