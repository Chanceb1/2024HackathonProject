const loginButton = document.getElementById('login');
const userName_e = document.getElementById('username');
const password_e = document.getElementById('password');
loginButton.addEventListener('click', function(e) {
  $.ajax({
    url: '/login',
    type: 'post',
    dataType: 'json',
    // "jhondoe" "1234"
    // userName_e.value password_e.value
    data: { "userName": userName_e.value, "password": password_e.value },
    success: function (data) {
      console.log(data)
      if(data["response"] == "Login successfully") {
        window.location.href = "/"
      }
      else {
        alert("Login failed!")
      }
    },
    error: function (jqXHR, textStatus, errorThrown) { }
  });
});