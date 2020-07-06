export interface GlobalData {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
}

export interface CountriesData {
    Country: string,
    CountryCode: string,
    Slug: string,
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number,
    Date: Date
}

export class Covid19Data {
    public Global: GlobalData;
    public Countries: CountriesData[];
    public Date: Date;

    constructor(Global: GlobalData, Countries: CountriesData[], Date: Date) {
        this.Global = Global;
        this.Countries = Countries;
        this.Date = Date;
    }
}