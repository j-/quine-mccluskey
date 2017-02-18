import test from 'ava';
import Implicant from '../dist/implicant';
import { getPrimeImplicants, getEssentialPrimeImplicants } from '../dist/index';

const minterms = [4, 8, 10, 11, 12, 15];
const dontcares = [9, 14];

test('Can get prime implicants', (t) => {
	const primeImplicants = getPrimeImplicants(minterms, dontcares);
	t.is(primeImplicants.length, 4, 'There are four prime implicants');
	t.deepEqual(primeImplicants, [
		new Implicant(4, 12),
		new Implicant(8, 9, 10, 11),
		new Implicant(8, 10, 12, 14),
		new Implicant(10, 11, 14, 15),
	], 'Results are as expected');
});

test('Can get essential prime implicants', (t) => {
	const primeImplicants = [
		new Implicant(4, 12),
		new Implicant(8, 9, 10, 11),
		new Implicant(8, 10, 12, 14),
		new Implicant(10, 11, 14, 15),
	];
	const essentialPrimeImplicants = getEssentialPrimeImplicants(primeImplicants, dontcares);
	t.is(essentialPrimeImplicants.length, 2, 'There are two essential prime implicants');
	t.deepEqual(essentialPrimeImplicants, [
		new Implicant(4, 12),
		new Implicant(10, 11, 14, 15),
	], 'Results are as expected');
});

test('Dont\'t cares are optional', (t) => {
	const primeImplicants = [
		new Implicant(4, 12),
		new Implicant(8, 9, 10, 11),
		new Implicant(8, 10, 12, 14),
		new Implicant(10, 11, 14, 15),
	];
	const essentialPrimeImplicants = getEssentialPrimeImplicants(primeImplicants);
	t.is(essentialPrimeImplicants.length, 3, 'There are three essential prime implicants');
	t.deepEqual(essentialPrimeImplicants, [
		new Implicant(4, 12),
		new Implicant(8, 9, 10, 11),
		new Implicant(10, 11, 14, 15),
	], 'Results are as expected');
});
