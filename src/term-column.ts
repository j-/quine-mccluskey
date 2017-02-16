import Term from './term';
import Implicant from './implicant';

type TermMarker = {
	term: Term,
	marked: boolean,
}

/**
 * Allows for the combination of a set of terms.
 *
 * @class TermColumn
 */
class TermColumn {
	protected terms: Term[] = [];

	/**
	 * Checks if an item exists in a given array. If not, it is pushed into that
	 * array.
	 *
	 * @static
	 * @param {Term[]} terms
	 * @param {Term} item
	 * @returns
	 *
	 * @memberOf TermColumn
	 */
	static ensureExists (terms: Term[], item: Term) {
		const contains = terms.some((other) => (
			// These terms are equal
			Implicant.countDifferences(item, other) === 0
		));
		if (contains) {
			// This item is already in the term list.
			// Exit early.
			return;
		}
		terms.push(item);
	}

	/**
	 * Creates an instance of TermColumn.
	 *
	 * @param {Term[]} terms
	 *
	 * @memberOf TermColumn
	 */
	constructor (terms: Term[]) {
		this.terms = terms;
	}

	/**
	 * The number of terms in this column.
	 *
	 * @readonly
	 *
	 * @memberOf TermColumn
	 */
	public get length () {
		return this.terms.length;
	}

	/**
	 * Try and combine all the terms in this column. Return a list of all the
	 * newly combined terms. Also return a list of the terms which could not be
	 * combined -- the prime implicants.
	 *
	 * @returns {{ prime: Term[], combined: Implicant[] }}
	 *
	 * @memberOf TermColumn
	 */
	public getImplicants (): { prime: Term[], combined: Implicant[] } {
		const combined: Implicant[] = [];
		const { terms, length } = this;
		// Decorate the terms with a marker
		const list: TermMarker[] = terms.map((term) => (<TermMarker>{
			term: term,
			marked: false,
		}));
		// Iterate all terms
		for (let i = 0; i < length; i++) {
			const left = list[i];
			// Iterate all other terms we haven't compared yet
			for (let j = i + 1; j < length; j++) {
				const right = list[j];
				const canCombine = Implicant.canCombine(left.term, right.term);
				if (!canCombine) {
					// These terms cannot be combined.
					// Keep looking.
					continue;
				}
				TermColumn.ensureExists(
					combined,
					Implicant.getCombinedTerm(left.term, right.term)
				);
				left.marked = true;
				right.marked = true;
			}
		}
		const prime = list
			.filter((item) => !item.marked)
			.map((item) => item.term);
		return { prime, combined };
	}
}

export default TermColumn;
