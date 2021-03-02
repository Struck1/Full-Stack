interface Duck{
    name: string,
    numleg:number,
    bisey: (deger: string) => void;
}




const duck: Duck = {
    name:"emre",
    numleg:5,
    bisey: (deger: any)=> console.log(deger
    )
       
}

const duck1: Duck = {

    name:"emread",
    numleg:55,
    bisey: (deger: any)=> console.log(deger)
       
}

duck.bisey("vraık");

export const ducks = [duck, duck1];

