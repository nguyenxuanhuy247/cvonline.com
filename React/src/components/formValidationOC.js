class Validator {
    constructor(options) {
        this.options = options;
        this.formElement = this.getFormElement();
    }

    static getFormElement = () => {
        let formElement = document.querySelector(this.options.form);
        if (formElement) {
            return formElement;
        }
        return {};
    };

    static handleSubmitForm = () => {
        this.formElement.onSubmit = () => {
            
        }
    }
}
