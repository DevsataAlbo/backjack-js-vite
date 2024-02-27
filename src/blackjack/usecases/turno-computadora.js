import { pedirCarta, valorCarta } from './'

/**
 * Turno computadora
 * @param {Number} puntosMinimos que la computadora necesita para ganar
 * @param {Array<String>} deck  
 */

export  const turnoComputadora = ( puntosMinimos, puntosHTML, divCartasjugadores, deck = [] ) => {

    if ( !puntosMinimos ) throw new Error ('Puntos minimos son necesarios');
    if ( !puntosHTML ) throw new Error ('Argumentos PuntosHTML es necesario');

    let puntosComputadora = 0;

    do {
        const carta = pedirCarta( deck );
        puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
        crearCarta( carta, puntosJugadores.length - 1 );            

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    determinarGanador();
};