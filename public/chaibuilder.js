const formHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const form = e.target;
  const data = new FormData(form);
  const formResponse = form.querySelector(".form-response");
  if (formResponse) formResponse.remove();

  fetch(form.action, {
    method: form.method,
    body: data,
  })
    .then((response) => {
      if (response.status === 200) {
        formResponse.innerHTML = form.getAttribute("data-success");
      } else {
        formResponse.innerHTML = form.getAttribute("data-error");
      }
    })
    .catch((error) => {
      formResponse.innerHTML = form.getAttribute("data-error");
    });
  return false;
};
const addFormEvents = () => {
  // get all forms and add submit listener to them
  const forms = document.getElementsByTagName("form");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", formHandler);
  }
};

if (document.readyState === "complete") {
  addFormEvents();
} else {
  document.addEventListener("load", addFormEvents);
}
