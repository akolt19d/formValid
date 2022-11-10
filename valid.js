const inputs = Array.from(document.querySelectorAll(":is(input, select, textarea)"));
const form = document.querySelector("form")
const errorDiv = document.querySelector("#error")

function isBetween(start, end, value) {
    return (start <= value && value <= end);
}

let errorIndex = 0;

function validateForm() {
    const validFunctions = {
        1: (value) => (!isNaN(value) && Number(value) <= 150 && Number(value) > 0),
        3: (pesel) => {
            const age = Number(document.querySelector("#age").value)
            const year = new Date().getFullYear() - age;
            const peselMonth = pesel.slice(2, 4)
            const gender = Number(document.querySelector("#gender").value)
            const peselGender = pesel.slice(-2, -1)
            const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1]
            let addOn = 0;
            const ranges = [
                {
                    range: [1800, 1899],
                    add: 80
                },
                {
                    range: [2000, 2099],
                    add: 20
                },
                {
                    range: [2100, 2199],
                    add: 40
                },
                {
                    range: [2200, 2299],
                    add: 60
                },
                {
                    range: [1900, 1999],
                    add: 0
                }
            ]
    
            ranges.forEach(x => {
                if(isBetween(x.range[0], x.range[1], year))
                    addOn = x.add;
            })
            
            let birthMonth = Number(peselMonth) - addOn
            
            if(!(birthMonth >= 1 && birthMonth <= 12))
            return false;
            
            if(!(peselGender % 2 == gender))
            return false;
            
            let sum = 0;
            pesel.split("").map(x => Number(x)).forEach((num, i) => {
                sum += num * weights[i]
            })
            
            if(!(String(sum)[String(sum).length - 1] == "0"))
                return false;
    
            return true;
        },
        6: (value) => {
            value = value.toLowerCase();
            const regex = /[\d]{1}[a-z]{1}/g
            if(regex.test(value))
                return true
            else return false
        },
        10: (value) => {
            const regex = /[\d]{6}[\\]{1}[\d]{4}/g
            if(regex.test(value))
                return true
            else return false
        },
    }
    
    let flags = {};
    
    inputs.forEach((input, i) => {
        if(validFunctions[i])
            flags[i] = validFunctions[i](input.value)
    })
    
    let fin = true;
    Object.entries(flags).forEach(entry => {
        if(!entry[1])
        {
            errorIndex = errorIndex == 0 ? Number(entry[0]) : errorIndex
            fin = false
        }
    })

    return fin
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(validateForm())
        error.innerHTML = "Formularz poprawny"
    else {
        error.innerHTML = `Formularz błędny.<br>Błąd w podanym polu: ${inputs[errorIndex].placeholder}`
        errorIndex = 0;
    }
})

