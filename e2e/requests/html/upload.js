$(document).ready(function () {
    $('#submit').click(function () {
        const form_data = new FormData()
        const file = document.getElementById('files').files[0]
        form_data.append('avatar', file)
        console.log(form_data.get('avatar'))
        $.ajax({
            url: 'http://localhost:8080/api/auth/edit-avatar',
            type: 'post',
            data: form_data,
            dataType: 'json',
            contentType: false,
            processData: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6InVzZXIiLCJpYXQiOjE2NDQwMjE4NDd9.7n8ASmh425u-AlkaZGXahJT7N8qm745bxzOk7bbi0dg");
            },
            success: function (response) {
                console.log(response)
                //   for(var index = 0; index < response.length; index++) {
                //     var src = response[index];
                //     // Add img element in <div id='preview'>
                    $('#preview').append('<img src="http://localhost:8080/'+response.avatar+'" width="200px;" height="200px">');
                //   }

            },
            error: function (err) {
                console.log(err)
            }
        })
    })
})