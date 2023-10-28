window.addEventListener("load", function () {
  // get all forms and add submit listener to them
  var forms = document.getElementsByTagName("form");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", async function (e) {
      e.preventDefault();
      var form = e.target;
      var data = new FormData(form);
      // get data-error attr of form
      var error = form.getAttribute("data-error");
      var success = form.getAttribute("data-success");
      // remove #form-response if it exists
      var formResponse = document.getElementById("form-response");
      if (formResponse) {
        formResponse.remove();
      }
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
      });

      if (response.status === 200) {
        form.insertAdjacentHTML(`afterbegin`, `<div id="form-response">${success}</div>`);
      } else {
        form.insertAdjacentHTML(`afterbegin`, `<div id="form-response">${error}</div>`);
      }
    });
  }
});
