import test from 'ava';
import Term from '../dist/term';
import TermColumn from '../dist/term-column';
import Implicant from '../dist/implicant';

test((t) => {
	const column = new TermColumn([
		new Term(0b0000), // Prime
		new Term(0b0110), // Combine to `-110`
		new Term(0b1110), // Combine to `-110`
	]);
	const iter1 = column.getImplicants();
	t.falsy(
		Implicant.countDifferences(
			iter1.prime[0],
			new Term(0b0000)
		),
		'Can get simple prime implicant'
	);
	t.falsy(
		Implicant.countDifferences(
			iter1.combined[0],
			new Term([null, 1, 1, 0])
		),
		'Can get simple combined implicant'
	);
});

test((t) => {
	const column = new TermColumn([
		new Term(4),
		new Term(8),
		new Term(9),
		new Term(10),
		new Term(12),
		new Term(11),
		new Term(14),
		new Term(15),
	]);
	const iter1 = column.getImplicants();
	t.is(iter1.prime.length, 0, 'There are no prime size 0 implicants');
	t.is(iter1.combined.length, 10, 'There are 10 size 2 combined terms');
});

test((t) => {
	const column = new TermColumn([
		new Implicant([new Term(4), new Term(12)]), // Prime
		new Implicant([new Term(8), new Term(9)]),
		new Implicant([new Term(8), new Term(10)]),
		new Implicant([new Term(8), new Term(12)]),
		new Implicant([new Term(9), new Term(11)]),
		new Implicant([new Term(10), new Term(11)]),
		new Implicant([new Term(10), new Term(14)]),
		new Implicant([new Term(12), new Term(14)]),
		new Implicant([new Term(11), new Term(15)]),
		new Implicant([new Term(14), new Term(15)]),
	]);
	const iter2 = column.getImplicants();
	t.is(iter2.prime.length, 1, 'There is 1 size 2 prime implicant');
	t.is(iter2.combined.length, 3, 'There are 3 size 4 combined terms');
});

test((t) => {
	const column = new TermColumn([
		new Implicant([
			new Implicant([new Term(8), new Term(9)]),
			new Implicant([new Term(10), new Term(11)]),
		]),
		new Implicant([
			new Implicant([new Term(8), new Term(10)]),
			new Implicant([new Term(12), new Term(14)]),
		]),
		new Implicant([
			new Implicant([new Term(10), new Term(11)]),
			new Implicant([new Term(14), new Term(15)]),
		]),
	]);
	const iter3 = column.getImplicants();
	t.is(iter3.prime.length, 3, 'There are 3 size 4 prime implicant');
	t.is(iter3.combined.length, 0, 'There are no size 8 combined terms');
});
