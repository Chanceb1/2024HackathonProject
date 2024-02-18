const button = document.getElementById('register');
const userName_e = document.getElementById('username');
const password_e = document.getElementById('password');
button.addEventListener('click', function(e) {
    console.log(111)
    $.ajax({
        url: '/register',
        type: 'post',
        dataType: 'json',
        data: { "userName": userName_e.value, "password": password_e.value },
        success: function (data) {
          console.log(data)
          window.location.href = "/"
        },
        error: function (jqXHR, textStatus, errorThrown) { }
      });
  });