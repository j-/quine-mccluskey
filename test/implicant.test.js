import test from 'ava';
import Implicant from '../dist/implicant';

test('Implicant must have minterms', (t) => {
	t.throws(() => new Implicant(), 'Implicant must be initialized with minterms', 'Throws on construction');
});

test('Implicant must have power of 2 minterms', (t) => {
	t.notThrows(() => new Implicant(1), 'OK when given 1 minterm');
	t.notThrows(() => new Implicant(1, 2), 'OK when given 2 minterms');
	t.throws(() => new Implicant(1, 2, 3), 'Number of minterms must be a power of 2, got 3', 'Throws when given 3 minterms');
	t.notThrows(() => new Implicant(1, 2, 3, 4), 'OK when given 4 minterms');
	t.throws(() => new Implicant(1, 2, 3, 4, 5), 'Number of minterms must be a power of 2, got 5', 'Throws when given 5 minterms');
	t.throws(() => new Implicant(1, 2, 3, 4, 5, 6), 'Number of minterms must be a power of 2, got 6', 'Throws when given 6 minterms');
	t.throws(() => new Implicant(1, 2, 3, 4, 5, 6, 7), 'Number of minterms must be a power of 2, got 7', 'Throws when given 7 minterms');
	t.notThrows(() => new Implicant(1, 2, 3, 4, 5, 6, 7, 8), 'OK when given 8 minterms');
});

test('Implicant minterms must be unique', (t) => {
	t.notThrows(() => new Implicant(1), 'OK when given 1 minterm');
	t.throws(() => new Implicant(1, 1), 'Implicant must be initialized with unique set of minterms', 'Throws when given 1, 1');
	t.throws(() => new Implicant(2, 2), 'Implicant must be initialized with unique set of minterms', 'Throws when given 2, 2');
	t.throws(() => new Implicant(1, 2, 3, 1), 'Implicant must be initialized with unique set of minterms', 'Throws when given 1, 2, 3, 1');
});

test('Get common bits from size 1 implicant', (t) => {
	t.is(new Implicant(0).getCommonBits(), 0);
	t.is(new Implicant(1).getCommonBits(), 1);
	t.is(new Implicant(2).getCommonBits(), 2);
	t.is(new Implicant(3).getCommonBits(), 3);
});

test('Get common bits from size 2 implicant', (t) => {
	t.is(new Implicant(0b00, 0b01).getCommonBits(), 0b00);
	t.is(new Implicant(0b00, 0b10).getCommonBits(), 0b00);
	t.is(new Implicant(0b00, 0b11).getCommonBits(), 0b00);
	t.is(new Implicant(0b01, 0b11).getCommonBits(), 0b01);
	t.is(new Implicant(0b10, 0b11).getCommonBits(), 0b10);
});

test('Get uncommon bits from size 1 implicant', (t) => {
	t.is(new Implicant(0).getUncommonBits(), 0);
	t.is(new Implicant(1).getUncommonBits(), 0);
	t.is(new Implicant(2).getUncommonBits(), 0);
	t.is(new Implicant(3).getUncommonBits(), 0);
});

test('Get uncommon bits from size 2 implicant', (t) => {
	t.is(new Implicant(0b00, 0b01).getUncommonBits(), 0b01);
	t.is(new Implicant(0b00, 0b10).getUncommonBits(), 0b10);
	t.is(new Implicant(0b00, 0b11).getUncommonBits(), 0b11);
	t.is(new Implicant(0b01, 0b11).getUncommonBits(), 0b10);
	t.is(new Implicant(0b10, 0b11).getUncommonBits(), 0b01);
});

test('Can combine two size 1 implicants with 1 difference', (t) => {
	t.true(Implicant.canCombine(new Implicant(4), new Implicant(12)));
	t.true(Implicant.canCombine(new Implicant(8), new Implicant(9)));
	t.true(Implicant.canCombine(new Implicant(8), new Implicant(10)));
	t.true(Implicant.canCombine(new Implicant(8), new Implicant(12)));
	t.true(Implicant.canCombine(new Implicant(9), new Implicant(11)));
});

test('Cannot combine two size 1 implicants with no difference', (t) => {
	t.false(Implicant.canCombine(new Implicant(4), new Implicant(4)));
	t.false(Implicant.canCombine(new Implicant(8), new Implicant(8)));
	t.false(Implicant.canCombine(new Implicant(9), new Implicant(9)));
	t.false(Implicant.canCombine(new Implicant(10), new Implicant(10)));
	t.false(Implicant.canCombine(new Implicant(11), new Implicant(11)));
});

test('Cannot combine two size 1 implicants with more than 1 difference', (t) => {
	t.false(Implicant.canCombine(new Implicant(4), new Implicant(8)));
	t.false(Implicant.canCombine(new Implicant(8), new Implicant(15)));
	t.false(Implicant.canCombine(new Implicant(9), new Implicant(14)));
	t.false(Implicant.canCombine(new Implicant(10), new Implicant(15)));
	t.false(Implicant.canCombine(new Implicant(11), new Implicant(14)));
});

test('Can combine two size 2 implicants with 1 difference', (t) => {
	t.true(Implicant.canCombine(new Implicant(8, 9), new Implicant(10, 11)));
	t.true(Implicant.canCombine(new Implicant(8, 10), new Implicant(12, 14)));
	t.true(Implicant.canCombine(new Implicant(10, 11), new Implicant(14, 15)));
});

test((t) => {
	t.true(Implicant.canCombine(
		new Implicant(0b01111110),
		new Implicant(0b01111111)
	));
	t.true(Implicant.canCombine(
		new Implicant(0b11111110),
		new Implicant(0b11111111)
	));
	t.true(Implicant.canCombine(
		new Implicant(0b01111110, 0b01111111),
		new Implicant(0b11111110, 0b11111111)
	));
});

test('Order does not affect ability to combine', (t) => {
	t.true(Implicant.canCombine(new Implicant(9, 8), new Implicant(10, 11)));
	t.true(Implicant.canCombine(new Implicant(10, 8), new Implicant(14, 12)));
	t.true(Implicant.canCombine(new Implicant(14, 15), new Implicant(10, 11)));
});

test('Can combine to produce size 4 implicant', (t) => {
	const left = new Implicant(8, 9);
	const right = new Implicant(10, 11);
	const combined = Implicant.getCombinedImplicant(left, right);
	t.is(combined.getCommonBits(), 0b1000, 'Common bits are correct');
	t.is(combined.getUncommonBits(), 0b0011, 'Uncommon bits are correct');
	t.is(combined.getMinterms().length, 4, 'Correct number of minterms');
	t.deepEqual(combined.getMinterms(), [8, 9, 10, 11], 'Correct minterms');
});
