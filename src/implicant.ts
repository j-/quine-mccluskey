import Term from './term';
import Digit from './digit';

/**
 * Represents one or more combined terms.
 *
 * @class Implicant
 * @extends {Term}
 */
class Implicant extends Term {
	protected minterms: Term[] = [];

	/**
	 * Determine if two terms can be combined. Will return `true` if there is
	 * only one digit difference between `left` and `right`.
	 *
	 * @static
	 * @param {Term} left
	 * @param {Term} right
	 * @returns {boolean}
	 *
	 * @memberOf Implicant
	 */
	static canCombine (left: Term, right: Term): boolean {
		return Implicant.countDifferences(left, right) === 1;
	}

	/**
	 * Count the number of digits that differ between two terms or implicants.
	 *
	 * @example
	 *
	 *     Implicant.countDifferences(
	 *       new Term(0b0000),
	 *       new Term(0b1010)
	 *     ) // => 2
	 *
	 * @static
	 * @param {Term} left
	 * @param {Term} right
	 * @returns {number}
	 *
	 * @memberOf Implicant
	 */
	static countDifferences (left: Term, right: Term): number {
		const length = Math.max(left.length, right.length);
		let total = 0;
		for (let i = 0; i < length; i++) {
			const leftDigit = left.getDigit(i);
			const rightDigit = right.getDigit(i);
			if (leftDigit !== rightDigit) {
				total++;
			}
		}
		return total;
	}

	/**
	 * Combine two terms, returning a new term whose digits are replaced with an
	 * UNCOMMON Digit where the two input terms differ.
	 *
	 * @static
	 * @param {Term} left
	 * @param {Term} right
	 * @returns {Term}
	 *
	 * @memberOf Implicant
	 */
	static getCombinedTerm (left: Term, right: Term): Term {
		const length = Math.max(left.length, right.length);
		const digits = [];
		for (let i = 0; i < length; i++) {
			const leftDigit = left.getDigit(i);
			const rightDigit = right.getDigit(i);
			digits.unshift(
				// Are the two digits the same?
				leftDigit === rightDigit ?
					// If so, just use one of them
					leftDigit :
					// Otherwise, they differ
					Digit.UNCOMMON
			);
		}
		return new Term(digits);
	}

	/**
	 * Creates an instance of Implicant.
	 *
	 * @param {Term[]} minterms
	 *
	 * @memberOf Implicant
	 */
	constructor (minterms: Term[]) {
		super(
			// Combine all the midterms and prime the state
			minterms.reduce(Implicant.getCombinedTerm)
		);
		this.minterms = minterms;
	}

}

export default Implicant;
