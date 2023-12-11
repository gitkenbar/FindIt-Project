export class Item {
  constructor(
    public name:string,             //The name of the item, to be displayed in a Hunt
    public huntStatus:Boolean,      //Whether or not the item has been found
    public proofs?:any[]            //An optional array of objects constituting proof an item is found
  ){}
}

// As we refine models, consider adding typesaftey to proofs array with
// public proofs:(TypeA | TypeB | TypeC)[];
// The thought process here is "proofs" are one or more user submitted datum used to determine whether the huntStatus of the Item is true (found) or false (not yet found). For example, we could import Geopoint from various APIs and use that as a proofs, alternatively it could simply take a string, or an image URL, etc. It is built as an array for supporting multiple proofs be they object or otherwise. If we wanted we could build something like a validator function to determine whether required proofs are present and valid to  programattically toggle huntStatus (which could then be a private property).  For the time being this should keep things simple and flexible with a lot of room to add complexity.
