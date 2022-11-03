const inputs = Array.from(document.querySelectorAll(":is(input, select, textarea)"));
const form = document.querySelector("form")
console.log(inputs.map(x => x.id))

function isBetween(start, end, value) {
    return (start <= value && value <= end);
}

const validFunctions = {
    1: (value) => (!isNaN(value) && Number(value) <= 150 && Number(value) > 0),
    3: (pesel) => {
        const age = Number(document.querySelector("#age").value)
        const year = new Date().getFullYear() - age;
        // const 
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
            {
                addOn = x.add;
            }
        })



        console.log(year, addOn, isBetween(2000, 2099, year))
    }
}

validFunctions[3]("03310607376");
function validateForm() {
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})

