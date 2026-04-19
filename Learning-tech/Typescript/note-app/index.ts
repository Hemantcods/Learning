function greet(name:string) {
    console.log(`hello ${name}`)
}

greet("hemant")


function sum(a:number,b:number){
    return a+b
}

function sum2(a:number,b:number):number{   //we can define the output type like that
    return a+b
}
// writing a function that takes input of a function and execute the function after 1 second

function delayedCall(fn:()=>void) {
    setTimeout(fn,1000)   
}



// types 
type UserType={
    name:string,
    age:number
}

// interfaces 
interface UserInterface{
    name:string,
    age:number
}

// types extras 

// intersection
type Emmployee={
    name:string,
    startDate:Date
}
type Manager={
    name:string,
    department:string
}

type TeamMember=Emmployee&Manager
// it has name , startDate , department


// union
type StringORNumber=string|number

// it can be nuber or string 


// interface implementation in class
interface User{
    name:string
    greet():string
}
class people implements User{
    name: string = "Hemant";
    greet(){
        return `hello ${this.name}`
    }
}
const obj:object=people

// doing intersection in interfaces by using extends
interface x {
    a:string,
    b:number
}
interface y extends x{
    c:string
}
