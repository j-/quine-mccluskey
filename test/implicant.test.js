import test from 'ava';
import Term from '../dist/term';
import Implicant from '../dist/implicant';

test((t) => {
	t.false(Implicant.canCombine(new Term(0), new Term(0)), 'Cannot combine two empty terms');
	t.false(Implicant.canCombine(new Term(0b0), new Term(0b0)), 'Cannot combine 0b0 and 0b0');
	t.false(Implicant.canCombine(new Term(0b1), new Term(0b1)), 'Cannot combine 0b1 and 0b1');
	t.false(Implicant.canCombine(new Term(0b1), new Term(0b1)), 'Cannot combine 0b1 and 0b1');
	t.false(Implicant.canCombine(new Term(0b10), new Term(0b10)), 'Cannot combine 0b10 and 0b10');
	t.false(Implicant.canCombine(new Term(0b1111), new Term(0b1111)), 'Cannot combine 0b1111 and 0b1111');
});

test((t) => {
	t.true(Implicant.canCombine(new Term(0b1), new Term(0b0)), 'Can combine 0b1 and 0b0');
	t.true(Implicant.canCombine(new Term(0b11), new Term(0b1)), 'Can combine 0b11 and 0b1');
	t.true(Implicant.canCombine(new Term(0b1000), new Term(0b0)), 'Can combine 0b1000 and 0b0');
	t.true(Implicant.canCombine(new Term(0b1111), new Term(0b11111)), 'Can combine 0b1111 and 0b11111');
});

test((t) => {
	t.true(
		Term.isEqual(
			Implicant.getCombinedTerm(new Term(0b0), new Term(0b0)),
			new Term(0b0)
		),
		'0b0 and 0b0 combine to 0b0'
	);
	t.true(
		Term.isEqual(
			Implicant.getCombinedTerm(new Term(0b1111), new Term(0b1111)),
			new Term(0b1111)
		),
		'0b1111 and 0b1111 combine to 0b1111'
	);
	t.true(
		Term.isEqual(
			Implicant.getCombinedTerm(new Term(0b10), new Term(0b01)),
			new Term([null, null])
		),
		'0b10 and 0b01 combine to `--`'
	);
});

test((t) => {
	const foo = new Term(0b10);
	const bar = new Term(0b01);
	t.true(
		Term.isEqual(
			new Implicant([ foo, bar ]),
			new Term([null, null])
		),
		'0b10 and 0b01 combine to `--`'
	);
});

test((t) => {
	const foo = new Term(0b100);
	const bar = new Term(0b101);
	const baz = new Term(0b110);
	t.true(
		Term.isEqual(
			new Implicant([ foo, bar, baz ]),
			new Term([1, null, null])
		),
		'0b100, 0b101 and 0b110 combine to `1--`'
	);
});

test((t) => {
	const foo = new Term(0b100);
	const bar = new Term(0b101);
	const baz = new Term(0b110);
	const left = new Implicant([ foo, bar ]);
	const right = new Implicant([ foo, bar, baz ]);
	t.true(Implicant.canCombine(left, right), 'Can combine `1--` and `---`');
});

test((t) => {
	const foo = new Term(0b100);
	const bar = new Term(0b101);
	const baz = new Term(0b110);
	const left = new Implicant([ foo, bar ]);
	const right = new Implicant([ bar, baz ]);
	t.true(
		Term.isEqual(
			new Implicant([ left, right ]),
			new Term([1, null, null])
		),
		'Can combine size 2 implicants'
	);
});
