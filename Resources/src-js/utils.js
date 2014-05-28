var Utils = {

    /**
     * Simple JavaScript Templating.
     * http://jsperf.com/javascript-templating
     */
    cache: {},
    tmpl: function (str, data) {
        // figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ? this.cache[str] = this.cache[str] || this.tmpl(document.getElementById(str).innerHTML) :

        // generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // convert the template into pure JavaScript
        str.replace(/[\r\t\n]/g, " ").split("<@").join("\t").replace(/((^|@>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)@>/g, "',$1,'").split("\t").join("');").split("@>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");

        // provide some basic currying to the user
        return data ? fn(data) : fn;
    },

    /**
     * Modifies a string to remove all non ASCII characters and spaces.
     *
     * @param {string} text The text to slugify
     *
     * @return {string} The slugified text
     */
    slugify: function (text) {
        return text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, '_').replace(/\s/gi, '-');
    },

    /**
     * Converted stringify() to jQuery plugin.
     * Serializes a simple object to a JSON formatted string.
     *
     * Note: stringify() is different from jQuery.serialize() which URLEncodes form elements
     *
     * USAGE:
     * jQuery.ajax({
     *     data : {serialized_object : Utils.stringify (JSON_Object)},
     *     success : function (data) {
     *     }
     * });
     */
    stringify: function (obj) {
        if ('JSON' in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != 'object' || obj === null) {
            // simple data type
            if (t == 'string') obj = '"' + obj + '"';

            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == 'string') {
                        v = '"' + v + '"';
                    } else if (t == 'object' && v !== null){
                        v = Utils.stringify(v);
                    }

                    json.push((arr ? '' : '"' + n + '":') + String(v));
                }
            }

            return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
        }
    },

    /**
     * Generates a unique ID.
     *
     * example 1: uniqid();
     * returns 1: 'a30285b160c14'
     *
     * example 2: uniqid('foo');
     * returns 2: 'fooa30285b1cd361'
     *
     * example 3: uniqid('bar', true);
     * returns 3: 'bara20285b23dfd1.31879087'
     */
    uniqid: function (prefix, more_entropy) {
        if (typeof prefix == 'undefined') {
            prefix = '';
        }

        var retId;
        var formatSeed = function (seed, reqWidth) {
            // to hex str
            seed = parseInt(seed, 10).toString(16);
            // so long we split
            if (reqWidth < seed.length) {
                return seed.slice(seed.length - reqWidth);
            }
            // so short we pad
            if (reqWidth > seed.length) {
                return Array(1 + (reqWidth - seed.length)).join('0') + seed;
            }
            return seed;
        };

        var uniqidSeed = Math.floor(Math.random() * 0x75bcd15) + 1;

        // start with prefix, add current milliseconds hex string
        retId = prefix;
        retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
        // add seed hex string
        retId += formatSeed(uniqidSeed, 5);
        if (more_entropy) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10).toFixed(8).toString();
        }

        return retId;
    },

    /**
     * Apple's sweet poof effect.
     *
     * @param {Object} elem The delete button
     */
    poof: function (elem) {
        var img = $('<div style="height:55px; width:55px; background-image:url(/bundles/ewzformbuilder/images/poof.png); z-index:10000000"></div>');

        var point = elem.offset();
        var interval = false;
        var c = 1;

        $('body').append(img);

        img.css('position', 'absolute');
        img.css('top', point.top + 'px');
        img.css('left', point.left + 'px');

        var positions = [0, 55, 110, 165, 220];

        setTimeout(function () {
            interval = setInterval(function () {
                if (c >= 4) {
                    clearInterval(interval);
                    $(img).remove();
                    return true;
                } else {
                    c++;
                }

                img.css('background-position', '-' + positions[c] + 'px');
            }, 100);
        }, 100);
    },

    stripslashes: function (str) {
        return (str + '').replace(/\\(.?)/g, function (s, n1) {
            switch (n1) {
            case '\\':
                return '\\';
            case '0':
                return '\u0000';
            case '':
                return '';
            default:
                return n1;
            }
        });
    },

    htmlDecode: function (string, quote_style) {
        var optTemp = 0,
            i = 0,
            noquotes = false;
        if (typeof quote_style === 'undefined') {
            quote_style = 2;
        }
        string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        var OPTS = {
            'ENT_NOQUOTES': 0,
            'ENT_HTML_QUOTE_SINGLE': 1,
            'ENT_HTML_QUOTE_DOUBLE': 2,
            'ENT_COMPAT': 2,
            'ENT_QUOTES': 3,
            'ENT_IGNORE': 4
        };
        if (quote_style === 0) {
            noquotes = true;
        }
        if (typeof quote_style !== 'number') {
            quote_style = [].concat(quote_style);
            for (i = 0; i < quote_style.length; i++) {
                if (OPTS[quote_style[i]] === 0) {
                    noquotes = true;
                } else if (OPTS[quote_style[i]]) {
                    optTemp = optTemp | OPTS[quote_style[i]];
                }
            }
            quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
            string = string.replace(/&#0*39;/g, "'");
        }
        if (!noquotes) {
            string = string.replace(/&quot;/g, '"');
        }
        string = string.replace(/&amp;/g, '&');
        return string;
    },

    newlineToEntities: function (string) {
        return string.replace(/\n\r?/g, '&#13;&#10;');
    },

    escapeValue: function (str) {
        return str.replace(/\"/gim, '&quot;');
    }
}
