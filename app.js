class Developer {
  constructor(firstName, lastName, age, job, phoneNo, company) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.job = job;
    this.phoneNo = phoneNo;
    this.company = company;
  }
}
class UI {}

UI.prototype.addCard = function(developer) {
  const cardSectionRow = document.querySelector('.card-section-row');

  const cardContainer = document.createElement('div');
  cardContainer.classList = 'col s12 m3';

  const card = document.createElement('div');
  card.classList = 'card red center';

  const cardContent = document.createElement('div');
  cardContent.classList = 'card-content white-text';

  const span = document.createElement('span');
  span.className = 'card-title';
  span.textContent = `${developer.job}`;

  const cardAction = document.createElement('div');
  cardAction.className = 'card-action';

  const link = document.createElement('a');
  link.href = '#!';
  link.classList = 'white-text center';
  link.textContent = 'kNOW MORE';
  link.style.marginLeft = '30px';

  const ul = document.createElement('ul');
  ul.innerHTML = `
  <li>Name: ${developer.firstName} ${developer.lastName}</li>
  <li>Age: ${developer.age}</li>
  <li>Contact No: ${developer.phoneNo}</li>
  <li>Company Name:${developer.company}</li>
`;
  cardSectionRow.appendChild(cardContainer).appendChild(card);
  card.appendChild(cardContent).appendChild(span);
  cardContent.appendChild(ul);
  card.appendChild(cardAction).appendChild(link);
};
UI.prototype.showAlert = function(message, className) {
  clearAlert();
  //create div
  const div = document.createElement('p');
  div.classList = `alert ${className}`;
  //adding test
  div.appendChild(document.createTextNode(message));
  //getting parent
  const inputSection = document.querySelector('.input-section');
  //getting form
  const form = document.querySelector('#input-form');
  inputSection.insertBefore(div, form);
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 2000);
};
function clearAlert() {
  const currentAlert = document.querySelector('.error');
  if (currentAlert) {
    currentAlert.remove();
  }
}
UI.prototype.clearInputFields = function() {
  document.getElementById('firstname').value = '';
  document.getElementById('firstname').classList.remove('valid');
  document.getElementById('firstnamelabel').classList.remove('active');
  document.getElementById('lastname').value = '';
  document.getElementById('lastname').classList.remove('valid');
  document.getElementById('lastnamelabel').classList.remove('active');
  document.getElementById('age').value = '';
  document.getElementById('age').classList.remove('valid');
  document.getElementById('agelabel').classList.remove('active');
  document.getElementById('job').value = '';
  document.getElementById('job').classList.remove('valid');
  document.getElementById('joblabel').classList.remove('active');
  document.getElementById('phoneno').value = '';
  document.getElementById('phoneno').classList.remove('valid');
  document.getElementById('phonenolabel').classList.remove('active');
  document.getElementById('companyname').value = '';
  document.getElementById('companyname').classList.remove('valid');
  document.getElementById('companynamelabel').classList.remove('active');
};

document.getElementById('input-form').addEventListener('submit', addCard);
function addCard(e) {
  //getting values from form
  const firstName = document.getElementById('firstname').value,
    lastName = document.getElementById('lastname').value,
    age = document.getElementById('age').value,
    job = document.getElementById('job').value,
    phoneNo = document.getElementById('phoneno').value,
    company = document.getElementById('companyname').value;

  const developer = new Developer(firstName, lastName, age, job, phoneNo, company);
  const ui = new UI();
  if (
    firstName === '' ||
    lastName === '' ||
    age === '' ||
    job === '' ||
    phoneNo === '' ||
    company === ''
  ) {
    ui.showAlert('Please Provide The input', 'error');
  } else {
    ui.addCard(developer);
    ui.clearInputFields();
    ui.showAlert('Developer Added!', 'success');
  }
  e.preventDefault();
}
document.getElementById('input-form').addEventListener('keyup', error);
function error(e) {
  const ui = new UI();
  const letters = /^[A-Z , . a-z]+$/;
  const numbers = /^[0-9]+$/;
  let key = e.keyCode || e.charCode;

  if (e.target.value.match(letters) || e.target.value === '') {
    e.target.classList.remove('invalid');
    e.target.classList.add('active');
    if (
      e.target.id === 'firstname' ||
      e.target.id === 'lastname' ||
      e.target.id === 'job' ||
      e.target.id === 'companyname'
    ) {
      if (e.target.value.length === 20) {
        ui.showAlert('Maximum input length is 20', 'error');
      }
    }
  } else {
    if (key <= 46) {
    } else {
      if (e.target.value != letters) {
        if (e.target.id === 'age' || e.target.id === 'phoneno') {
        } else {
          ui.showAlert('Please Input A-Z or a-z', 'error');
          e.target.classList.add('invalid');
        }
      } else {
        e.target.classList.add('invalid');
      }
    }
  }
  if (e.target.id === 'age' || e.target.id === 'phoneno') {
    if (e.target.value.match(numbers) || e.target.value === '') {
      e.target.classList.remove('invalid');
      e.target.classList.add('active');

      if (e.target.id === 'age') {
        if (key <= 46) {
        } else {
          if (e.target.value < 17 || e.target.value > 61) {
            ui.showAlert('Age Should Between 18 - 60', 'error');
            e.target.classList.add('invalid');
          }
        }
      }
      if (e.target.id === 'phoneno') {
        if (key <= 46) {
        } else {
          if (e.target.value.length < 10) {
            ui.showAlert('Phono No Should 10 Digit only', 'error');
            e.target.classList.add('invalid');
          } else {
            e.target.classList.remove('invalid');
          }
        }
      }
    } else {
      if (key <= 46) {
        e.target.classList.add('invalid');
      } else {
        if (e.target.value != numbers) {
          ui.showAlert('Please Input 0-9', 'error');
          e.target.classList.add('invalid');
        } else {
          e.target.classList.add('invalid');
        }
      }
    }
  }
}
