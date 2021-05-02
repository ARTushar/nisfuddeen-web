export {}

const alias = {
    "uncle": 'a',
    'aunt': 'a'
}



const val = 'b';

console.log(Object.keys(alias).find(key => alias[key] === val));

// getVal(relation, rel, alias);