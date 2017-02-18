"use strict";
/** @private @see http://stackoverflow.com/a/600306 */
var isPowerOf2 = function (x) { return x !== 0 && ((x & (x - 1)) === 0); };
/** @private */
var numeric = function (a, b) { return a - b; };
/** @private */
var isAllUnique = function (arr) { return !arr.some(function (item, i, arr) { return (item === arr[i + 1]); }); };
/**
 * An implicant contains a set of one or more minterms. All minterms must be
 * unique. The total number of minterms must be a power of two, e.g. 1, 2, 4, 8
 * etc.
 *
 * @export
 * @class Implicant
 */
var Implicant = (function () {
    /**
     * Creates an instance of Implicant. Must be given a set of minterms.
     *
     * @param {...Minterm[]} minterms
     *
     * @memberOf Implicant
     */
    function Implicant() {
        var minterms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            minterms[_i] = arguments[_i];
        }
        minterms = minterms.slice().sort(numeric);
        var length = minterms.length;
        if (length === 0) {
            throw new Error('Implicant must be initialized with minterms');
        }
        else if (!isPowerOf2(length)) {
            throw new Error("Number of minterms must be a power of 2, got " + length);
        }
        else if (length > 1 && !isAllUnique(minterms)) {
            throw new Error('Implicant must be initialized with unique set of minterms');
        }
        this.minterms = minterms;
    }
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
    Implicant.canCombine = function (left, right) {
        return isPowerOf2(
        // Compare set bits
        (left.getCommonBits() ^ right.getCommonBits()) |
            (left.getUncommonBits() ^ right.getUncommonBits()));
    };
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
    Implicant.getCombinedImplicant = function (left, right) {
        return new (Implicant.bind.apply(Implicant, [void 0].concat(left.getMinterms(), right.getMinterms())))();
    };
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
    Implicant.isEqual = function (left, right) {
        var leftMinterms = left.getMinterms();
        var rightMinterms = right.getMinterms();
        if (leftMinterms.length !== rightMinterms.length) {
            // Implicants should have the same number of minterms
            return false;
        }
        for (var i = 0; i < leftMinterms.length; i++) {
            if (leftMinterms[i] !== rightMinterms[i]) {
                // Each minterm must be identical
                return false;
            }
        }
        return true;
    };
    /**
     * Get the array of minterms that make up this implicant.
     *
     * @returns {Minterm[]}
     *
     * @memberOf Implicant
     */
    Implicant.prototype.getMinterms = function () {
        return this.minterms;
    };
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
    Implicant.prototype.getCommonBits = function () {
        return this.minterms.reduce(function (result, minterm) { return (result & minterm); });
    };
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
    Implicant.prototype.getUncommonBits = function () {
        var result = 0;
        var minterms = this.minterms;
        var length = minterms.length;
        for (var i = 0; i < length - 1; i++) {
            var left = minterms[i];
            var right = minterms[i + 1];
            result |= (left ^ right);
        }
        return result;
    };
    /**
     * Check if the given minterm is one of the minterms in this implicant.
     *
     * @param {Minterm} minterm
     * @returns {boolean}
     *
     * @memberOf Implicant
     */
    Implicant.prototype.hasMinterm = function (minterm) {
        var minterms = this.minterms;
        var length = minterms.length;
        for (var i = 0; i < length; i++) {
            if (minterms[i] === minterm) {
                return true;
            }
        }
        return false;
    };
    return Implicant;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Implicant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbGljYW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ltcGxpY2FudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsc0RBQXNEO0FBQ3RELElBQU0sVUFBVSxHQUFHLFVBQUMsQ0FBUyxJQUFjLE9BQUEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhDLENBQWdDLENBQUM7QUFFNUUsZUFBZTtBQUNmLElBQU0sT0FBTyxHQUFHLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxDQUFDO0FBRTFDLGVBQWU7QUFDZixJQUFNLFdBQVcsR0FBRyxVQUFDLEdBQWUsSUFBYyxPQUFBLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFLLE9BQUEsQ0FDN0UsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ25CLEVBRjZFLENBRTdFLENBQUMsRUFGZ0QsQ0FFaEQsQ0FBQztBQUVIOzs7Ozs7O0dBT0c7QUFDSDtJQW1FQzs7Ozs7O09BTUc7SUFDSDtRQUFhLGtCQUFzQjthQUF0QixVQUFzQixFQUF0QixxQkFBc0IsRUFBdEIsSUFBc0I7WUFBdEIsNkJBQXNCOztRQUNsQyxRQUFRLEdBQU8sUUFBUSxTQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFBLHdCQUFNLENBQWM7UUFDNUIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMs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