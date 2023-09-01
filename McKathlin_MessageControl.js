//=============================================================================
// Message Control
// For RPG Maker MZ
// By McKathlin and Tyruswoo
//=============================================================================

/*
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Imported = Imported || {};
Imported.McKathlin_MessageControl = true;

var McKathlin = McKathlin || {};
McKathlin.MessageControl = McKathlin.MessageControl || {};

/*:
 * @target MZ
 * @plugindesc v1.1.1 Word wrap and fine text adjustments.
 * @author McKathlin and Tyruswoo
 * @url https://www.tyruswoo.com
 *
 * @help McKathlin Message Control for RPG Maker MZ
 * ============================================================================
 * Dependencies
 * -------------
 * We've done our best to make Message Control work easily with other plugins
 * regardless of plugin list order, particularly our plugins, as well as any
 * plugins that provide new escape characters.
 * However, conflicts are possible with other developers' plugins if they
 * heavily alter Game_Message, Window_Base, Window_Message, or Window_Help.
 * 
 * Plugin Commands
 * ----------------
 * Turn Word Wrap OFF - Disables word wrap in message windows.
 *                      When word wrap is off, newlines are honored.
 *                      This is permanent per save file, until changed by
 *                      plugin command.
 * 
 * Turn Word Wrap ON  - Enables word wrap in message windows.
 *                      Newlines in editor will be ignored; use <br> instead.
 *                      This is permanent per save file, until changed by
 *                      plugin command.
 * 
 * Text Adjusment
 * ---------------
 * Text Y Adjust alters where text sits on its line. If you notice the font
 * you've chosen sits too high on its line, a positive Text Y Adjust can
 * improve its appearance. Or if the text sits too low, a negative Text Y
 * Adjust can correct it.
 * 
 * Line Height Adjust increases or decreases line height by a given number of
 * pixels. If the text in the font and size you've chosen looks cramped, a
 * positive Line Height adjust can give it vertical space. Lines per window
 * will remain the same, so increasing Line Height Adjust makes the message
 * window and other text-holding windows taller. A negative Line Height Adjust
 * makes windows more compact; each contained line takes less vertical space.
 * 
 * Word Wrap
 * ----------
 * When word wrap is turned on, line breaks entered in the editor are ignored,
 * as the message window instead puts line breaks whenever a line is out of
 * space for text.
 * To make the message window insert a line break in word wrap mode, use the
 * text code <br>
 * 
 * Word wrap relies on JavaScript's text width measurement feature, which
 * behaves differently depending on the font you use. If you've turned on
 * word wrap, but text overflows the right side of the message window,
 * decrease the plugin parameter Word Wrap Width Percent slightly
 * until it looks better. A fraction of a point may be enough.
 * If your text stops too far short of the right edge of the window,
 * increase Word Wrap Width Percent slightly.
 * 
 * ============================================================================
 * For more help using the Message Control plugin, see Tyruswoo.com.
 * ============================================================================
 * Version History:
 *
 * v1.0  6/19/2021
 *        - Word wrap
 *        - Text line adjustments
 * 
 * v1.1  9/14/2021
 *        - Fixed bug where words longer than a whole line of text sometimes
 *          caused the game to freeze when word wrap was on.
 *        - Words longer than 1 line now wrap mid-word.
 *        - Added "Word Wrap Width Percent" parameter, which can be adjusted
 *          so that word wrap works correctly for your game's font.
 * 
 * v1.1.1  8/31/2023
 *        - This plugin is now free and open source under the MIT license.
 * 
 * ============================================================================
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ============================================================================
 * Happy storytelling!
 * -McKathlin
 * 
 * @param Text Y Adjust
 * @type number
 * @min -30
 * @max 60
 * @default 0
 * @desc Number of pixels to shift all window text downward.
 * Negative shifts up.
 * 
 * @param Line Height Adjust
 * @type number
 * @min -30
 * @max 60
 * @default 0
 * @desc Number of pixels of additional vertical space between lines.
 * Negative number constricts vertical space per line.
 * @parent Text Y Adjust
 * 
 * @param Word Wrap Message Window
 * @type boolean
 * @default true
 * @desc Whether to use text wrapping on messages shown in the message window.
 * 
 * @param Word Wrap Help Window
 * @type boolean
 * @default true
 * @desc Whether to use text wrapping on descriptions in help windows.
 * @parent Word Wrap Message Window
 * 
 * @param Word Wrap Width Percent
 * @type decimal
 * @default 99.5
 * @desc Use this percent of the window's inner width as the
 * maximum text width per line, for word wrapping.
 * @parent Word Wrap Message Window
 * 
 * @command word_wrap_off
 * @text Turn Word Wrap OFF
 * @desc Stop using text wrapping on the message window.
 * 
 * @command word_wrap_on
 * @text Turn Word Wrap ON
 * @desc Start using text wrapping on the message window.
 */

