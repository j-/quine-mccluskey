import * as numberDigits from 'number-digits';

import Digit from './digit';
import TermState from './term-state';

/**
 * Represents a single minterm or implicant.
 *
 * @class Term
 */
class Term {
	protected digits: Digit[] = [];

	/**
	 * When given a number, converts it to binary and returns an array of Digits
	 * with the most significant bit at index 0.
	 *
	 * @static
	 * @param {number} input
	 * @returns {Digit[]}
	 *
	 * @memberOf Term
	 */
	static getDigitsFromNumber (input: number): Digit[] {
		const digits: number[] = numberDigits(input, 2);
		return digits.map((digit) => (
			digit === 0 ? Digit.UNSET : Digit.SET
		));
	}

	/**
	 * Creates an instance of Term.
	 *
	 * @param {(TermState | Term)} state
	 *
	 * @memberOf Term
	 */
	constructor (state: TermState | Term) {
		if (state instanceof Term) {
			// Copy the other term's state
			this.digits = [...state.getState()];
		} else if (typeof state === 'number') {
			this.digits = Term.getDigitsFromNumber(state);
		} else {
			this.digits = state;
		}
	}

	/**
	 * Index of the most significant digit.
	 *
	 * @readonly
	 * @type {number}
	 * @memberOf Term
	 */
	public get length (): number {
		return this.digits.length;
	}

	/**
	 * Gets the Digit at the given index where 0 is the least significant bit
	 * (1). Will return UNSET for any bit greater than the most significant bit.
	 *
	 * @param {number} idx
	 * @returns {Digit}
	 *
	 * @memberOf Term
	 */
	public getDigit (idx: number): Digit {
		const { digits } = this;
		const { length } = digits;
		if (idx >= length) {
			return Digit.UNSET;
		} else {
			return digits[length - idx - 1];
		}
	}

	/**
	 * Get the array of Digits that make up this term.
	 *
	 * @returns {Digit[]}
	 *
	 * @memberOf Term
	 */
	public getState (): Digit[] {
		return this.digits;
	}
}

export default Term;
