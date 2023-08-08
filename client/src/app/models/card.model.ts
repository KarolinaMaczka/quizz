export class Card {
  showDeleteButton: boolean = false;
  edit: boolean = false;

  constructor(public id: string, public term: string, public definition: string){}

}
