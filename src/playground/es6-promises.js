// Promises are asycronous 
//once the promise function is done running it will call resolve it passed or reject if failed.

const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve({
            name: 'Ilan',
            age: 28
        });
        resolve('this is my other resolved data'); // this will be ignored once a promise is resolved or rejected it thats it. It only resolves or rejects a single time
        // reject('something went wrong') // will give us an error in the console with the message
    }, 5000);
});

console.log('before');

// promise.then((data)=>{
//     console.log('1', data);
// }).catch((error)=>{
//     console.log(error)
// }); 
//allows us to register a callback function when the promise resolves. I we will have access to the promise resolved data
// if promise is rejected it will create an error but catch catches the error allowing us to use the reject data and do something about it.


// promise.then((data)=>{
//     console.log('1', data);
// }, (error)=>{
//     console.log(error)
// }); 
// or instead of using the catch method a promise can take another callback function as a 2nd arguement which would act like the catch method preventing the error and doing something about it.


//promise chaining
promise.then((data)=>{
    console.log('1', data);

    return  new Promise((resolve, reject)=>{ //can return new promises and have a chaining case
        setTimeout(()=>{
    
            resolve('this is my other promise');
        }, 5000);
    })
}).then((str)=>{
    console.log('does this run?', str)
}).catch((error)=>{
    console.log(error)
}); 
//if the promise resolves the first then() will fire 1st then the next then()


console.log('after');

//console.log before and after shows up first then the promise shows because the promise is async it will allow others to run without it will it will resolve itself in its own time