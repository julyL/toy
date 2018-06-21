$(".link").on("click", function (e) {
    if (!$(e.target).hasClass('download')) {
        location.href = $(this).attr("data-link");
    }
})

$(".download").on("click", function () {
    var filepath = $(this).attr("href");
    $.get(location.origin + "/__recode__for__download__", {
            filepath: filepath,
            location: location.href
        },
        function () {
            console.log('success');
        });
})