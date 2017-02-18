import Implicant from './implicant';
/**
 * Reduce all minterms until the prime implicants have been identified.
 *
 * @param {Minterm[]} minterms
 * @param {Minterm[]} dontcares
 * @returns {Implicant[]}
 */
export declare const getPrimeImplicants: (minterms: number[], dontcares: number[]) => Implicant[];
/**
 * Determine which prime implicants have a minterm that no other prime implicant
 * has and is thus essential.
 *
 * @param {Implicant[]} implicants
 * @returns {Implicant[]}
 */
export declare const getEssentialPrimeImplicants: (implicants: Implicant[], dontcares?: number[]) => Implicant[];
