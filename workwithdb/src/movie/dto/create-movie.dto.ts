export class CreateMovieDto {
    readonly title: string;
    readonly originalTitle?: string;
    readonly ageRate: number;
    readonly description: string;
    readonly yearSince: number;
    readonly yearTill: number;
    readonly country: string;
    readonly premierRussia: string;
    readonly premier: string;
    readonly seasons: number;
    readonly rate: number;
    readonly rateQuantity: number;
}