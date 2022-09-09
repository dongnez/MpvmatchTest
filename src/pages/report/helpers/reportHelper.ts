export async function getData(gatewayId:string,projectId:string){
    const result = await fetch('http://178.63.13.157:8090/mock-api/api/report',
    {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({from:'2021-01-01',to:'2021-31-12',gatewayId:gatewayId,projectId:projectId}),
    })
    .then((res)=> res.json())
    .then((res)=> res.data)

    return result;
}


export function getTotalAmout(array:any){
    
    let total:number = 0;
        
    array.map((item:any)=>{
        total += item.amount;
    })
    
    return total
}

export function getTotal(array:number[]){
    var sum = array.reduce(function(a, b){
        return a + b;
    }, 0);

    return sum
}