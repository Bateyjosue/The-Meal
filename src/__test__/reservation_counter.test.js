import reservationCounter from '../module/mockResCount.js';
import reservations from '../module/mockApiReservations.js';

describe('reservationCounter', () => {
  test('should return exact Number of all reservations', () => {
    expect(reservationCounter(reservations)).toBe(4);
  });
  test('Adding a New Reservation Should Be Counted', () => {
    const newReservation = { name: 'JingJang', date_start: '2021-01-01', date_end: '2021-01-02' };
    reservations.push(newReservation);
    expect(reservationCounter(reservations)).toBe(5);
  });
  test('Response with no reservation should return zero count', () => {
    expect(reservationCounter([])).toBe(0);
  });
});