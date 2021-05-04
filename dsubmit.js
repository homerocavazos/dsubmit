/*
  Version: 1.0.0
  Author: Homero Cavazos
  Github: https://github.com/homerocavazos
  Instructions:
    - Start from the bottom of the file in the "init" function

  Example:
----------------------------------------------------
  Add the following to your page or a JS file
----------------------------------------------------
  const example_ds = new ds();

  example_dSubmit.init({
    form: string, default to form element. You may use class or ID for override
  })

 */

"use strict"

const dSubmit = (() => {
  function dSubmit() {
    const _ = this;

    _.state = {
      requiredFieldsCollection: []
    }
    _.settings = {
      form: 'form',
      submitBtn: null
      // Add opt settings
    }

} //dSubmit function

return dSubmit;
})()

dSubmit.prototype.getObjs = function (objs) {
	return Object.keys(objs).map(function (e) {
		return objs[e];
	});
}; // getObjs

dSubmit.prototype.getAllRequired = function () {
  let _ = this // this ds obj
  let field = document.querySelectorAll(_.settings.form+' input[required]');
  return field;
}; // getAllRequired

dSubmit.prototype.validate = function (e) {
  e.preventDefault()

  let _ = this // this ds obj
  let _errors = [];

  _.state.requiredFieldsCollection.map((field_name) => {
    // Push field name to _errors Array IF value is empty
    let form_field = document.querySelector(_.settings.form+ ' #' +field_name)
    if (form_field.value < 1) {
      _errors.push(field_name);
    }
  })//map required fields

  // Enable the submit button if there are no errors
  if (_errors.length < 1) {
    _.settings.submitBtn.disabled = false;
  } else {
    _.settings.submitBtn.disabled = true;
  }
  // console.log(_errors);
}; // validate

// This will update the settings of the ds
dSubmit.prototype.setOpts = function (opts) {
  let _ = this;
  if (typeof opts == "object")
    for (let key in opts) {
      if (opts.hasOwnProperty(key)) {
        _.settings[key] = opts[key]
      }
    }
  else return;
} // setOpts


// START HERE!
dSubmit.prototype.init = function (opts) {
  let _ = this;

  // This overrides default options
  _.setOpts(opts);

  _.settings.submitBtn = document.querySelector(_.settings.form+' input[type=submit]');
  _.settings.submitBtn.disabled = true;

  _.getObjs(_.getAllRequired()).map(function (required_field) {
      _.state.requiredFieldsCollection.push(required_field.id)
      required_field.addEventListener('input',_.validate.bind(_),true)
  });
  // console.log(_.state.requiredFieldsCollection);
}//init