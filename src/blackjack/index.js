import { crearDeck } from "./usecases/crear-deck";


(()=>{
    'use strict'
        let     deck      = [];
        const   tipos     = ['C','D','H','S'],
        especiales = ['A','J','Q','K']
    
    
        let puntosJugadores =[]
          
    
        const   buttomPedir = document.querySelector('#btn-pedir'),
                buttomStop = document.querySelector('#btn-detener'),
                buttomNew = document.querySelector('#btn-nuevo');
    
                const divCartasJugadores =  document.querySelectorAll('.divCartas'),
                      puntosHtml = document.querySelectorAll('small');
             //esta funcion inicaliza un juego 
        const inicializarJuego = (numJugadores = 2) => {
            deck = crearDeck(especiales,tipos);
            puntosJugadores = [];
            for (let i = 0; i < numJugadores; i++) {
                puntosJugadores.push(0);
                }
                puntosHtml.forEach(elem => elem.innerText = 0);
                divCartasJugadores.forEach(elem => elem.innerHTML = '');
    
                buttomPedir.disabled = false;
                buttomStop.disabled = false;
    
        }   

         deck = crearDeck(especiales,tipos);
        
        const perdirUnaCarta = () => {
            if (deck.length === 0) {
                throw 'no hay cartas en el deck';
            }
            return deck.pop();
        }

    
    
            const valorCarta = (carta) => {
                const valor = carta.substring(0, carta.length - 1);
                return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : valor * 1
            }
                
    
    
     
            //turno: 0 = primer jugador y el ultimo sera la comptadora
            const acumularPuntos = (carta, turno)=>{
                puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
                puntosHtml[turno].innerText = puntosJugadores[turno];
                return puntosJugadores[turno];
            }
    
            const crearCarta = (carta, turno)=>{
                const cartaImagen = document.createElement('img');
                cartaImagen.src =   `/assets/cartas/${carta}.png`;
                cartaImagen.classList.add('carta');
                divCartasJugadores[turno].append(cartaImagen);
            }
    
            const determinarGanador = ()=>{
    
                const [puntosMinimos, puntosComputadora] = puntosJugadores;
    
                setTimeout(() => {
                    if(puntosMinimos === puntosComputadora){
                        alert('Nadie Gana');
                    }else if(puntosMinimos > 21){
                        alert('computadora gana');
                    }else if(puntosComputadora > 21){
                        alert('ganaste bro');
                    }else {
                        alert('computadora gana');
                    }
                }, 30);
            }
    
            const turnoComputadora = (puntosMinimos)=>{
                let puntosComputadora = 0;    
                do {
    
                const carta = perdirUnaCarta();
                puntosComputadora =  acumularPuntos(carta,puntosJugadores.length -1);
                crearCarta(carta, puntosJugadores.length -1);
                // puntosComputadora = puntosComputadora + valorCarta(carta);
                // puntosHtml[1].innerText = puntosComputadora;
                if(puntosMinimos > 21) {
                    break;
                }
            
                    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
                        determinarGanador();
                }
    
            //Dom
        
            buttomPedir.addEventListener('click',()=>{
                
                const carta = perdirUnaCarta(),
                puntosJugador = acumularPuntos(carta, 0);
                crearCarta(carta,0);
    
                if(puntosJugador > 21){
                    console.warn('Lo siento mucho has perdido');
                    buttomPedir.disabled = true;
                    buttomStop.disabled = true;
                    turnoComputadora(puntosJugador);
    
                }else if(puntosJugador === 21){
                    console.warn('Tienes 21');
                    buttomPedir.disabled = true;
                    turnoComputadora(puntosJugador);
    
                }
                
            })
    
            buttomStop.addEventListener('click',()=>{
                buttomPedir.disabled = true;
                buttomStop.disabled = true;
                turnoComputadora(puntosJugadores[0]);
            });
    
            buttomNew.addEventListener('click',()=>{
    
                inicializarJuego();
    
    
            })
    
    
    
    })() 