CodeMirror.defineMode('logo', function(config, parserConfig) {

  var regexIdentifier = /^(\.?[A-Za-zά-ωΑ-ώ][A-Za-zά-ωΑ-ώ0-9_'.\?]*|[\u2190-\u2193])/;
  var regexVariableDfn = /^"([a-zA-Zά-ωΑ-ώ][a-zA-Zά-ωΑ-ώ0-9_']*)/;
  var regexVariable = /^:[A-Za-zά-ωΑ-ώ][A-Za-zά-ωΑ-ώ0-9_]*/;
  var regexOperator = /^\+|\-|\*|\/|%|\^|>=|<=|<>|=|<|>|\[|\]|\{|\}(\s*@\s*\d+)?|\(|\)/;
  var regexCommands = /^\s*(ifelse|if|while|dowhile|print|first|last|butfirst|butlast|or|and|not|make|repeat|until|do.while|forever|true|false|αναλλιως|αν|οσο|τύπωσε|τυπωσε|επαναλαβε|επανάλαβε|φτιαξε|φτιάξε|ή|και|οχι|όχι|)\s/;
  return {

    startState: function() {
      return {
        state: 'standard',
        indent: 0
      };
    },

    indent: function(state, textAfter) {

      var size = 2;
      var indent = state.indent;
      if (/^\]/.test(textAfter))
        --indent;
      if (state.state == 'defn-name')
        return (indent + 1 ) * size;
     if (state.state == 'defn-body'){
        if (/^τελος|END\b/i.test(textAfter))
          return indent * size;
        return (indent + 1 ) * size;}
      else
        return indent * size;

    },

    token: function(stream, state) {
      var name, i;

      if (stream.eatSpace()) {
       return null;
   }

      // Comment
      if (stream.match(/^;.*/, true)) {
        return 'logo-comment';
      }

      if (state.state == 'standard') {
        if (stream.match(/^για|TO\b/i, true)) {
          state.state = 'funct-name';
          return 'logo-to';
        }
      }

      if (state.state == 'funct-name') {
        if (stream.match(regexIdentifier, true)) {
          state.state = 'funct-vars';
          return 'logo-funct-name';
        }
        stream.next();
        state.state = 'standard';
        return 'logo-error';
      }

      if (state.state == 'funct-vars') {
        if (stream.match(regexVariable, true)) {
          return 'logo-funct-vars';
        }
        state.state = 'funct-body';
      }

      if (state.state === 'funct-body') {

        if (stream.match(/^τελος|τέλος|END\b/i, true)) {
          state.state = 'standard';
          return 'logo-end';
        }
      }

      if (state.state === 'standard' || state.state === 'funct-body') {

       if (stream.match(regexVariableDfn, true)) {
          return 'logo-variable';
        }

        if (stream.match(/^\[/, true)) {
          ++state.indent;
          return 'logo-operator';
        }

        if (stream.match(/^\]/, true)) {
          if (state.indent > 0) --state.indent;
          return 'logo-operator';
        }
		//logo primitive
		if (stream.match (regexCommands,true)){
			return 'logo-primitive';
			}
        // Operator
        if (stream.match(regexOperator, true)) {
          return 'logo-operator';
        }

        // Variable
        if (stream.match(regexVariable, true)) {
          return 'logo-variable';
        }

        // just text
       if (stream.match(regexIdentifier, true)) {
		   //console.log('logo-name');
		   return 'logo-name';
      }

        stream.next();
        return 'logo-error';
      }

      throw 'error';
    }
  };
});

CodeMirror.defineMIME("text/x-logo", "logo");
