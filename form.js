const oppoStatus = [
    {
        "K_OPPO_STATUS": 1,
        "STATUS": "1. Initial Contact",
        "SUCCESS": 0
    },
    {
        "K_OPPO_STATUS": 2,
        "STATUS": "2. Demonstration",
        "SUCCESS": 25
    },
    {
        "K_OPPO_STATUS": 3,
        "STATUS": "3. Proposal",
        "SUCCESS": 50
    },
    {
        "K_OPPO_STATUS": 4,
        "STATUS": "4. Negotiation",
        "SUCCESS": 75
    },
    {
        "K_OPPO_STATUS": 5,
        "STATUS": "5. Order",
        "SUCCESS": 100
    }
];

const FormComponent = class {
    constructor() {
        // Get references to the form elements
        this.selectEl = document.querySelector('select[name="status"]');
        this.inputEl = document.querySelector('input[name="success"]');
        this.outputEl = document.querySelector('.output');
    }
    start() {
        // Populate the select options with the oppoStatus array
        for (const status of oppoStatus) {
            const optionEl = document.createElement('option');
            optionEl.value = status.K_OPPO_STATUS;
            optionEl.textContent = status.STATUS;
            this.selectEl.appendChild(optionEl);
        }
        // Set the initial success value
        this.setSuccessValue();

        // Add event listeners for select and input changes
        this.selectEl.addEventListener('change', () => {
            this.setSuccessValue();
        });

        this.inputEl.addEventListener('input', () => {
            // Clamp the input value to the min and max values
            const min = parseInt(this.inputEl.min);
            const max = parseInt(this.inputEl.max);
            let value = parseInt(this.inputEl.value);

            if (value < min) {
                value = min;
            } else if (value > max) {
                value = max;
            }

            this.inputEl.value = value;
        });

        // Add event listener for form submit
        const formEl = document.querySelector('form');
        formEl.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Create a JSON object from the form values
            const outputObj = {
                status: parseInt(this.selectEl.value),
                success: parseInt(this.inputEl.value)
            };
            const jsonData = JSON.stringify(outputObj);

            // Update the output element with the JSON string
            this.outputEl.textContent = jsonData;
        });

    }

    setSuccessValue() {
        // Get the selected option value and set the input value accordingly
        const status = parseInt(this.selectEl.value);
        const success = oppoStatus.find((s) => s.K_OPPO_STATUS === status).SUCCESS;
        this.inputEl.value = success;
    }
}

const fc = new FormComponent();
fc.start();