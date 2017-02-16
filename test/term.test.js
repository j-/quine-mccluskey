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
