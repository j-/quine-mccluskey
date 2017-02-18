import Minterm from './minterm';
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
    static canCombine(left: Implicant, right: Implicant): boolean;
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
    static getCombinedImplicant(left: Implicant, right: Implicant): Implicant;
    /**
     * Check if two implicants have the same set of minterms.
     *
     * @static
     * @param {Implicant} left
     * @param {Implicant} right
     * @returns {boolean}
     *
     * @memberOf Implicant
     */
    static isEqual(left: Implicant, right: Implicant): boolean;
    /**
     * Creates an instance of Implicant. Must be given a set of minterms.
     *
     * @param {...Minterm[]} minterms
     *
     * @memberOf Implicant
     */
    constructor(...minterms: Minterm[]);
    /**
     * Get the array of minterms that make up this implicant.
     *
     * @returns {Minterm[]}
     *
     * @memberOf Implicant
     */
    getMinterms(): Minterm[];
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
    getCommonBits(): number;
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
    getUncommonBits(): number;
    /**
     * Check if the given minterm is one of the minterms in this implicant.
     *
     * @param {Minterm} minterm
     * @returns {boolean}
     *
     * @memberOf Implicant
     */
    hasMinterm(minterm: Minterm): boolean;
}
