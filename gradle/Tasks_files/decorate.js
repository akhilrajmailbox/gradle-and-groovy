$(function () {
    var parts = location.pathname.replace("/", "").split("/", 3);
    var version = parts[0];
    var docset = parts[1];
    var path = parts[2];

    var body = $("body");

    var isIn = function (thing, things) {
        for (var i = 0; i < things.length; i++) {
            if (thing == things[i]) {
                return true;
            }
        }
        return false;
    };

    body.addClass(docset);

    if (isIn(docset, ["release-notes.html", "userguide", "dsl"])) {
        var fixedContainer = $("<div id='fixed-container'/>").appendTo(body);

        if (docset == "release-notes.html") {
            $("div.text-container:first").detach().appendTo(fixedContainer);
        } else if (isIn(docset, ["userguide", "dsl"])) {
            $("div.sidebar").detach().appendTo(fixedContainer);
            var contentContainer = docset == "dsl" ? $("<div id='content-container'/ >").appendTo(fixedContainer) : fixedContainer;
            $("div.book:first,div.chapter:first,div.part:first,div.appendix:first,div.glossary:first").appendTo(contentContainer);
            $("div.navfooter").detach().appendTo(contentContainer);
        }

        if (isIn(docset, ["release-notes.html", "userguide"])) {

            var gradleIncBox = $("<div id='gradleinc-box'/>").appendTo(fixedContainer).hide();
            $("h1:first").after(gradleIncBox);

            $.get('/banner.html', function (data) {
                var $banner = gradleIncBox.html(data);
                $.getJSON('/trainings.json', function (data) {
                    var $trainings = gradleIncBox.find('#trainings__listing');
                    var upcomingTrainings = false;
                    var addedTrainings = 0;
                    var maxTrainings = 3;
                    var now = moment()
                    $.each(data.trainings, function (index, training) {
                        var date = moment(training.date, "DD/MM/YY");
                        if (addedTrainings < maxTrainings && date.isAfter(now)) {
                            $trainings.append($('<h4/>').text(training.title));
                            $trainings.append($('<ul/>').append($('<li/>').append($('<a/>').attr('href', training.link).text(training.location))));
                            upcomingTrainings = true;
                            addedTrainings++;
                        }
                    });
                    if (!upcomingTrainings) {
                        $trainings.parent().hide();
                    }
                });
                $banner.show();
            });
        }
    }

    // 1.5 had bugs in this area
    var oldMarkers = $("section > .incubating-marker");
    if (oldMarkers.length > 0) {
        $("section > .incubating-marker").each(function () {
            var element = $(this);
            var heading = element.prev(".incubating");
            element.remove();
            heading.append(element);
        });
    }

// Insert crazy egg tracking code
    setTimeout(function () {
        var a = document.createElement("script");
        var b = document.getElementsByTagName("script")[0];
        a.src = document.location.protocol + "//script.crazyegg.com/pages/scripts/0027/8262.js?" + Math.floor(new Date().getTime() / 3600000);
        a.async = true;
        a.type = "text/javascript";
        b.parentNode.insertBefore(a, b)
    }, 1);

// Insert footer
    $.get('/footer.html', function (data) {
        body.append(data);
        $('footer time').append(moment().format('Y'));
    });

});