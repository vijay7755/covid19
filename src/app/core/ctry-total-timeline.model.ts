export class CountryTotalTimeline {
    public country_code: string;
    public country: string;
    public total_confirmed: number;
    public total_deaths: number;
    public total_recovered: number;
    public last_updated: Date;

    constructor(
        country_code: string,
        country: string,
        total_confirmed: number,
        total_deaths: number,
        total_recovered: number,
        last_updated: Date)
         {
            this.country_code = country_code;
            this.country = country;
            this.total_confirmed = total_confirmed;
            this.total_deaths = total_deaths;
            this.total_recovered = total_recovered;
            this.last_updated = last_updated;
        }
}