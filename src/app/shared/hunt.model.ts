import { Item } from "./item.model";

export class Hunt {
  constructor(
    public uid:number,              //Unique identifier, be set programatically, used for URL generation
    public name:string,             //Name or Title of a given scavenger hunt
    public begin:Date,              //The time that the scavenger hunt begins
    public end:Date,                //The time the scavenger hunt ends
    public listOfItems:Item[],      //Array containing the list of Items (see item.model.ts) to be found
    public isProtected:Boolean,     //As per Kenneth, the option to make hunts private
    private passkey?:string         //to be used ifProtected=true as a passkey to grant user access to a hunt
  ) {}
}