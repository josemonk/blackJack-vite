import  _  from 'underscore';

export const crearDeck = (tipos,especiales)=>{
   let deck = [];
    for (let i = 2; i <= 10; i++) {        
        for (let tipo of tipos) {
            deck.push(i+ tipo)
        };
    }
    for (let tipo of tipos) {        
        for ( let especial of especiales) {
            deck.push(especial + tipo)
        };  
    }           
    return _.shuffle(deck);
}