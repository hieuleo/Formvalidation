function validator (options) {
    const formElement = document.querySelector(options.form);
    if (formElement){
        options.rules.forEach( (rule) => {
            const inputElement = formElement.querySelector(rule.selector);
            if (inputElement){
                inputElement.onblur = () => {
                    errorMessage(inputElement, rule, options)
                }
                inputElement.oninput = () => {
                    errorMessage(inputElement, rule, options)
                }
            }
        })
    }
}

//hanler ERROR Message:
function errorMessage (inputElement, rule, options) {
    const errorCheck = rule.test(inputElement.value);
    const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
    if (errorCheck){
        errorElement.innerText = errorCheck;
        inputElement.parentElement.classList.add(options.classError);
    }else{
        errorElement.innerText = '';
        inputElement.parentElement.classList.remove(options.classError);
    }
}

// rule      
    // full name validator
validator.isRequired = function (selector, message) {
    return {
        selector,
        test: function (value) {
            let regex = /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
            return regex.test(value.trim()) ? undefined : message || 'Please enter this field !!.';
        }
    }
}

    // Email validator
validator.isEmail = function (selector, message) {
    return {
        selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Please enter this field !!.';
        }
    }
}

    // password validator
validator.isPassword = function (selector, number) {
    return {
        selector,
        test: function (value) {
            return value.length >= number ? undefined : `Create password (Min: ${number} character) !!.`;
        }
    }
}

    // confirm input:
validator.isConfirm = function (selector, confirm, message) {
    return {
        selector,
        test: function (value) {
            return value === confirm() ? undefined : message || 'Please enter this field !!.';
        }
    }
}