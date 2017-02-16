import test from 'ava';
import Term from '../dist/term';
import { getPrimeImplicants } from '../dist/index';

test((t) => {
	t.notThrows(() => {
		getPrimeImplicants([]);
	}, 'Does not throw exception when called with empty array');
});

test((t) => {
	const result = getPrimeImplicants([
		new Term(4),
		new Term(8),
		new Term(9),
		new Term(10),
		new Term(12),
		new Term(11),
		new Term(14),
		new Term(15),
	]);
	t.is(result.length, 4, 'Found four prime implicants');
});
