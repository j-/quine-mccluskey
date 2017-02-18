"use strict";
var implicant_1 = require("./implicant");
/** @private */
var removeImplicant = function (implicants, toRemove) {
    for (var i = 0; i < implicants.length; i++) {
        if (implicant_1.default.isEqual(implicants[i], toRemove)) {
            implicants.splice(i--, 1);
        }
    }
};
/** @private */
var addImplicant = function (implicants, toAdd) {
    for (var i = 0; i < implicants.length; i++) {
        if (implicant_1.default.isEqual(implicants[i], toAdd)) {
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
exports.getPrimeImplicants = function (minterms, dontcares) {
    var primeImplicants = [];
    // Start with the set of all minterms
    // Convert them to size 1 implicants
    var implicants = minterms.concat(dontcares).map(function (m) { return new implicant_1.default(m); });
    // While there is something to check
    while (implicants.length) {
        // Assume that all the implicants we're checking are prime
        var iterPrimes = implicants.slice();
        // Nothing has been combined yet
        var iterCombined = [];
        // For all implicants in this list
        for (var i = 0; i < implicants.length; i++) {
            // For all implicants below this one
            for (var j = i; j < implicants.length; j++) {
                var left = implicants[i];
                var right = implicants[j];
                if (!implicant_1.default.canCombine(left, right)) {
                    // Cannot combine. Try the next pair.
                    continue;
                }
                // These implicants cannot be considered prime
                removeImplicant(iterPrimes, left);
                removeImplicant(iterPrimes, right);
                // Add the newly combined implicant to the iteration results
                var combined = implicant_1.default.getCombinedImplicant(left, right);
                addImplicant(iterCombined, combined);
            }
        }
        primeImplicants.push.apply(primeImplicants, iterPrimes);
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
exports.getEssentialPrimeImplicants = function (implicants, dontcares) {
    if (dontcares === void 0) { dontcares = []; }
    return (implicants.filter(function (candidate) { return (
    // Only one of the minterms needs to be unique
    // for this implicant to be considered essential
    candidate.getMinterms().some(function (minterm) { return (
    // We care about this minterm, and
    dontcares.indexOf(minterm) === -1 &&
        // it is unique to this candidate
        implicants.every(function (other) { return (
        // This implicant is the candidate, or
        candidate === other ||
            // it does not contain the given minterm
            !other.hasMinterm(minterm)); })); })); }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHlDQUFvQztBQUVwQyxlQUFlO0FBQ2YsSUFBTSxlQUFlLEdBQUcsVUFBQyxVQUF1QixFQUFFLFFBQW1CO0lBQ3BFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLG1CQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUVGLGVBQWU7QUFDZixJQUFNLFlBQVksR0FBRyxVQUFDLFVBQXVCLEVBQUUsS0FBZ0I7SUFDOUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsbUJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUM7UUFDUixDQUFDO0lBQ0YsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUY7Ozs7OztHQU1HO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxVQUFDLFFBQW1CLEVBQUUsU0FBb0I7SUFDM0UsSUFBTSxlQUFlLEdBQWdCLEVBQUUsQ0FBQztJQUN4QyxxQ0FBcUM7SUFDckMsb0NBQW9DO0lBQ3BD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