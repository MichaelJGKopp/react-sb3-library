export class BookModel {
  _id: number;
  _title: string;
  _author?: string; // ?: Optional property
  _description?: string;
  _copies?: number;
  _copiesAvailable?: number;
  _category?: string;
  _img?: string;

  constructor(
    id: number,
    title: string,
    author: string,
    description: string,
    copies: number,
    copiesAvailable: number,
    category: string,
    img: string
  ) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._description = description;
    this._copies = copies;
    this._copiesAvailable = copiesAvailable;
    this._category = category;
    this._img = img;
  }



  /*get author() {
        return this._author;
    }

    set author(author: string) {
        this._author = author;
    }

    toString() {
        return `Book: title=${this._title}, author=${this._author}`;
    } */
}
