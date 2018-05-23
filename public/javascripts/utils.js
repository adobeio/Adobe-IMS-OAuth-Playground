function showSecret() {
    var x = document.getElementById("clientSecret");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


function textCopy(id,alertId) {
    $('.alert').hide();

    var copyText = document.getElementById(id);
    if (copyText.value != "") {
        copyText.select();
        document.execCommand("Copy");
        $('.alert#'+alertId).text("Token copied successfully!").fadeTo(2000, 500).slideUp(500, function () {
            $(".alert#"+alertId).slideUp(500);
        });
    }


}