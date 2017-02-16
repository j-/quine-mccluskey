import test from 'ava';
import Term from '../dist/term';
import Implicant from '../dist/implicant';

test((t) => {
	const foo = new Term(0b10);
	const bar = new Term(0b01);
	t.falsy(
		Term.countDifferences(
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
	t.falsy(
		Term.countDifferences(
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
	t.true(Term.canCombine(left, right), 'Can combine `1--` and `---`');
});

test((t) => {
	const foo = new Term(0b100);
	const bar = new Term(0b101);
	const baz = new Term(0b110);
	const left = new Implicant([ foo, bar ]);
	const right = new Implicant([ bar, baz ]);
	t.falsy(
		Term.countDifferences(
			new Implicant([ left, right ]),
			new Term([1, null, null])
		),
		'Can combine size 2 implicants'
	);
});
