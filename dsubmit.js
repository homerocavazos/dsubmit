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
        requiredFieldsCollection: [],
        errors: []
      }
      _.settings = {
        form: 'form',
        submitBtn: null,
        email: null,
        confirmEmail: null
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
  dSubmit.prototype.validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  dSubmit.prototype.validatePhone = (phone) => {
  
    return phone.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
  };
  dSubmit.prototype.checkRequired = function () {
    let _ = this // this ds obj
  
    _.settings.submitBtn = document.querySelector(_.settings.form+' button[type=submit]');
    _.settings.submitBtn.disabled = true;
  
    if (_.getAllRequired().length !== 0) {
  
      _.getObjs(_.getAllRequired()).map(function (required_field) {
        _.state.requiredFieldsCollection.push(required_field.id)
  
        required_field.addEventListener('input',_.validate.bind(_),true)
      });
    }
  }; // checkRequired
  
  dSubmit.prototype.getAllRequired = function () {
    let _ = this // this ds obj
    let field = document.querySelectorAll(_.settings.form + ' [required]', _.settings.form + ' required=required');
    return field;
  }; // getAllRequired
  
  dSubmit.prototype.checkMatch = function (email1,email2) {
    console.log('checking...');
    let _ = this // this ds obj
   
    if(email1 === email2){
      // console.log('its a match');
      
      let errorEmailEl = document.querySelector(`.error-${_.settings.email.id}`)
      _.addError('', errorEmailEl )
      let errorEmailConfirmEl = document.querySelector(`.error-${_.settings.confirmEmail.id}`)
      _.addError('', errorEmailConfirmEl )
    }else{
      // console.log('no match');
      let errorEmailEl = document.querySelector(`.error-${_.settings.confirmEmail.id}`)
      _.addError('Email doesn\'t match', errorEmailEl )
      _.settings.errors.push(_.settings.confirmEmail.id)
    }
  }
  
  dSubmit.prototype.validate = function (e) {
    e.preventDefault()
  
    let _ = this // this ds obj
    _.settings.errors = [];
  
    _.state.requiredFieldsCollection.map((field_name) => {
      // Push field name to _errors Array IF value is empty
      let form_field = document.querySelector(_.settings.form+ ' #' +field_name)
  
      if (form_field.value < 1) {
        _.settings.errors.push(field_name);
      }
      
    })//map required fields
  
    // does email have value
    if(_.settings.email.value){
      if(_.validateEmail(_.settings.email.value)){
        let el = document.querySelector(`.error-${_.settings.email.id}`)
        _.addError('', el )
        _.checkMatch(_.settings.email.value, _.settings.confirmEmail.value);
      }
      else{
        let el = document.querySelector(`.error-${_.settings.email.id}`)
        _.addError('Not valid format', el )
        _.settings.errors.push(_.settings.email.id);
      }
    }// does email have value
  
    // does confirm email have value
    if(_.settings.confirmEmail.value){
      if(_.validateEmail(_.settings.confirmEmail.value)){
        let el = document.querySelector(`.error-${_.settings.confirmEmail.id}`)
        _.addError('', el )
        _.checkMatch( _.settings.confirmEmail.value,_.settings.email.value);
      }
      else{
        let el = document.querySelector(`.error-${_.settings.confirmEmail.id}`)
        _.settings.errors.push(_.settings.confirmEmail.id);
        _.addError('Not valid format', el )
      }
    }// does confirm email have value
  
    // check phone
    if(document.querySelector('input[type="tel"]').value){
      let t = _.validatePhone(document.querySelector('input[type="tel"]').value);
      if(t){
        let el = document.querySelector(`.error-${document.querySelector('input[type="tel"]').id}`)
        _.addError('', el )
      }else {
        let el = document.querySelector(`.error-${document.querySelector('input[type="tel"]').id}`)
        _.settings.errors.push(document.querySelector('input[type="tel"]').id);
        _.addError('Not valid format', el )
      }
    }// check phone
  
    // check password
    if(document.querySelector('#job_seeker_registration_plainPassword_first').value){
      let p1 = document.querySelector('#job_seeker_registration_plainPassword_first').value;
      let p2 = document.querySelector('#job_seeker_registration_plainPassword_second').value;
  
      if(p2 === p1){
        
        let el = document.querySelector(`.error-${document.querySelector('#job_seeker_registration_plainPassword_second').id}`)
        _.addError('', el )
      }else {
        let el = document.querySelector(`.error-${document.querySelector('#job_seeker_registration_plainPassword_second').id}`)
        _.settings.errors.push(document.querySelector('#job_seeker_registration_plainPassword_second').id);
        _.addError('Doesn\'t match', el )
      
      }
  
    }// check password
  
   
  // console.log(_.settings.errors);
    // if all fields are filled
    if (_.settings.errors.length < 1) {
      _.settings.submitBtn.disabled = false;
    } else {
      _.settings.submitBtn.disabled = true;
    }
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
  
  dSubmit.prototype.addErrorContiners = function() {
    let _ = this;
  
    _.getObjs(_.getAllRequired()).forEach(function (required_field) {
      if(required_field.type !== 'radio'){
      
        let errorEl = document.createElement("span");
        errorEl.classList = `error error-${required_field.id}`;
        errorEl.style.display = 'block';
        errorEl.style.color = 'red';
        errorEl.style.fontSize = '.9rem';
        required_field.after(errorEl)
      }
    });
  }
  dSubmit.prototype.addError = function(msg, toEl) {
    toEl.innerHTML = msg;
  }
  // START HERE!
  dSubmit.prototype.init = function (opts) {
    let _ = this;
    
    // This overrides default options
    _.setOpts(opts);
    _.addErrorContiners();
    _.checkRequired();
   
  }//init
  
  