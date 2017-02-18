import test from 'ava';
import Implicant from '../dist/implicant';
import { getPrimeImplicants } from '../dist/index';

const minterms = [4, 8, 10, 11, 12, 15];
const dontcares = [9, 14];

test((t) => {
	const primeImplicants = getPrimeImplicants(minterms, dontcares);
	t.is(primeImplicants.length, 4, 'There are four prime implicants');
	t.deepEqual(primeImplicants, [
		new Implicant(4, 12),
		new Implicant(8, 9, 10, 11),
		new Implicant(8, 10, 12, 14),
		new Implicant(10, 11, 14, 15),
	], 'Results are as expected');
});
