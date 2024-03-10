const inputs = document.querySelectorAll(".body input");

console.log(inputs);

function enableInputs() {
    inputs.forEach((input) => {
        input.disabled = false;
    });
}
function saveData() {
    inputs.forEach((input) => {
        input.disabled = true;
    });
}
