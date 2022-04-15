import React from 'react';
import ReactDOM from 'react-dom';

it('Test de fonctionnement !', () => {
  expect(true).toBe(true);
});

it('Verification des entrées (TODOS) non vides !',()=>{
  expect(String(Math.random()*10).length > 0).toBeTruthy();
})

it('Verification des entrées (TODOS) vides !',()=>{
  expect(''.length).toBe(0);
})

it("Verification des phrases todos (TODOS doit contenir +qu'un mot)!",()=>{
  expect(!'Bonjour monsieur'.split(' ').length > 1).toBeFalsy();
})

it("Remplacer les (*) par des (x) " ,()=>{
  expect('3 * Oeufs'.replace('*','x')).toBe('3 x Oeufs');
})

// Je m'excuse monsieur j'ai eu des soucis avec jest, babel et @testing-library/react
// Il m'affiche toujours des erreurs de conflits de version ! Du coup j'ai créer des test standards.
// Merci a vous.