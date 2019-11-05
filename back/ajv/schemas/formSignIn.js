module.exports = {
  type: "object",
  maxProperties: 2,
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      minLength: 1,
      format: "email",
      errorMessage: {
        minLength: "You must fill in the email field",
        format: "Your email is incorrectly formatted"
      }
    },
    password: {
      type: "string",
      minLength: 1,
      errorMessage: {
        minLength: "You must fill in the password field",
      }
    }
  }
};
