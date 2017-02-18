import Minterm from './minterm';
import Implicant from './implicant';

/** @private */
const removeImplicant = (implicants: Implicant[], toRemove: Implicant) => {
	for (let i = 0; i < implicants.length; i++) {
		if (Implicant.isEqual(implicants[i], toRemove)) {
			implicants.splice(i--, 1);
		}
	}
};

/** @private */
const addImplicant = (implicants: Implicant[], toAdd: Implicant) => {
	for (let i = 0; i < implicants.length; i++) {
		if (Implicant.isEqual(implicants[i], toAdd)) {
			return;
		}
	}
	implicants.push(toAdd);
};

/**
 * Reduce all minterms until the prime implicants have been identified.
 *
 * @param {Minterm[]} minterms
 * @param {Minterm[]} dontcares
 * @returns {Implicant[]}
 */
export const getPrimeImplicants = (minterms: Minterm[], dontcares: Minterm[]): Implicant[] => {
	const primeImplicants: Implicant[] = [];
	// Start with the set of all minterms
	// Convert them to size 1 implicants
	let implicants = [...minterms, ...dontcares].map((m) => new Implicant(m));
	// While there is something to check
	while (implicants.length) {
		// Assume that all the implicants we're checking are prime
		const iterPrimes: Implicant[] = [...implicants];
		// Nothing has been combined yet
		const iterCombined: Implicant[] = [];
		// For all implicants in this list
		for (let i = 0; i < implicants.length; i++) {
			// For all implicants below this one
			for (let j = i; j < implicants.length; j++) {
				const left = implicants[i];
				const right = implicants[j];
				if (!Implicant.canCombine(left, right)) {
					// Cannot combine. Try the next pair.
					continue;
				}
				// These implicants cannot be considered prime
				removeImplicant(iterPrimes, left);
				removeImplicant(iterPrimes, right);
				// Add the newly combined implicant to the iteration results
				const combined = Implicant.getCombinedImplicant(left, right);
				addImplicant(iterCombined, combined);
			}
		}
		primeImplicants.push(...iterPrimes);
		implicants = iterCombined;
	}
	return primeImplicants;
};

/**
 * Determine which prime implicants have a minterm that no other prime implicant
 * has and is thus essential.
 *
 * @param {Implicant[]} implicants
 * @returns {Implicant[]}
 */
export const getEssentialPrimeImplicants = (implicants: Implicant[], dontcares: Minterm[] = []): Implicant[] => (
	implicants.filter((candidate) => (
		// Only one of the minterms needs to be unique
		// for this implicant to be considered essential
		candidate.getMinterms().some((minterm) => (
			// We care about this minterm, and
			dontcares.indexOf(minterm) === -1 &&
			// it is unique to this candidate
			implicants.every((other) => (
				// This implicant is the candidate, or
				candidate === other ||
				// it does not contain the given minterm
				!other.hasMinterm(minterm)
			))
		))
	))
);