(() => {
	//============================================================================
	// Parameters and Constants
	//============================================================================

    const pluginName = "McKathlin_MessageControl";

	McKathlin.MessageControl.parameters = PluginManager.parameters(pluginName);
	McKathlin.MessageControl.param = McKathlin.MessageControl.param || {};

	McKathlin.MessageControl.param.textYAdjust =
		Number(McKathlin.MessageControl.parameters['Text Y Adjust']);
	McKathlin.MessageControl.param.lineHeightAdjust = 
		Number(McKathlin.MessageControl.parameters['Line Height Adjust']);

	McKathlin.MessageControl.param.wordWrapMessageWindow =
		McKathlin.MessageControl.parameters['Word Wrap Message Window'] == 'true';
	McKathlin.MessageControl.param.wordWrapHelpWindow =
		McKathlin.MessageControl.parameters['Word Wrap Help Window'] == 'true';

	McKathlin.MessageControl.param.wordWrapWidthFraction = 0.01 * Number(
		McKathlin.MessageControl.parameters['Word Wrap Width Percent']);

	//============================================================================
	// Plugin Commands
	//============================================================================

	PluginManager.registerCommand(pluginName, "word_wrap_off", args => {
		// TODO: handle race conditions, if any
		$gameSystem.disableMessageTextWrap();
	});

	PluginManager.registerCommand(pluginName, "word_wrap_on", args => {
		// TODO: handle race conditions, if any
		$gameSystem.enableMessageTextWrap();
	});

	//=============================================================================
	// Text Position Adjustments
	//=============================================================================
	
	// Text Y Adjust

	if (McKathlin.MessageControl.param.textYAdjust) {
		// Extended method
		McKathlin.MessageControl.Bitmap_drawText = Bitmap.prototype.drawText;
		Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
			McKathlin.MessageControl.Bitmap_drawText.call(this, text, x,
				y + McKathlin.MessageControl.param.textYAdjust, maxWidth, lineHeight, align);
		};
	}

	// Line Height Adjust

	if (McKathlin.MessageControl.param.lineHeightAdjust) {
		// Extended method
		McKathlin.MessageControl.Window_Base_lineHeight =
			Window_Base.prototype.lineHeight;
		Window_Base.prototype.lineHeight = function() {
		    return McKathlin.MessageControl.Window_Base_lineHeight.call(this) +
		    	McKathlin.MessageControl.param.lineHeightAdjust;
		};
	}

	//============================================================================
	// Word Wrap
	//============================================================================
	// Shared word wrap functionality
	//----------------------------------------------------------------------------

	// New method
	Window_Base.prototype.wrapText = function(text) {
		text = text.replaceAll(/<br ?\/?> ?/gi, '<br>'); // standardize <br>
		text = text.replaceAll('<br>', '\n'); // Treat <br> as line break
		var paragraphs = text.split('\n'); // split at line breaks
		var lines = [];
		for (var paragraph of paragraphs) {
			lines = lines.concat(this.splitAtWrapPoints(paragraph));
		}
		text = lines.join('\n');
		return text;
	};

	// New method
	Window_Base.prototype.widthForWrappingText = function() {
		return this.innerWidth *
			McKathlin.MessageControl.param.wordWrapWidthFraction;
	};

	// New method
	Window_Base.prototype.splitAtWrapPoints = function(text) {
		var width = this.widthForWrappingText();
		var lines = [];
		var lineStartIndex = 0;
		while (lineStartIndex < text.length) {
			// Start with entire remainder of line, and shorten to fit.
			var lineEndIndex = text.length;
			var testLine = text.slice(lineStartIndex, lineEndIndex);
			while (this.textWidth(testLine) > width) {
				lineEndIndex = lineStartIndex + testLine.lastIndexOf(' ');
				if (lineEndIndex < lineStartIndex) {
					break;
				}
				testLine = text.slice(lineStartIndex, lineEndIndex);
			}

			if (lineEndIndex < lineStartIndex) {
				// If you're here, it's the rare case when a line starts with
				// a word that's more than a line long.
				// Inch back the line length until the segment is short enough.
				lineEndIndex = text.length;
				testLine = text.slice(lineStartIndex, lineEndIndex);
				while (this.textWidth(testLine) > width) {
					lineEndIndex--;
					testLine = text.slice(lineStartIndex, lineEndIndex);
				}
			}
			var line = text.slice(lineStartIndex, lineEndIndex).trimEnd();
			lines.push(line);
			lineStartIndex = lineEndIndex + 1;
		}
		return lines;
	};

	//----------------------------------------------------------------------------
	// Message word wrap
	//----------------------------------------------------------------------------

	// Extended method
	McKathlin.MessageControl.Game_System_initialize =
		Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		McKathlin.MessageControl.Game_System_initialize.call(this);
		this._messageTextWrapEnabled =
			McKathlin.MessageControl.param.wordWrapMessageWindow;
	};

	// New method
	Game_System.prototype.isMessageTextWrapEnabled = function() {
		return !!this._messageTextWrapEnabled;
	};

	// New method
	Game_System.prototype.enableMessageTextWrap = function() {
		this._messageTextWrapEnabled = true;
	};

	// New method
	Game_System.prototype.disableMessageTextWrap = function() {
		this._messageTextWrapEnabled = false;
	};

	// Extended method
	Window_Message.prototype.createTextState = function(text, x, y, width) {
		var textState = Window_Base.prototype.createTextState.call(
			this, text, x, y, width);
		if ($gameSystem.isMessageTextWrapEnabled()) {
			textState.text = this.wrapText(textState.text);
			textState.height = this.calcTextHeight(textState);
		}
		return textState;
	};

	// Overrides new method defined in this plugin,
	// to account for matters specific to Window_Message.
	Window_Message.prototype.widthForWrappingText = function() {
		var width = this.innerWidth;
		if ($gameMessage.faceName() !== "") {
			// account for face
			const FACE_SPACING = 16;
			width -= (ImageManager.faceWidth + FACE_SPACING);
		}
		width *= McKathlin.MessageControl.param.wordWrapWidthFraction;
		return width;
	};

	// New method
	// Starts putting message text on the same line when added.
	Game_Message.prototype.startSameLineText = function() {
		this._sameLineText = "";
	};

	// New method
	// Stops putting message text on the same line,
	// and adds the same-line text gathered so far as a single line.
	Game_Message.prototype.endSameLineText = function() {
		if (this._sameLineText && this._sameLineText.length > 0) {
			this._texts.push(this._sameLineText);
		}
		this._sameLineText = undefined;
	};

	// Extended method
	// Enables same-line text mode.
	McKathlin.MessageControl.Game_Message_add =
		Game_Message.prototype.add;
	Game_Message.prototype.add = function(text) {
		if (this._sameLineText !== undefined) {
			if (this._sameLineText.length == 0) {
				this._sameLineText += text;
			} else {
				this._sameLineText += ' ' + text;
			}
		} else {
			McKathlin.MessageControl.Game_Message_add.call(this, text);
		}
	};

	// Extended method
	// Forces multi-line message commands onto same line,
	// while otherwise leaving command101 as previously defined.
	McKathlin.MessageControl.Game_Interpreter_command101 =
		Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function(params) {
		if ($gameMessage.isBusy()) {
			return false;
		}
		if ($gameSystem.isMessageTextWrapEnabled()) {
			$gameMessage.startSameLineText();
		}
		var retVal = McKathlin.MessageControl.Game_Interpreter_command101.call(this, params);
		$gameMessage.endSameLineText();
		return retVal;
	};

	//----------------------------------------------------------------------------
	// Description word wrap
	//----------------------------------------------------------------------------

	if (McKathlin.MessageControl.param.wordWrapHelpWindow) {
		Window_Help.prototype.createTextState = function(text, x, y, width) {
			var textState = Window_Base.prototype.createTextState.call(
				this, text, x, y, width);
			var newText = textState.text.replaceAll('\n', ' '); // ignore newlines
			newText = this.wrapText(newText);
			textState.text = newText;
			textState.height = this.calcTextHeight(textState);
			return textState;
		};
	} // endif word wrap descriptions
})();