interface User{
    name:string,
    age:number
}
function SumofAge(user1:User,user2:User):number{
    return user1.age+user2.age
}

const age=SumofAge({
    name:"ajdlsf",
    age:17
},{
    name:"kirat",
    age:19
})

console.log(age)






// pick- pick a set of property from one type 
type User1={
    name:string,
    age:number,
    pass:string,
    username:string
}
type Updated=Pick<User1,'name'|'age'>






// Partial- make all properties of a type optional 

type UpdatedOptional=Partial<Updated>

// readonly-
type ReadUser={
    readonly name:string,
    age:number
}
// make the property name fixed, it cannot be changed after if changed it will give error 


// Records and Map

type UserAge={
    [key:string]:number
}
const user:UserAge={
    'sdjn@nd':13,
    'sndv@nf':21,
}
// Record for key value pair
type Users=Record<string,number>
// nicer way to write above code

type user2={
    name:string
}
const users=new Map<string,user2>()
// setting the key value pair
users.set('srglnf@bsdbc',{name:'kirat'})

// for getting the key value pair

console.log(users.get('srglnf@bsdbc'))


// Exclude
type Event='click'|'scroll'|'mousemove';
type ExcludeEvent=Exclude<Event,'scroll'>