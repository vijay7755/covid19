export class CountryPosition {
    public countryCode: string;
    public countryName: string;
    public lat: string;
    public lng: string;
    public confirmed: number;
    public deaths: number;
    public recovered: number;
    public dateAsOf: Date;

    constructor(
        countryCode: string,
        countryName: string,
        lat: string,
        lng: string,
        confirmed: number,
        deaths: number,
        recovered: number,
        dateAsOf: Date) 
        {
            this.countryCode = countryCode;
            this.countryName = countryName;
            this.lat = lat;
            this.lng = lng;
            this.confirmed = confirmed;
            this.deaths = deaths;
            this.recovered = recovered;
            this.dateAsOf = dateAsOf;
    }
}