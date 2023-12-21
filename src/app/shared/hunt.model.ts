import { Item } from "./item.model";

export class Hunt {
  constructor(
    public uid:number,              //Unique identifier, be set programatically, used for URL generation
    public name:string,             //Name or Title of a given scavenger hunt
    public begin:Date,              //The time that the scavenger hunt begins
    public end:Date,                //The time the scavenger hunt ends
    public itemList:Item[],         //Array containing the list of Items (see item.model.ts) to be found
    public isProtected:Boolean,     //As per Kenneth, the option to make hunts private
    //public adminID:string,        //Field for holding AdminID to be implemented
    //public participatingIDs:string[],  //Field for participating UserIDs to be implemented
    private passkey?:string         //to be used ifProtected=true as a passkey to grant user access to a hunt
  ) {}
}
