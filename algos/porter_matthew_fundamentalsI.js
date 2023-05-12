//Seting and Swapping
let myNumber = 42;
let temp = null
let myName = "Matthew";

temp = myNumber
myNumber = myName;
myName = temp
console.log(myNumber, myName)

//Print -52 to 1066
let num = -52
for (var i = num; i <= 1066; i++ ) {
    console.log(i);
}

//Don't worry, be happy

function beCheerful() {
    var greeting = "good morning!"
    console.log(greeting.repeat(98))
}
console.log(beCheerful())

//Multiples of three, but not all

for (var i = -300; i <= 0; i++){
    if (i === -6 || i === -3){
        continue
    }
    console.log(i)
}

//Printing integers with While
let i = 1999;
while (i < 5280){
    i++
    console.log(i)
}

//You say it's your Birthday
function bday(num1, num2){
    if(num1 == 5 && num2 == 6 || num1 === 6 && num2 === 5){
        console.log("How did you know?!")
    }else (console.log("Just another day..."))
}
console.log(bday(19, 11))
console.log(bday(6, 5))
console.log(bday(5, 6))

//Leap Year
function leapYear(year){
    if(year % 100 === 0){
        console.log("Just another year...")
    }else if (year % 4 === 0){
        console.log("leaping the year!")
    }else if(year % 400 === 0){
        console.log("Leaping the year!")
    }else(console.log("Just another year..."))
}

console.log(leapYear(2000))

//Print and Count

var five = 5;
for (var i = 512; )
