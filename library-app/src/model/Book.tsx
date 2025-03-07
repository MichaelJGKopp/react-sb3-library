export class Book {
    _title: string;
    _author: string;
    _image: string;

    constructor(title: string, author: string, image: string) {
        this._title = title;
        this._author = author;
        this._image = image;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get image() {
        return this._image;
    }

    set title(title: string) {
        this._title = title;
    }

    set author(author: string) {
        this._author = author;
    }

    set image(image: string) {
        this._image = image;
    }

    toString() {
        return `Book: title=${this._title}, author=${this._author}, image=${this._image}`;
    }
}