import test from 'ava';
import Term from '../dist/term';

test((t) => {
	t.notThrows(() => {
		new Term(0)
	}, 'Can be constructed with a zero');
});

test((t) => {
	t.notThrows(() => {
		new Term([])
	}, 'Can be constructed with an empty array');
});

test((t) => {
	//               Index: 76543210
	const term = new Term(0b10010110);
	t.is(term.getDigit(0), 0);
	t.is(term.getDigit(1), 1);
	t.is(term.getDigit(2), 1);
	t.is(term.getDigit(3), 0);
	t.is(term.getDigit(4), 1);
	t.is(term.getDigit(5), 0);
	t.is(term.getDigit(6), 0);
	t.is(term.getDigit(7), 1);
	t.is(term.getDigit(8), 0);
	t.is(term.getDigit(9), 0);
	t.is(term.getDigit(100), 0);
});

test((t) => {
	t.true(Term.isEqual(new Term(0b1111), new Term(0b1111)), 'No difference between 0b1111 and 0b1111');
	t.true(Term.isEqual(new Term(0b1100), new Term(0b1100)), 'No difference between 0b1100 and 0b1100');
	t.true(Term.isEqual(new Term(0b1101), new Term(0b1101)), 'No difference between 0b1101 and 0b1101');
	t.true(Term.isEqual(new Term(0b1000), new Term(0b1000)), 'No difference between 0b1000 and 0b1000');
	t.true(Term.isEqual(new Term(0b1), new Term(0b1)), 'No difference between 0b1 and 0b1');
});

test((t) => {
	t.false(Term.isEqual(new Term(0b1110), new Term(0b1111)), 'One difference between 0b1110 and 0b1111');
	t.false(Term.isEqual(new Term(0b1101), new Term(0b1100)), 'One difference between 0b1101 and 0b1100');
	t.false(Term.isEqual(new Term(0b1001), new Term(0b1101)), 'One difference between 0b1001 and 0b1101');
	t.false(Term.isEqual(new Term(0b0), new Term(0b1000)), 'One difference between 0b0 and 0b1000');
	t.false(Term.isEqual(new Term(0b1), new Term(0b11)), 'One difference between 0b1 and 0b11');
});

test((t) => {
	t.false(Term.isEqual(new Term(0b1111), new Term(0b0000)), 'Four differences between 0b1111 and 0b0000');
	t.false(Term.isEqual(new Term(0b0), new Term(0b1010101)), 'Four differences between 0b0 and 0b1010101');
});
