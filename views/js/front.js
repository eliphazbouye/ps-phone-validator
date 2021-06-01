/**
* 2007-2021 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/

var input = document.querySelector('input[name="phone"]'), phone_input = document.querySelector('input[name="phone_mobile"]');
var elSuccess = document.createElement('span');
elSuccess.innerHTML = `<span id="phone_mobilevalid-msg" class="alert alert-success hide" style="display:none;">${validNumber}</span><span id="phone_mobileerror-msg" class="alert alert-danger hide" style="display:none;"></span>`;
// 

input.parentNode.insertBefore(elSuccess, input.nextSibling)
// function insertAfter(referenceNode, newNode){
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }

// insertAfter(input, elSuccess);
// insertAfter(phone_input, elSuccess);


var errorMsg = document.querySelector("#phone_mobileerror-msg"),
validMsg = document.querySelector("#phone_mobilevalid-msg");


// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = [invalidNumber,invalidCountryCode, tooShort, tooLong, invalidNumber];
// var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin
// console.log(window)

var iti = window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function(callback) {
    $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
      var countryCode = (resp && resp.country) ? resp.country : "ci";
      callback(countryCode);
    });
  },
  utilsScript:"https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.12/build/js/utils.js",
});

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
  validMsg.style.display ="none";
  errorMsg.style.display ="none";


};

// on blur: validate
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
      validMsg.style.display ="block";
      errorMsg.style.display ="none";

    } else {
      
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
      errorMsg.style.display ="block";
      validMsg.style.display ="none";
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);
