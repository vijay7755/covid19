export class CountryDailyTimeline {
    public country: string;
    public last_updated: Date;
    public new_infections: number;
    public new_deaths: number;
    public new_recovered: number;

    constructor(
        country: string,
        last_updated: Date,
        new_infections: number,
        new_deaths: number,
        new_recovered: number)
         {
            this.country = country;
            this.last_updated = last_updated;
            this.new_infections = new_infections;
            this.new_deaths = new_deaths;
            this.new_recovered = new_recovered;
        }
}