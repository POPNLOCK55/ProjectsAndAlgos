//Remove Blanks

function removeBlanks(string) {
    var noBlanks = string.replaceAll(" ", "");
    console.log(string);
    console.log(noBlanks);
}

removeBlanks(" Pl ayTha tF u nkyM usi c ");
removeBlanks("I can not BELIEVE it's not BUTTER");

//Get Digits

function getDigits(string) {
    for (var i = 0; i < string.length; i++) {
        if (isNaN(string[i]) === false) {
            console.log(string[i])
        } else {
            continue
        }
    }
}

getDigits("abc8c0d1ngd0j0!8")
getDigits("0s1a3y5w7h9a2t4?6!8?0");

//Acronyms

function acronym(string) {
    let splitter = string.split(' ');
    let acro = ""
    for (let i = 0; i < splitter.length; i++) {
        if (splitter[i].length > 0) {
            acro += splitter[i][0].toUpperCase();
        }
    }
    console.log(acro);
}

acronym(" there's no free lunch - gotta pay yer way. ")
acronym("Live from New York, it's Saturday Night!")

//Count non-Spaces

function nonSpaces(string) {
    count = 0;
    for (var i = 0; i < string.length; i++)
        if (/\s/.test(string[i]) === false) {
            count += 1
        }
    console.log(count)
}//find a way to return the count of non-whitespace characters

nonSpaces("Honey pie, you are driving me crazy")

//Remove shorter strings

function removeShorterStrings(arr, num) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length >= num) {
            console.log(arr[i])
        } else { continue }
    }
}

removeShorterStrings(['Good morning', 'sunshine', 'the', 'Earth', 'says', 'hello'], 4)
removeShorterStrings(['There', 'is', 'a', 'bug', 'in', 'the', 'system'], 3)