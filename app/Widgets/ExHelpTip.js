(function ($) {
    $.Ex_HelpTip = function (element, options) {
        var defaults = {
            Title: "",
            Content: "",
            ToolTip: undefined,
            Anchor: undefined,
            Location: 'Top',
            ABSTop: 0,
            ABSLeft: 0,
            Icon: 'HelpInfo.png',
            OpenDirection: 'left', // left or right
            FloatRight: false,
            YLocationOffset: 0,
            SmallSize: false,
            HelpWindowIcon: undefined,
            BackgroundColor: undefined,
            OnHelpWindowClicked: undefined,
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


            /// initially shows just the helptip image, when clicked, it expands, click again to close..
            var HelpTip = $('<span class="tellMore">Tell me more...</span> <img class = "HelpTipImg MainImg"  title = "Tell me about this..." />  <div class="HelpWindow dropshadow"> <img class = "HelpTipImg SubImg"/> <img class = "CloseHelpTipBtn" title = "Close this window"/> <a class = "Title"> </a>  <div class = "HelpTipContent"> </div> ');
            $element.append(HelpTip);

            if (plugin.settings.ToolTip != undefined) {
                $element.find('.MainImg').attr('title', plugin.settings.ToolTip);
            }


            $element.find('.HelpTipImg').attr('src', GetImagePath(plugin.settings.Icon)); // same as main img

            if (plugin.settings.HelpWindowIcon != undefined) {
                $element.find('.SubImg').attr('src', GetImagePath(plugin.settings.HelpWindowIcon)); // different one
            }

            $element.find('.CloseHelpTipBtn').attr('src', GetImagePath('btnclosecircle.png'));

            $element.find('.HelpTipImg:first').click(function (event) {
                ; // plugin.find('.HelpWindow').show('slide', { direction: 'up' }, 1000);
            });

            $element.find('.CloseHelpTipBtn').click(function (e) {
                e.stopPropagation();
                if ($element.find('.HelpWindow').is(':visible')) {
                    $element.find('.HelpWindow').slideUp();//.hide('slide', { direction: $element.attr('Dir') }, 1000);
                    plugin.settings.OnClosed(); // let parent know 
                }
            });


            // The Content
            $element.find('.Title').text(plugin.settings.Title);
            var HelpTipContent = $element.find('.HelpTipContent');
            HelpTipContent.append(plugin.settings.Content);

            // and the link(s)..
            $element.find('.HelpTipContent a').click(function (e) {
                e.stopPropagation(); // open in new window
                window.open($(this).attr('href'), 'Web Page', 'resizable=1,scrollbars=1,width=1000,height=560');
                return false;
            });

            $element.find('.HelpWindow').click(function (e) {
                if (plugin.settings.OnHelpWindowClicked != undefined) {
                    plugin.settings.OnHelpWindowClicked();
                }
            });

            $element.click(function (e) {
                e.stopPropagation();

                if (plugin.settings.OnHelpWindowClicked != undefined) {
                    return false; // overidden..
                }
                plugin.ToggleHelpWindow();
                return false;
            });


            if (plugin.settings.SmallSize == true) {
                $element.find('.HelpWindow').addClass('HelpWindowSmall');
            }
            if (plugin.settings.BackgroundColor != undefined) {
                $element.find('.HelpWindow').css('background', plugin.settings.BackgroundColor);
                $element.find('.HelpWindow').css('borderColor', plugin.settings.BackgroundColor);
            }

            // position this element at right side of anchor
            plugin.AdjustLocation();

        }

        // ---------------- Public Methods ----------------------------
        plugin.ToggleHelpWindow = function () {
            if ($element.find('.HelpWindow').is(':visible'))
                $element.find('.CloseHelpTipBtn').click();
            else {
                var Dir = 'up';
                // make sure it can fit showing down to the right, else, down to the left..
                var TWidth = $element.find('.HelpWindow').width();
                var Pos = findPos($element[0]);
                // check for overflow at right
                if (((Pos.left + TWidth) > window.innerWidth) || (plugin.settings.OpenDirection == 'left')) {
                    $element.find('.HelpWindow').css('left', -TWidth);
                }
                // check for overflow at bottom
                if (!$element.hasClass('HelpTip-Approval')) {
                    var THeight = $element.find('.HelpWindow').height() - 20;
                    if ((Pos.top + THeight) > window.innerHeight) {
                        $element.find('.HelpWindow').css('top', -THeight - 25);
                        Dir = 'down';
                    }
                }

                $element.attr('Dir', Dir);
                $element.find('.HelpWindow').slideDown("slow", function () {
                    // Animation complete.
                });

                //$element.find('.HelpWindow').slideDown();//show('slide', { direction: Dir }, 1000);

            }
        }

        plugin.AdjustLocation = function () {
            // makes sure element is in right location
            if ($element.hasClass('HelpTip-Approval')) {
                return;
            }



            if (plugin.settings.FloatRight == true) {
                $element.addClass('HelpTip-Float');
                return;
            }

            if (plugin.settings.Anchor != undefined) {
                var Pos = findPos(plugin.settings.Anchor[0]);

                if (plugin.settings.Location == 'Absolute') { // top right
                    $element.css('top', plugin.settings.ABSTop + 'px');
                    $element.css('left', plugin.settings.ABSLeft + 'px');
                    return;
                }
                else if (plugin.settings.Location == 'Top') { // top right
                    $element.css('top', Pos.top);
                }
                else if ((plugin.settings.Location == 'Bottom') || (plugin.settings.Location == 'Bottom-Left')) { // bottom right or left
                    $element.css('top', Pos.top + plugin.settings.Anchor.height() - parseInt($element.css('height')) - 10 - plugin.settings.YLocationOffset);
                }
                if (plugin.settings.Location == 'Bottom-Left') {
                    $element.css('left', '10px');
                }
                else if (plugin.settings.Location == 'Bottom')
                    $element.css('left', plugin.settings.Anchor.width() - parseInt($element.css('width')) - 5 - plugin.settings.YLocationOffset);
                else $element.css('left', plugin.settings.Anchor.width() - parseInt($element.css('width')) - 15);
            }

        }

        // private methods
        function GetImagePath(imageFile)
        {
            return "widgets/" + imageFile;
        }

        function findPos(obj) {
            var curleft = curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            var Obj = new Object;
            Obj.left = curleft;
            Obj.top = curtop;
            return Obj;
        }

        plugin.init();

    }

    $.fn.Ex_HelpTip = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('Ex_HelpTip')) {
                var plugin = new $.Ex_HelpTip(this, options);
                $(this).data('Ex_HelpTip', plugin);
            }
        });
    }

})(jQuery);



