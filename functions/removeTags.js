module.exports = {
    removeTags : function(text) {
        text = text
            .replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")
            .replace(/(&quot\;)/g,"\"")
            .replace(/(&nbsp\;)/g," ")
            .replace(/(&lt\;)/g,"<")
            .replace(/(&gt\;)/g,">")
            .replace(/(&amp\;)/g,"&")
            .replace(/(&#035\;)/g,"#")
            .replace(/(&#039\;)/g,"\'");
        
        return text;
    },

    trim : function(str, max) {
        (str.length > max ? `${str.slice(0, max - 3)}...` : str);

    }
};