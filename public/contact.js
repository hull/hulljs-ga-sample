// Example starter JavaScript for disabling form submissions if there are invalid fields
// Based off https://github.com/twbs/bootstrap/tree/master/site/content/docs/4.3/examples/checkout
(function () {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        // If you have a CORS enabled endpoint, you can use
        // formData and send a POST
        const formData = {};
        let formDataQueryString = "";
        for (const key in form.elements) {
          if (form.elements.hasOwnProperty(key)) {
            const elmt = form.elements[key];
            formData[elmt.id] = elmt.value;
            formDataQueryString += (elmt.id + "=" + elmt.value + "&");
          }
        }
        formDataQueryString = formDataQueryString.slice(0, -1);
        formDataQueryString += ("&ga_id=" + window.__track_id);
        formDataQueryString += "&form_id=contactpage";


        formData["ga_id"] = window.__track_id;
        formData["form_id"] = "contactpage";
        alert(JSON.stringify(formData));
        const xhr = new XMLHttpRequest();
        const url = "https://hooks.zapier.com/hooks/catch/<REPLACE>/<REPLACE2>?" + formDataQueryString;

        xhr.open("GET", url, true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
          }
        };
        var data = JSON.stringify(formData);
        xhr.send(data);
        form.classList.add('was-validated');
        event.preventDefault();
        event.stopPropagation();
      }, false)
    })
})()