//Couplage fort avec l'ApiTicker
//class au lieu d'interface pour la MetaData

export default class DataTicker
{
    apiTicker : ApiTicker
    variation? : number
    moyenneVariation? : number
    ecart? : number
    carreEcart? : number
    moyenneCarreEcart? : number
    volatilite? : number


}
export class ApiTicker
{
    timestamp : string
    high :  string
    last : string
    bid : string
    vwap : string
    volume : string
    low : string
    ask : string
    open : number

}

