const Emailpattern =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const passwordPatterns =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/;

const isEmailValid = (email = "taufikisalm@gmail.com") => {
  return Emailpattern.test(email.toLowerCase());
};

const userNameValidator = (userName = "taufik") => {
  if (userName.length >= 5 && userName.length <= 20) {
    return true;
  } else {
    return false;
  }
};

const passwordisValid = (password) => {
  return passwordPatterns.test(password);
};

export { isEmailValid, userNameValidator ,passwordisValid};
