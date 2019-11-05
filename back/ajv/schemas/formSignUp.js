module.exports = {
  type: "object",
  maxProperties: 4,
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
    pseudo: {
      type: "string",
      minLength: 3,
      errorMessage: {
        minLength: "Your pseudo must contain at least 3 characters"
      }
    },
    password: {
      type: "string",
      pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$",
      errorMessage: {
        pattern:
          "Your new password must contain at least 8 characters, 1 number, 1 lowercase character (a-z) and 1 uppercase character (A-Z)"
      }
    },
    passwordBis: {
      type: "string",
      const: {
        $data: "1/password"
      },
      errorMessage: {
        const: "Password confirmation doesn't match the password"
      }
    }
  }
};
