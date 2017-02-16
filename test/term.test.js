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
	t.is(
		Term.countDifferences(new Term(0b1111), new Term(0b1111)),
		0,
		'No difference between 0b1111 and 0b1111'
	);
	t.is(
		Term.countDifferences(new Term(0b1100), new Term(0b1100)),
		0,
		'No difference between 0b1100 and 0b1100'
	);
	t.is(
		Term.countDifferences(new Term(0b1101), new Term(0b1101)),
		0,
		'No difference between 0b1101 and 0b1101'
	);
	t.is(
		Term.countDifferences(new Term(0b1000), new Term(0b1000)),
		0,
		'No difference between 0b1000 and 0b1000'
	);
	t.is(
		Term.countDifferences(new Term(0b1), new Term(0b1)),
		0,
		'No difference between 0b1 and 0b1'
	);
});

test((t) => {
	t.is(
		Term.countDifferences(new Term(0b1110), new Term(0b1111)),
		1,
		'One difference between 0b1110 and 0b1111'
	);
	t.is(
		Term.countDifferences(new Term(0b1101), new Term(0b1100)),
		1,
		'One difference between 0b1101 and 0b1100'
	);
	t.is(
		Term.countDifferences(new Term(0b1001), new Term(0b1101)),
		1,
		'One difference between 0b1001 and 0b1101'
	);
	t.is(
		Term.countDifferences(new Term(0b0), new Term(0b1000)),
		1,
		'One difference between 0b0 and 0b1000'
	);
	t.is(
		Term.countDifferences(new Term(0b1), new Term(0b11)),
		1,
		'One difference between 0b1 and 0b11'
	);
});

test((t) => {
	t.is(
		Term.countDifferences(new Term(0b1111), new Term(0b0000)),
		4,
		'Four differences between 0b1111 and 0b0000'
	);
	t.is(
		Term.countDifferences(new Term(0b0), new Term(0b1010101)),
		4,
		'Four differences between 0b0 and 0b1010101'
	);
});

test((t) => {
	t.is(
		Term.canCombine(new Term(0), new Term(0)),
		false,
		'Cannot combine two empty terms'
	);
	t.is(
		Term.canCombine(new Term(0b0), new Term(0b0)),
		false,
		'Cannot combine 0b0 and 0b0'
	);
	t.is(
		Term.canCombine(new Term(0b1), new Term(0b1)),
		false,
		'Cannot combine 0b1 and 0b1'
	);
	t.is(
		Term.canCombine(new Term(0b1), new Term(0b1)),
		false,
		'Cannot combine 0b1 and 0b1'
	);
	t.is(
		Term.canCombine(new Term(0b10), new Term(0b10)),
		false,
		'Cannot combine 0b10 and 0b10'
	);
	t.is(
		Term.canCombine(new Term(0b1111), new Term(0b1111)),
		false,
		'Cannot combine 0b1111 and 0b1111'
	);
});

test((t) => {
	t.is(
		Term.canCombine(new Term(0b1), new Term(0b0)),
		true,
		'Can combine 0b1 and 0b0'
	);
	t.is(
		Term.canCombine(new Term(0b11), new Term(0b1)),
		true,
		'Can combine 0b11 and 0b1'
	);
	t.is(
		Term.canCombine(new Term(0b1000), new Term(0b0)),
		true,
		'Can combine 0b1000 and 0b0'
	);
	t.is(
		Term.canCombine(new Term(0b1111), new Term(0b11111)),
		true,
		'Can combine 0b1111 and 0b11111'
	);
});

test((t) => {
	t.is(
		Term.countDifferences(
			Term.getCombinedTerm(new Term(0b0), new Term(0b0)),
			new Term(0b0)
		),
		0,
		'0b0 and 0b0 combine to 0b0'
	);
	t.is(
		Term.countDifferences(
			Term.getCombinedTerm(new Term(0b1111), new Term(0b1111)),
			new Term(0b1111)
		),
		0,
		'0b1111 and 0b1111 combine to 0b1111'
	);
	t.is(
		Term.countDifferences(
			Term.getCombinedTerm(new Term(0b10), new Term(0b01)),
			new Term([null, null])
		),
		0,
		'0b10 and 0b01 combine to `--`'
	);
});
