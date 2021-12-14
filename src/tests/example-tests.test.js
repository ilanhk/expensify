// jest documentation (testing REACT apps): https://jestjs.io/docs/26.x/getting-started 
// when run jest it will look for files with this extention '.test.js'
// to run test in watch mode run 'yarn run test -- --watch' to make sure --watch runs in the script and not yarn

//Example test:
const add = (a,b)=> a+b;
const generateGreating = (name = 'Anonymous')=>`Hello ${name}`;

test('should add two numbers', ()=>{
    const result = add(3,4);

    // if(result !== 7){
    //     throw new Error(`You added 4 and 3. The result was ${result}. Expected 7.`)
    // }

    //Assertions see if 2 values are the same
    expect(result).toBe(7); //same as way to do the if statement above. check jest docs: https://jestjs.io/docs/26.x/using-matchers 

}); 
// in test() always passing a string(explains what the test does) as the 1st argument and a function as a 2nd argument (to run test cases for our code) 

test('Should add a name to the greating', ()=>{
    const result = generateGreating('Bob');
    expect(result).toBe('Hello Bob')
});

test('Should generate greeting for no name', ()=>{
    const result = generateGreating();
    expect(result).toBe('Hello Anonymous')
});