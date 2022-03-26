import * as _nerdamer from 'nerdamer/all';
import {patch_unicorn} from "./stackoverflow";

patch_unicorn(); // add string.formatUnicorn

export let nerdamer = _nerdamer;

export function round(n, d) {
    const f = 10 ** d;
    return Math.round(n * f) / f;
}

export function int(str) {
    return +str;
}

// skip 'e' and 'i'!
const letters = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

function empty_string_to_undefined(val) {
    return val === '' ? undefined : val;
}

/**
 *
 * @param {Object} args
 * @param {array} rules
 * @param {int} r - rounding to n digits
 * @return {*}
 */
export function magic(args, rules, r = 2) {

    let idx = 0;

    let reverse = {};

    for (let [key, value] of Object.entries(args)) {
        // replace undefined with a letter
        args[key] = empty_string_to_undefined(value) ?? letters[idx++];

        // includes ignorable 'value's, but useful 'letter's
        reverse[args[key]] = key;
    }

    let equations = rules.map(rule => rule.formatUnicorn(args));

    let solutions = nerdamer.solveEquations(equations);

    for (let [key, value] of solutions) {
        args[reverse[key]] = round(value, r);
    }

    // args is now modified.
    return args;
}

export async function amagic(args, rules, r = 2) {
    return magic(args, rules, r);
}