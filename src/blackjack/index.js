import _ from 'underscore';

import { crearDeck, pedirCarta, valorCarta } from './usecases';


const miModulo = (() => {
  'use strict'
     
  let deck         = [];
  const tipos      = ['C','D','H','S'];
  const especiales = ['A','J','Q','K'];

  let puntosJugadores = [];

  // referencias de HTML
  const btnPedir = document.querySelector('#btnPedir');
  const btnDetener = document.querySelector('#btnDetener');
  const btnNuevo = document.querySelector('#btnNuevo');

  const divCartasjugadores = document.querySelectorAll('.divCartas');
  const puntosHTML = document.querySelectorAll('small');

  deck = crearDeck( tipos, especiales);





  // Esta funcion inicializa el Juego
  const inicializarJuego = ( numJugadores = 2 ) => {
    //   deck = crearDeck();

      puntosJugadores = [];

      for ( let i = 0; i < numJugadores; i++ ) {
          puntosJugadores.push( 0 );
      };

      puntosHTML.forEach( elem => elem.innerText = 0 );
      divCartasjugadores.forEach( elem => elem.innerHTML = '' );

      btnPedir.disabled = false;
      btnDetener.disabled = false;
  };







  const acumularPuntos = ( carta, turno ) => {

      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
      puntosHTML[turno].innerText = puntosJugadores[turno];
      return puntosJugadores[turno];
  };

  const crearCarta = ( carta, turno ) => {
      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/Estilos/cartas/${ carta }.png`;
      imgCarta.classList.add('carta');
      divCartasjugadores[turno].append( imgCarta );
  };

  const determinarGanador = () => {

      const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

      setTimeout( () => {
          if ( puntosComputadora === puntosMinimos ) {
              alert('TERRIBLE EMPATE!!!');
          } else if ( puntosMinimos > 21) {
              alert('Gano la compu');
          } else if ( puntosComputadora > 21 ){
              alert('GANASTE LOCOOOOOO!!!');
          } else {
              alert('Gano la compu');
          };
      },500);
  };

  // Turno computadora
  const turnoComputadora = ( puntosMinimos ) => {

      let puntosComputadora = 0;

      do {
          const carta = pedirCarta( deck );
          puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
          crearCarta( carta, puntosJugadores.length - 1 );            

      } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

      determinarGanador();
  };
  
  // Eventos 
  btnPedir.addEventListener('click', () => {

      const carta = pedirCarta( deck );
      const puntosJugador = acumularPuntos( carta, 0 );

      crearCarta( carta, 0 );  

      if ( puntosJugador > 21 ) {
          console.warn('Lo siento ya perdiste!!!!');
          btnPedir.disabled = true;
          btnDetener.disabled = true;

          turnoComputadora( puntosJugador );
      } else if ( puntosJugador === 21 ){
          console.warn('21 puntos, ganaste!!!')
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora( puntosJugador );
      };
  });

  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora( puntosJugadores[0] );
  });

  btnNuevo.addEventListener('click', () => {
      inicializarJuego();
  });

  return {
      nuevoJuego: inicializarJuego
  };
})();