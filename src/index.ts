import Term from './term';
import TermColumn from './term-column';
import Implicant from './implicant';

/**
 * Gets all prime implicants from a given list of terms.
 *
 * @param {Term[]} terms
 * @returns {Implicant[]}
 */
export const getPrimeImplicants = (terms: Term[]): Implicant[] => {
	const result = [];
	let column, implicants;
	do {
		column = new TermColumn(terms);
		implicants = column.getImplicants();
		result.push(...implicants.prime);
		terms = implicants.combined;
	} while (terms.length > 0);
	return result;
};
