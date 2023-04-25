
import className from "classnames/bind";
import styles from "../containers/Auth/Login.module.scss";

const cx = className.bind(styles);

// Đối tượng `Validator`
const Validator = (options) => {
    var selectorRules = {};

    // Function is to get form-group
    function getParent(inputElement, formGroupSelector) {
        while (inputElement.parentElement) {
            if (inputElement.parentElement.matches(formGroupSelector)) {
                return inputElement.parentElement;
            }
            inputElement = inputElement.parentElement;
        }
    }

    // (For step 1.1.1) Function is to validate
    function validate(inputElement, rule) {
        var messageElement = getParent(inputElement, options.formGroupSelector).querySelector(options.messageSelector);

        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case "radio":
                case "checkbox":
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ":checked"));
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }

            if (errorMessage) break;
        }


        if (errorMessage) {
            messageElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(`${cx("invalid")}`);
        } else {
            messageElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove(`${cx("invalid")}`);
        }

        return !errorMessage;
    }

    // Step 1: Get form element to validate
    var formElement = document.querySelector(options.formSelector);
    if (formElement) {
        // Handle clicking button to submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Step 1.1 - Loop through each rule and validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                if (inputElement) {
                    // Step 1.1.1 - Validate each input field
                    var isValid = validate(inputElement, rule);
                }

                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === "function") {
                    var enableInputs = formElement.querySelectorAll("[name]");
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        switch (input.type) {
                            case "radio":
                                values[input.name] = formElement.querySelector(
                                    'input[name="' + input.name + '"]:checked'
                                ).value;
                                break;
                            case "checkbox":
                                if (!input.matches(":checked")) {
                                    values[input.name] = "";
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case "file":
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        };

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {
            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var messageElement = getParent(inputElement, options.formGroupSelector).querySelector(
                        options.messageSelector
                    );
                    messageElement.innerText = "";
                    getParent(inputElement, options.formGroupSelector).classList.remove(`${cx("invalid")}`);
                };
            });
        });
    }
};

// Rule definitions
// Principle of rules:
// 1. There is an error => Return error message
// 2. If valid => Returns nothing (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || "Vui lòng nhập trường này";
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "Trường này phải là email";
        },
    };
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || "Giá trị nhập vào không chính xác";
        },
    };
};

export default Validator;
