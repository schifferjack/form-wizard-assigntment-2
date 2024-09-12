## functions used

# goNext()

- First it checks the current formgroup. eg: step 1, step 2 or step 3
- If the required input are filled, simulate the async progress and disable the next button. once its done, it will add the count for the current step
- If empty or it doesn't fit the validation rule, it will consider it as touched and an error message will appear below the input

# performAsyncCheck()

- to simulate the call to api while validating

# getCurrentFormGroup()

- for Material template, index is sent instead of currentStep value due to the stepper class providing an accurate area of the input group.
- for html + tailwind, since it doesn't have the stepper class, code needs to rely on the currentStep value to get the area.

# goBack()

- self explanatory. It goes back by reducing the currentStep value by 1

# markFormGroupTouched()

- Get the group formName of the current step. This only runs when submitting or when pressing next

# checkIfEmailExists(value)

- a mock data of all email existing is provided
- runs a function that returns true if value matches the list

# createValidator()

- uses the AsyncValidatorFn class for bonus requirement
- accepts return value of email service as argument.
- returns an object of value into the form validation object for email
