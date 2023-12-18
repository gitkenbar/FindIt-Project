export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
    ){}

  get token() {
    // Validation to ensbure we have an expDate and it is not past the current date
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
    return null;

    return this._token;
  }
}
