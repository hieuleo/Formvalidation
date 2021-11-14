    var saveRules = {}
function validator (options) {
    const formElement = document.querySelector(options.form);
    if (formElement){
        // handle onsubmit:
        formElement.onsubmit = function (event) {
            var isFormValid = false;
            event.preventDefault();

            options.rules.forEach( (rule) => {
                const inputElement = formElement.querySelector(rule.selector);
                errorMessage(inputElement, rule, options);
                const isErrorValid = errorMessage(inputElement, rule, options);
                if (isErrorValid) {
                    isFormValid = true;
                }
            })
            
            //handler outputs: ---> return server:
            if (!isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    const enableInput = formElement.querySelectorAll('[name]:not([disabled])')
                    const enableInputArray = Array.from(enableInput).reduce(function(result, element) {
                        result[element.name] = element.value;
                        return result;
                    },{})
                    options.onSubmit(enableInputArray)
                }else {
                    formElement.submit();
                }
            }
        }

        options.rules.forEach( (rule) => {
            //rules:
            if (Array.isArray(saveRules[rule.selector])){
                saveRules[rule.selector].push(rule.test);
            }else {
                saveRules[rule.selector] = [rule.test];
            }

            // handler event:
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

//get parentElement:
function getParentElement (element, selector) {
    while (element.parentElement){
        if (element.parentElement.matches(selector)){
            return element.parentElement;
        }
        element = element.parentElement;
    }
}


//hanler ERROR Message:
function errorMessage (inputElement, rule, options) {
    const elementParent = getParentElement(inputElement, options.selectorParent);
    const errorElement = elementParent.querySelector(options.errorSelector);
    const rules = saveRules[rule.selector];
    var errorCheck;

    for (let i = 0; i < rules.length; i++) {
        errorCheck = rules[i](inputElement.value);
        if (errorCheck) break;
    }

    if (errorCheck){
        errorElement.innerText = errorCheck;
        elementParent.classList.add(options.classError);
    }else{
        errorElement.innerText = '';
        elementParent.classList.remove(options.classError);
    }

    return !!errorCheck;
}

// rule      
    // full name validator
validator.isFullName = function (selector, message) {
    return {
        selector,
        test: function (value) {
            let regex = /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
            return regex.test(value.trim()) ? undefined : message || 'Please enter this field !!.';
        }
    }
}

    // Required validator
validator.isRequired = function (selector, message) {
    return {
        selector,
        test: function (value) {
            return value ? undefined : message || 'Please enter this field !!.';
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