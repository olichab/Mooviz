module.exports = {
  type: "object",
  maxProperties: 5,
  required: ["email", "pseudo"],
  properties: {
    email: {
      type: "string",
      format: "email",
      minLength: 1,
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
    oldPassword: {
      type: "string"
    },
    newPassword: {
      type: "string"
    },
    confirmNewPassword: {
      type: "string",
      const: {
        $data: "1/newPassword"
      },
      errorMessage: {
        const: "Password confirmation doesn't match the new password"
      }
    }
  },
  if: {
    properties: {
      oldPassword: {
        not: {
          const: ""
        }
      }
    }
  },
  then: {
    properties: {
      newPassword: {
        pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$",
        not: {
          const: {
            $data: "1/oldPassword"
          }
        },
        errorMessage: {
          not: "New password must be different from the old password",
          pattern:
            "Your new password must contain at least 8 characters, 1 number, 1 lowercase character (a-z) and 1 uppercase character (A-Z)"
        }
      }
    }
  },
  else: {
    if: {
      properties: {
        newPassword: {
          not: {
            const: ""
          }
        }
      }
    },
    then: {
      properties: {
        oldPassword: {
          minLength: 1,
          errorMessage: {
            minLength: "You must fill in the old password field"
          }
        }
      }
    }
  }
};
