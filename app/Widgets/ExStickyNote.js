(function ($) {
    $.Ex_StickyNote = function (element, options) {
        var defaults = {
            Title: "",
            Content: "",
            TimeStamp: "",
            IsReadOnly: false,
            Id: 1,
            OnClosed: function () { }
        }

        // current instance of the object
        var plugin = this;
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
             element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function () {
            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            $element.attr('id', plugin.settings.Id);

            var Header = $('<div class="StickyHeader"> </div>');

            // add the tack
            var Tack = $('<img class = "ITack"/>');
            Tack.attr('src', GetImagePath('tack.png'));
            Header.append(Tack);

            // add the Date
            var Date = $('<div class = "IDate"><span>ABC</span> </div> ');
            Date.find('span').text(plugin.settings.TimeStamp);
            Header.append(Date);

            // add the Title
            var Title = $('<div class = "ITitle"> <span>ABC</span> </div> ');
            Title.find('span').text(plugin.settings.Title);
            Header.append(Title);


            var DeleteNote = $('<a href="" class= "saveNoteLink" title = "save this note">Save</a>');
            Header.append(DeleteNote);
            DeleteNote.click(function (event) {
                plugin.Show(false);
                // let parent know and send data of note
                plugin.settings.OnClosed(plugin.GetNote());
            });

            $element.append(Header);

            // now the NoteHost
            var Note = $("<textarea Class='NoteHost'  multiline='true' >  </textarea>");
            
            Note.text(plugin.settings.Content);
            $element.append(Note);

            setTimeout(function () {
                Note.focus().text("").text(plugin.settings.Content);
            }, 1000);

            
            if (plugin.settings.IsReadOnly) {
                Note.attr('readonly', 'readonly');
            }

            $element.click(function (e) {
                e.stopPropagation();
                return false;
            });

        }


        // ---------------- Public Methods ----------------------------
        plugin.GetNote = function () {
            return $element.find('textarea').val();
        }
        plugin.Show = function (ShowIt) {

            if (ShowIt) {
                $element.slideDown();
                var theText = $element.find('textarea').text();
                $element.find('textarea').focus().text("").text(theText);

            }
            else {
                $element.slideUp();
            }
        }

        // private methods
        function GetImagePath(imageFile) {
            return "widgets/" + imageFile;
        }
        plugin.init();

    }

    $.fn.Ex_StickyNote = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('Ex_StickyNote')) {
                var plugin = new $.Ex_StickyNote(this, options);
                $(this).data('Ex_StickyNote', plugin);
            }
        });
    }

})(jQuery);



