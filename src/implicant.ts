import Term from './term';

/**
 * Represents one or more combined terms.
 *
 * @class Implicant
 * @extends {Term}
 */
class Implicant extends Term {
	protected minterms: Term[] = [];

	/**
	 * Creates an instance of Implicant.
	 *
	 * @param {Term[]} minterms
	 *
	 * @memberOf Implicant
	 */
	constructor (minterms: Term[]) {
		super(
			minterms.reduce((left, right) => (
				Term.getCombinedTerm(left, right)
			)).getState()
		);
	}

}

export default Implicant;
