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
