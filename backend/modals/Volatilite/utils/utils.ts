import DataTicker, {ApiTicker} from "../../types/DataTicker";

export function variation(data : ApiTicker| any , historyData : Array<DataTicker> | any  )
{
    if(historyData.length <= 1 ) return 0 ;
    let x = historyData.slice(-1)[0]["apiTicker"]["last"]
    let y = historyData.slice(-2)[0]["apiTicker"]["last"]
    if ( y === 0 ) return 0

    return ((x/y)-1)*100

}

export function moyenneVariation(data: ApiTicker | any , historyData : Array<DataTicker> | any  )
{
    if(historyData.length <= 1 ) return 0 ;

    let variations=  historyData.map((data : DataTicker) => data.variation)

    let sum = 0
    for(let i = 0 ; i < variations.length ; i++)
         sum+= variations[i]
    return sum/variations.length

}

export function ecart(moyenneVariation, historyData : Array<DataTicker> | any  )
{
    if(historyData.length <= 1 ) return 0 ;
    let variations=  historyData.map((data : DataTicker) => data.variation)

    return variations.map((valeur) => valeur-moyenneVariation )


}


export function carreEcart(ecart: any, historyData : Array<DataTicker> | any  )
{

    if(historyData.length <= 1 ) return 0 ;

    return ecart.map( (value) => value**2)




}

export function moyenneCarreEcart(carreEcart , historyData : Array<DataTicker> | any  )
{

    if(historyData.length <= 1 ) return 0 ;

    let sum = 0
    for(let i = 0 ; i < carreEcart.length ; i++)
        sum+= carreEcart[i]
    return sum/carreEcart.length


}

export function volatilite(moyenneCarreEcart:ApiTicker | any , historyData: Array<DataTicker> | any)
{
    if(historyData.length <= 1 ) return 0 ;

    return Math.sqrt(moyenneCarreEcart)

}