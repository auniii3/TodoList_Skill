function* gen1(){
    console.log(yield 1);
    console.log(yield 2);
    console.log(yield 3);
}

const iterator = gen1();

console.log(iterator.next('a').value);
console.log(iterator.next('b').value);
console.log(iterator.next('c').value);

let myArra = [1,2];

myArra.customProperty = true;

myArra.forEach(el=>{
    console.log(el);
})

for(let i =0 ; i<myArra.length;i++){
    const el  = myArra[i];
    console.log(el)
}

async function apiCall(){
    return new Promise(resolve => {
        setTimeout(() => {resolve('b')},50)
    })
}

async function logger(){
    setTimeout(()=>console.log('a'),10);
    console.log(await apiCall());
    console.log('c');
}

logger();

console.log(typeof TEST_ENV);