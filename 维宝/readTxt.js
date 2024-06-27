var StringParser = function (str) {
    this.str;   // Store the string specified by the argument
    this.index; // Position in the string to be processed
    this.init(str);
}
// Initialize StringParser object
StringParser.prototype.init = function (str) {
    this.str = str;
    this.index = 0;
}

// Get the length of word
function getWordLength(str, start) {
    var n = 0;
    for (var i = start, len = str.length; i < len; i++) {
        var c = str.charAt(i);
        if (c == '\t' || c == ' ' || c == '(' || c == ')' || c == '"')
            break;
    }
    return i - start;
}

// Skip delimiters
StringParser.prototype.skipDelimiters = function () {
    const len = this.str.length;
    var i;
    for (i = this.index; i < len; i++) {
        const c = this.str.charAt(i);
        // Skip TAB, Space, '(', ')
        if (c == '\t' || c == ' ' || c == '(' || c == ')' || c == '"')
            continue;
        break;
    }
    this.index = i;
}

// Skip to the next word
StringParser.prototype.skipToNextWord = function () {
    this.skipDelimiters();
    var n = getWordLength(this.str, this.index);
    this.index += (n + 1);
}

// Get word
StringParser.prototype.getWord = function () {
    this.skipDelimiters();
    var n = getWordLength(this.str, this.index);
    if (n == 0)
        return null;
    var word = this.str.substr(this.index, n);
    this.index += (n + 1);

    return word;
}

var TxtDoc = function (fileName) {
    this.fileName = fileName;
}

TxtDoc.prototype.parse = function (fileString) {
    var strs = '';

    var lines = fileString.split('\n');  // Break up into lines and store them as array
    lines.push(null); // Append null
    var index = 0;    // Initialize index of line

    // Parse line by line
    var line;         // A string in the line to be parsed
    var last_command = '';
    var command;
    var str;
    var sp = new StringParser();  // Create StringParser
    while ((line = lines[index++]) != null) {
        sp.init(line);                  // init StringParser
        command = sp.getWord();     // Get command
        if (command == null)
            continue; 

        command = command.trim();
        if (command == '')
            continue; 
        
        if (command == '0') {
            last_command = '0';
            str = sp.getWord();
            if (str == null)
                continue; 
            str = str.trim();
            if (str != '')
                strs += '<div class="chat-notice"><span>' + str + '</span> </div>';
        } else if (command == '1') {
            last_command = '1';
            str = sp.getWord();
            if (str == null)
                continue; 
            str = str.trim();
            if (str != '')
                strs += '<div class="chat-sender"><div><img src="小马.jpg"></div><div>笨笨</div><div><div class="chat-left_triangle"></div><span>' + str + '</span></div></div>';
        } else if (command == '2') {
            last_command = '2';
            str = sp.getWord();
            if (str == null)
                continue; 
            str = str.trim();
            if (str != '')
                strs += '<div class="chat-receiver"><div><img src="维宝.jpg"></div><div>维宝</div><div><div class="chat-right_triangle"></div><span>' + str + '</span></div></div>';
        } else {
            if (last_command == '0') {
                strs += '<div class="chat-notice"><span>' + command + '</span> </div>';
            } else if (last_command == '1') {
                strs += '<div class="chat-sender"><div><img src="小马.jpg"></div><div>笨笨</div><div><div class="chat-left_triangle"></div><span>' + command + '</span></div></div>';
            } else if (last_command == '2') {
                strs += '<div class="chat-receiver"><div><img src="维宝.jpg"></div><div>维宝</div><div><div class="chat-right_triangle"></div><span>' + command + '</span></div></div>';
            }
        }
    }
    return strs;
}
