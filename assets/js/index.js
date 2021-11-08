// hàm validator (viết hoa vì muốn đưa nó về la một đối tượng contructer function())
function validator(options) {
    const formELement = document.querySelector(options.form);

    //function handler validator ERROR:
    function validate(inputElement, rule) {
        const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        const errorMessage = rule.test(inputElement.value);
            if (errorMessage) {
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('invalid')
            }else {
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid')
            }
    }

    // EVEN onblur elements input:
    if (formELement){
        options.rules.forEach(rule => {
            const inputElement = formELement.querySelector(rule.selector);
            if (inputElement){
                // handler onblur
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // handler oninput
                inputElement.oninput =  function () {
                    const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    inputElement.parentElement.classList.remove('invalid')
                    errorElement.innerText = '';

                }
            }
        });
    }
}


// function rules 
    // fullname
validator.isRequired = function (selector) {
    return {
        selector,
        test: function (value) {
            return value.trim() ? undefined : 'vui lòng nhập trường này!!'
        }
    }
}

    // Email
validator.isEmail = function (selector) {
    return {
        selector,
        test: function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)  ? undefined : 'Email address is not valid'
        }
    }
}

    // Passwork:
validator.password = function (selector, number) {
    return {
        selector,
        test: function (value) {
            return value.length >= number ? undefined : `Create password (Min: ${number} character)`;
        }
    }
}