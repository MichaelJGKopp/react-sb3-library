export class ReviewModel {
  #id: number;
  #userEmail: string;
  #date: Date;
  #rating: number;
  #bookId: number;
  #reviewDescription: string;

  constructor(
    id: number,
    userEmail: string,
    date: string,
    rating: number,
    bookId: number,
    reviewDescription: string
  ) {
    this.#id = id;
    this.#userEmail = userEmail;
    this.#date = new Date(date);
    this.#rating = rating;
    this.#bookId = bookId;
    this.#reviewDescription = reviewDescription;
  }

  getFormattedDate(): string {
    return this.#date.toLocaleDateString("en-us", { // undefined for default locale
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  get id(): number {
    return this.#id;
  }

  set id(id: number) {
    this.#id = id;
  }

  get userEmail(): string {
    return this.#userEmail;
  }

  set userEmail(userEmail: string) {
    this.#userEmail = userEmail;
  }

  get date(): Date {
    return this.#date;
  }

  set date(date: string) {
    this.#date = new Date(date);
  }

  get rating(): number {
    return this.#rating;
  }

  set rating(rating: number) {
    this.#rating = rating;
  }

  get bookId(): number {
    return this.#bookId;
  }

  set bookId(bookId: number) {
    this.#bookId = bookId;
  }

  get reviewDescription(): string {
    return this.#reviewDescription;
  }

  set reviewDescription(reviewDescription: string) {
    this.#reviewDescription = reviewDescription;
  }
}
