import Minterm from './minterm';

/** @private */
const log2 = (x: number): number => Math.log(x) / Math.log(2);

/** @private */
const isPowerOf2 = (x: number): boolean => log2(x) % 1 === 0;

/** @private */
const numeric = (a: any, b: any) => a - b;

/** @private */
const isAllUnique = (arr: Array<any>): boolean => !arr.some((item, i, arr) => (
	item === arr[i + 1]
));

/**
 * An implicant contains a set of one or more minterms. All minterms must be
 * unique. The total number of minterms must be a power of two, e.g. 1, 2, 4, 8
 * etc.
 *
 * @export
 * @class Implicant
 */
export default class Implicant {
	protected readonly minterms: Minterm[];

	/**
	 * Determine if two implicants can be combined. Will be `true` if there is
	 * only one differing bit between them -- either a set bit or an uncommon
	 * bit.
	 *
	 * @static
	 * @param {Implicant} left
	 * @param {Implicant} right
	 * @returns {boolean}
	 *
	 * @memberOf Implicant
	 */
	static canCombine (left: Implicant, right: Implicant): boolean {
		return isPowerOf2(
			// Compare set bits
			(left.getCommonBits() ^ right.getCommonBits()) |
			(left.getUncommonBits() ^ right.getUncommonBits())
		);
	}

	/**
	 * Returns a new implicant with all the minterms of each given implicant
	 * combined.
	 *
	 * @static
	 * @param {Implicant} left
	 * @param {Implicant} right
	 * @returns {Implicant}
	 *
	 * @memberOf Implicant
	 */
	static getCombinedImplicant (left: Implicant, right: Implicant): Implicant {
		return new Implicant(
			...left.getMinterms(),
			...right.getMinterms()
		);
	}

	/**
	 * Creates an instance of Implicant. Must be given a set of minterms.
	 *
	 * @param {...Minterm[]} minterms
	 *
	 * @memberOf Implicant
	 */
	constructor (...minterms: Minterm[]) {
		minterms = [...minterms].sort(numeric);
		const { length } = minterms;
		if (length === 0) {
			throw new Error('Implicant must be initialized with minterms');
		} else if (!isPowerOf2(length)) {
			throw new Error(`Number of minterms must be a power of 2, got ${length}`);
		} else if (length > 1 && !isAllUnique(minterms)) {
			throw new Error('Implicant must be initialized with unique set of minterms');
		}
		this.minterms = minterms;
	}

	/**
	 * Get the array of minterms that make up this implicant.
	 *
	 * @returns {Minterm[]}
	 *
	 * @memberOf Implicant
	 */
	public getMinterms (): Minterm[] {
		return this.minterms;
	}

	/**
	 * Returns a number representing all the common set bits between all
	 * minterms in this implicant.
	 *
	 * @example
	 *
	 *     new Implicant(
	 *       0b1110,
	 *       0b0111
	 *     ).getCommonBits() === 0b0110
	 *
	 * @returns {number}
	 *
	 * @memberOf Implicant
	 */
	public getCommonBits (): number {
		return this.minterms.reduce((result, minterm) => (
			result & minterm
		));
	}

	/**
	 * Returns a number representing all the uncommon bits between all minterms
	 * in this implicant.
	 *
	 * @example
	 *
	 *     new Implicant(
	 *       0b1110,
	 *       0b0111
	 *     ).getUncommonBits() === 0b1001
	 *
	 * @returns {number}
	 *
	 * @memberOf Implicant
	* */
	public getUncommonBits (): number {
		let result = 0;
		for (let i = 0; i < this.minterms.length - 1; i++) {
			const left = this.minterms[i];
			const right = this.minterms[i + 1];
			result |= (left ^ right);
		}
		return result;
	}

}
