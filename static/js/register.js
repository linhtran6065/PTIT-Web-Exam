import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";

var isValid = (document.getElementById("validation").style.display = "none");


function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("registerUserFirstname").value;
    formData["lastName"] = document.getElementById("registerUserLastname").value;
    formData["email"] = document.getElementById("registerEmail").value;
    formData["password"] = document.getElementById("registerPassword").value;
    //studentList.push(formData);
  
    return formData;
  }
  
  function resetForm() {
    document.getElementById("registerUserFirstname").value = "";
    document.getElementById("registerUserLastname").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
  
  }

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        insertNewRecord(formData);
        // resetForm();
        document.getElementById("validation").style.display = "none";

    } 
    else {

        document.getElementById("validation").style.display = "inline";

    }
}

function validate() {
    isValid = true;
    var firstName = document.getElementById("registerUserFirstname").value;
    var lastName = document.getElementById("registerUserLastname").value;
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var validationMessage = document.getElementById("validation");
    
    if (firstName  == "" || lastName == "" || email == "" || password == "" )  {
            isValid = false;
            validationMessage.innerText = "**Cần nhập đầy đủ các thông tin**";
            return;
    }

    if(confirmPassword != password) {
        isValid = false;
            validationMessage.innerText = "Mật khẩu không khớp";
            return;
    }
          
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
             validationMessage.innerText = "Email không hợp lệ";
             isValid = false;
          }
  
          var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (!passwordRegex.test(password)) {
              validationMessage.innerText = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ cái và một số";
              isValid = false;
          }
  
      else {
        isValid = true;
      }
   
    return isValid;
  }

function insertNewRecord(data) {
    apiPost("/api/registerUser", data)
      .then((response) => {
        if(response.message === "User already exists!") {
            alert(response.message)
        }
        else {
            var confirmMessage = confirm("Bài thi đã được tạo thành công. Bạn có muốn chuyển về trang đăng nhập không?");
            if (confirmMessage) {
                window.location.href = "./index.html"; // Redirect to index.html
            }
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

window.onFormSubmit = onFormSubmit