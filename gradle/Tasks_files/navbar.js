$(function () {
    var body = $('body');
    // Insert navbar
    $.ajax({
        url: '/navbar.html',
        success: function (data) {
            $(data).prependTo(body);
            populate(body, siteDecorateVersion);
        }
    });

});

function populate(body, siteDecorateVersion) {
    var parts = location.pathname.replace("/", "").split("/", 3);
    var version = parts[0];
    var docset = parts[1];
    var path = parts[2];
    var links;

    if (typeof legacyNotes === 'undefined') {  // for releases prior to 1.1, only link to release notes
        if (typeof hasGroovyDoc === 'undefined' || hasGroovyDoc === 'true') {  //
            links = [
                {name: "Release Notes", link: "release-notes.html", cl: "rn"},
                {name: "User Guide", link: "userguide/userguide.html", cl: "ug"},
                {name: "DSL Reference", link: "dsl/", cl: "dsl"},
                {name: "Javadoc", link: "javadoc/", cl: "javadoc"},
                {name: "Groovydoc", link: "groovydoc/", cl: "groovydoc"}
            ];
        } else {
            links = [
                {name: "Release Notes", link: "release-notes.html", cl: "rn"},
                {name: "User Guide", link: "userguide/userguide.html", cl: "ug"},
                {name: "DSL Reference", link: "dsl/", cl: "dsl"},
                {name: "Javadoc", link: "javadoc/", cl: "javadoc"}
            ];
        }
    } else {
        links = [
            {name: "Release Notes", link: "release-notes.html", cl: "rn"},
            {name: "User Guide", link: "userguide/userguide.html", cl: "ug"},
            {name: "Javadoc", link: "javadoc/", cl: "javadoc"},
            {name: "Groovydoc", link: "groovydoc/", cl: "groovydoc"}
        ];
    }

    $('.navbar-version').append(siteDecorateVersion);

    var ul = $(".navbar-inner ul");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var li = $("<li><a href='" + "/" + version + "/" + link.link + "' class='navbar-li-" + link.cl + "' target='_top'>" + link.name + "</a></li>").appendTo(ul);
        if (docset.lastIndexOf(link.link.split("/", 2)[0], 0) >= 0) {
            li.find("a").addClass('current-nav');
        }
    }
}
