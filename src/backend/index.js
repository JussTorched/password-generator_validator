function passwordSee() {
    const element = document.getElementById('passwordInput');
    const button = document.getElementById('passwordSee');
    if (element.type === 'password') {
        element.type = 'text';
        button.innerHTML = 'Hide password';
    } else if (element.type === 'text') {
        element.type = 'password';
        button.innerHTML = 'See password';
    }
}

function validate(event) {
    const mode = sessionStorage.getItem('mode');

    const key = event.key;
    const inputValue = document.getElementById('passwordInput');
    const inputError = document.getElementById('inputError');

    if (key.toLowerCase() === 'enter' && inputValue.value.length) {
        if (!mode) {
            inputError.innerHTML = '<u>No Mode selected</u>';
            inputError.style.color = 'red';
            inputError.style.fontSize = '25px';
            return;
        } else if (mode === 'validate') {

            function lowercase(str) {
                if (str.toLowerCase() == str) return true;
            }
            const specialChar = /[-!$%^&*()_+|\\~=`{}[:;<>?,.@#\]]|\d/g;

            if (inputValue.value.length < 6) {
                inputError.innerHTML = '<u>Too Short</u>';
                inputError.style.color = 'red';
                inputError.style.fontSize = '25px';
                return;
            } else {
                inputError.innerHTML = '<u>Valid</u>';
                inputError.style.color = 'green';
                inputError.style.fontSize = '25px';
            }
            if (lowercase(inputValue.value) == true) {
                inputError.innerHTML = '<u><b>1</b> lowercase & uppercase needed</u>';
                inputError.style.color = 'red';
                inputError.style.fontSize = '25px';
                return;
            } else {
                inputError.innerHTML = '<u>Valid</u>';
                inputError.style.color = 'green';
                inputError.style.fontSize = '25px';
            }
            if (!specialChar.test(inputValue.value)) {
                inputError.innerHTML = '<u>Must include atleast <b>1</b> number or special character</u>';
                inputError.style.color = 'red';
                inputError.style.fontSize = '25px';
                return;
            } else {
                inputError.innerHTML = '<u>Valid</u>';
                inputError.style.color = 'green';
                inputError.style.fontSize = '25px';
            }

        }
    }
}

function validateMode() {
    const element = document.getElementById('validation');
    const mode = document.getElementById('modeShow');

    const inputValue = document.getElementById('passwordInput');
    inputValue.value = '';
    inputValue.removeAttribute('readonly');

    mode.innerHTML = element.innerHTML;
    sessionStorage.setItem('mode', 'validate');
    mode.innerHTML = '';
    const valButton = document.getElementById('validation');
    const genButton = document.getElementById('generation');
    genButton.style.fontWeight = 'initial';
    valButton.style.fontWeight = 'bolder';
}

async function generateMode() {
    const inputValue = document.getElementById('passwordInput');
    const inputError = document.getElementById('inputError');
    function randomizer(string) {
        const randomizer = Math.floor(Math.random() * (string.length - 1) + 1);
        const randomizedArray = string[randomizer];
        return randomizedArray;
    }
    function randomize(string, max) {
        const array = [];
        for (let i = 0; i < string.length; i++) {
            array.push(randomizer(string));
            if (array.length == string.length) {
                const randomizedString = array.join('').toString();
                if (!max) {
                    return randomizedString;
                } else {
                    return randomizedString.slice(0, max);
                }
            }
        }
    }
    const randomChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()_-+=[]{}\\|;:\'"/?.>,<';


    inputValue.setAttribute('readonly', true);
    inputValue.value = randomize(randomChar, 8);

    inputError.innerHTML = '<u>Success, Copied To Clipboard</u>';
    inputError.style.color = 'green';
    inputError.style.fontSize = '25px';

    await navigator.clipboard.writeText(inputValue.value).catch(error => {
        console.log(error);
    });

    const element = document.getElementById('generation');
    const modeName = document.getElementById('modeShow');

    modeName.innerHTML = element.innerHTML;
    sessionStorage.setItem('mode', 'generate');
    modeName.innerHTML = '';
    const genButton = document.getElementById('generation');
    const valButton = document.getElementById('validation');
    genButton.style.fontWeight = 'bolder';
    valButton.style.fontWeight = 'initial';

}