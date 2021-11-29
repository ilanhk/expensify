//OBJECT Destructuring

// const person = {
//     name: 'Ilan',
//     age: 28,
//     location: {
//         city: 'Hong Kong SAR',
//         temperature: 30
//     }
// };

// const {name='Wise Guy', age} = person //this is how to destructure an object and use name and age as their own variables
// // 'Wise Guy' is the name default if there is no name given.

// // const {name: firstname ='Wise Guy', age} = person -- you can also change the variable name and give it a default at the same time. name is changed to firstname and given a default 'Wise Guy'

// console.log(`${name} is ${age} years old`)

// const {city, temperature: temp} = person.location; // you can also rename a variable from an object. ex temperature is now temp.
// if (city && temp){
//     console.log(`It's ${temp} degrees celcius in ${city}`)
// };

// const book = {
//     title: 'Art of War',
//     author: 'Sun Tzu',
//     publisher: {
//         // name: 'Pengiun',
//     }
// };


// const {name: publisherName = 'Self-Published'} = book.publisher
// console.log(publisherName);

//----------------------------------------------------------------------------------------------------------

//ARRAY Destructuring\

const address = ['32 Ron Road', 'Chicago', 'Illinois', '54678'];

// const [street, city, state , zip] = address; // this is how you destructure an array. Name them by array position.

const [, , state] = address; // if you dont want to give variables to all items in the array still use comas

// const [, , state ='Virginia'] = address; // this is how you can create defaults

console.log(`You are in  ${state}.`)


const item =['coffee(hot)', '$2', '$3.50', '$3.75']

const [coffee_hot , , medium_price, , coffee_cold ='coffee(cold)'] = item;
console.log(`A medium ${coffee_cold} costs ${medium_price}.`)
