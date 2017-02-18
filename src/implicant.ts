import Minterm from './minterm';

/** @private */
const log2 = (x: number): number => Math.log(x) / Math.log(2);

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
		return log2(
			// Compare set bits
			(left.getCommonBits() ^ right.getCommonBits()) |
			(left.getUncommonBits() ^ right.getUncommonBits())
		) % 1 === 0;
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
