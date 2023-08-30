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
 * @plugindesc v2.1 Alter message window size, color, position, etc.
 * @author McKathlin and Tyruswoo
 * @url https://www.tyruswoo.com
 *
 * @help McKathlin Message Control for RPG Maker MZ
 * ============================================================================
 * Dependencies
 * ============================================================================
 * We've done our best to make Message Control work easily with other plugins
 * regardless of plugin list order, particularly our plugins, as well as any
 * plugins that provide new escape characters.
 * However, conflicts are possible with other developers' plugins if they
 * heavily alter Game_Message, Window_Base, Window_Message, or Window_Help.
 * 
 * ============================================================================
 * How to Start Using This Plugin
 * ============================================================================
 * 1. Be aware that this plugin enables word wrap by default. You can now type
 *    paragraphs in your text commands without thinking about line lengths.
 *    When word wrap is on, normal line breaks in editor will be ignored.
 *    To make a line break in your message text, use the text code <br>
 * 2. Look over Default Window Style and adjust its properties to your liking.
 *    For more details, look in this help text for the Plugin Parameters
 *    section, Window Style Presets subsection.
 * 3. If your game sometimes needs a message window with a different size,
 *    dimensions, or other properties, define a preset for each style in the
 *    plugin parameter called Window Style Presets. You can call and apply
 *    these presets in your events with the Use Preset plugin command.
 * 4. By default, changes made by calling Use Preset, Turn Word Wrap ON/OFF,
 *    or Adaptive Position plugin commands will automatically reset to default
 *    after each event finishes. If you want these changes to be permanent for
 *    each game save, find the plugin parameter Auto-Revert to Default Style
 *    and turn it OFF.
 * 5. As needed, adjust the remaining plugin parameters to make your game's
 *    message windows and choice lists to look the way you want. For more info,
 *    refer to the Plugin Parameters section of this help text.
 * 6. To learn all the ways you can alter the message window as the game runs,
 *    refer to the Plugin Commands section below.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * Position Center     - Start centering the message window horizontally.
 * 
 * Position Left       - Start positioning the message window on the left
 *                       side of the screen.
 * 
 * Position Right      - Start positioning the message window on the right
 *                       side of the screen.
 * 
 * Use Preset          - Start using the window style defined in the
 *                       preset named in the Preset Name argument.
 *                       For info on setting up presets, see this help text's
 *                       Plugin Paramters section for Window Style Presets.
 * 
 * Reset to Default    - Reset the window style to default settings.
 * 
 * Save Preset as New Default
 *                     - The preset named in this command's Preset Name
 *                       will be the new default window style, preserved in
 *                       the current game's save data.
 * 
 * Save Current Settings as New Default
 *                     - The current message window style settings (color, size,
 *                       word wrap, etc.) will be the new default window style,
 *                       preserved in the current game's save data.
 * 
 * Turn Word Wrap OFF  - Disables word wrap in this event's message window.
 *                       When word wrap is off, editor newlines are honored.
 * 
 * Turn Word Wrap ON   - Enables word wrap in this event's message window.
 *                       When word wrap is turned on, line breaks from the editor
 *                       are ignored. To force a line break in a specific place,
 *                       use the text code <br>
 * 
 * Adaptive Position: Player
 *                     - Start making the message window adapt to the position
 *                       of the player. If a bottom-positioned message window
 *                       would overlap the player, it's top-positioned instead.
 *                       If a top-positioned message window would overlap the
 *                       player, it's put on the bottom instead.
 *                       A middle-positioned messsage window stays where it is
 *                       regardless of overlap.
 *                       An Adaptive Position call lasts until the end of the
 *                       active event's processing.
 * 
 * Adaptive Position: Event
 *                     - Start making the message window avoid overlapping the
 *                       event that contains this plugin command call. As with
 *                       Adaptive Position: Player, bottom may shift to top,
 *                       or top to bottom, but middle stays where it is.
 * 
 * Adaptive Position: Off
 *                     - Disable the Adaptive Position feature until the active
 *                       event's processing ends. Message Windows will show up
 *                       exactly where their text commands dictate, regardless
 *                       of the position of any on-screen sprite.
 * 
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 * Default Window Style
 * ---------------------
 * Use this to customize the width, number of lines of text, color, text
 * alignment, word wrap, etc. The message window will return to these settings
 * whenever the "Reset to Default" plugin command is called.
 * See Window Style Presets below for more info on properties.
 * 
 * Window Style Presets
 * ---------------------
 * Define message window styles here, and you can call them in events with the
 * Use Preset plugin command. Each window style preset is a bundle of message
 * window properties, as follows:
 * 
 *   Name         - A unique name for this preset. Use this to reference
 *                  a preset in the Use Preset plugin command.
 * 
 *   Width        - Message window width in pixels. If blank or zero,
 *                  RMMZ's default message window width applies.
 * 
 *   Line Count   - Message window is tall enough for this many lines of text.
 * 
 *   Color        - This preset's message window color. Leave blank to use the
 *                  game's default window color.
 *                  Name box and choice list also take on the message color,
 *                  but field menu and other in-game windows are unaffected.
 * 
 *   Text Align   - Align message window text lines Left, Center, or Right.
 *                  DISCLAIMER: Using the text size change codes \{ and \}
 *                  may throw off line length calculations used by word wrap
 *                  and center and right text alignment. Other RMMZ text codes
 *                  have full Message Control support.
 * 
 *   Word Wrap    - Whether to use text wrapping.
 *                  When word wrap is on, editor line breaks are ignored.
 *                  Use <br> to insert a line break into message text.
 * 
 *   Adaptive Position Target
 *                - Active Event, Player, or None.
 *                  Move bottom window to top, or top window to bottom, to
 *                  avoid overlapping the target character, if any.
 *                  Middle windows stay in the middle always.
 *   
 *   Instant Text - If true, each page of text appears in the window instantly.
 * 
 *   Page Break Between Text Commands
 *                - If true, each text command starts a new page. This is
 *                  default RMMZ behavior. If false, consecutive text commands
 *                  flow together onto the same page if there's room, and if
 *                  text command properties (name, position, etc.) match from
 *                  one command to the next.
 *                  Turning off the page break can be useful for presets that
 *                  have large line counts.
 * 
 * Auto-Revert to Default Style
 * -----------------------------
 * If this plugin parameter is turned ON, the window style will automatically
 * return to the Default Window Style at the end of processing any event.
 * If the auto-revert parameter is turned OFF, the last window style used
 * is permanent for the current save, until another Use Preset command or the
 * Reset to Default command runs.
 * 
 * Word Wrap Width Percent
 * ------------------------
 * Word wrap relies on JavaScript's text width measurement feature, which
 * behaves differently depending on the font you use. If you've turned on
 * word wrap but text overflows the right side of the message window,
 * decrease the plugin parameter Word Wrap Width Percent slightly
 * until it looks better. A fraction of a point may be enough.
 * If your text stops too far short of the right edge of the window,
 * increase Word Wrap Width Percent slightly.
 * Leaving Word Wrap Width Percent blank, or entering a value smaller than
 * 10, will cause the game to use the default value, which is 99.5%.
 * 
 * Word Wrap Help Window
 * ----------------------
 * Use this plugin parameter to turn word wrap ON or OFF for text shown
 * in menus' help window.
 * To turn word wrap ON or OFF in the message window, use the plugin command
 * Turn Word Wrap ON or Turn Word Wrap OFF, or customize the window style
 * preset to have word wrap on or off.
 * 
 * Text Y Adjust
 * ---------------
 * Text Y Adjust alters where text sits on its line. If you notice the font
 * you've chosen sits too high on its line, a positive Text Y Adjust can
 * improve its appearance. Or if the text sits too low, a negative Text Y
 * Adjust can correct it.
 * 
 * Line Height Adjust
 * -------------------
 * Line Height Adjust increases or decreases line height by a given number of
 * pixels. If the text in the font and size you've chosen looks cramped, a
 * positive Line Height adjust can give it vertical space. Lines per window
 * will remain the same, so increasing Line Height Adjust makes the message
 * window and other text-holding windows taller. A negative Line Height Adjust
 * makes windows more compact; each contained line takes less vertical space.
 * 
 * Window Margin
 * --------------
 * The parameter Window Margin alters the distance from the edge of UI
 * windows, to the edge of the map or background on all sides.
 * RMMZ's default is 4; a 4-pixel-wide sliver of background shows beyond
 * window edges.
 * Increase Window Margin to show a wider band of background.
 * Decrease Window Margin to 0 to put the window's edge flush with the edge
 * of the game's display, a look typical of retro games.
 * 
 * Dim Window Style
 * -----------------
 * RPG Maker MZ's text commands provide three background options:
 * Window, Dim, and Transparent. When the background is Dim, by default
 * RMMZ puts a gradient on the top and bottom of the message area.
 * If you want your game's dim message area to have a hard edge,
 * set the Dim Window Style parameter to Hard Edge.
 * Hard Edge dim windows use the exact same margins as standard windows.
 * Gradient Edge dim windows extend 4px outside standard window margins.
 * Dim windows of either style use all attributes of the active Window Style
 * Preset, except for color.
 * 
 * Show Window Contents Back Panels
 * ---------------------------------
 * By default, RPG Maker MZ puts a gradient panel behind each selectable item
 * on choice lists and on every selectable list or menu in the game.
 * If you don't your game's UI to show these back panels, set the parameter
 * "Show Window Contents Back Panels" to OFF (false).
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
 * v1.1  9/10/2021
 *        - Fixed bug where words longer than a whole line of text sometimes
 *          caused the game to freeze when word wrap was on.
 *        - Words longer than 1 line now wrap mid-word.
 *        - Added "Word Wrap Width Percent" parameter, which can be adjusted
 *          so that word wrap works correctly for your game's font.
 * 
 * v2.0  12/12/2021
 *        - Presets can adjust message window width, line count, align, etc.
 *          all at once with a single plugin command.
 *        - Window style auto-reverts when each event stops running.
 *        - Dim windows may have gradient edge or hard edge.
 *        - Message windows can position dynamically to avoid overlapping
 *          the player or the active event.
 * 
 * v2.1  12/27/2021
 *        - Fixed crash at start of random battles when adaptive window
 *          placement is set to active event.
 * 
 * v2.1.1  8/30/2023
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
 * @param Default Window Style
 * @type struct<windowStylePreset>
 * @default {"name":"Default","width":"0","lineCount":"4","color":"{\"red\":\"0\",\"green\":\"0\",\"blue\":\"0\"}","textAlign":"Left","wordWrap":"true","adaptivePositionTarget":"None","instantText":"false","pageBreakBetweenTextCommands":"true"}
 * @desc Message window color, width, line count, word wrap mode, etc.
 * to use by default.
 * 
 * @param Window Style Presets 
 * @type struct<windowStylePreset>[]
 * @default []
 * @desc Bundles of message window attributes: color, width, line count, etc.
 * Set the message window to a preset with one plugin command.
 * 
 * @param Auto-Revert to Default Style
 * @type boolean
 * @default true
 * @desc At the end of processing an event, automatically
 * change the window style back to the game default.
 * 
 * @param Word Wrap Width Percent
 * @type decimal
 * @default 99.5
 * @desc Use this percent of the window's inner width as the
 * maximum text width per line, for word wrapping.
 * 
 * @param Word Wrap Help Window
 * @type boolean
 * @default true
 * @desc Whether to use text wrapping on descriptions in help windows.
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
 * @param Window Margin
 * @type number
 * @default 4
 * @desc Number of pixels from edge of window to edge of screen graphics.
 * 4 is RMMZ default; 0 is flush with screen edge.
 * 
 * @param Dim Window Style
 * @type select
 * @option Gradient Edge
 * @option Hard Edge
 * @default Gradient Edge
 * @desc Appearance of message window when Background = Dim
 * Gradient Edge is RMMZ's default.
 * 
 * @param Show Window Contents Back Panels
 * @type boolean
 * @desc Show gradient-decorated panels behind selectable items in windows
 * @default true
 * 
 * @command center
 * @text Position Center
 * @desc Center the message window's horizontal position on the screen.
 * 
 * @command left
 * @text Position Left
 * @desc Show the message window on the left side of the screen.
 * 
 * @command right
 * @text Position Right
 * @desc Show the message window on the right side of the screen.
 * 
 * @command preset
 * @text Use Preset
 * @desc Use the color, width, line count, etc. of the preset named.
 * @arg presetName
 * @text Preset Name
 * @type string
 * @desc The name of the preset to start using.
 * 
 * @command default
 * @text Reset to Default
 * @desc Change message window color, width, line count, etc.
 * back to your game's defaults.
 * 
 * @command save_preset_as_new_default
 * @text Save Preset as New Default
 * @desc The preset named will be the new default window style,
 * as part of the current game's permanent saved data.
 * @arg presetName
 * @text Preset Name
 * @type string
 * @desc The name of the style preset to use as the new default.
 * 
 * @command save_current_settings_as_new_default
 * @text Save Current Settings as New Default
 * @desc Current settings will be the new default window style,
 * as part of the current game's permanent saved data.
 * 
 * @command word_wrap_off
 * @text Turn Word Wrap OFF
 * @desc Stop using text wrapping on the message window.
 * 
 * @command word_wrap_on
 * @text Turn Word Wrap ON
 * @desc Start using text wrapping on the message window.
 * 
 * @command adaptive_position_player
 * @text Adaptive Position: Player
 * @desc Start making message window avoid overlapping player.
 * 
 * @command adaptive_position_event
 * @text Adaptive Position: Event
 * @desc Start making message window avoid overlapping active event.
 * 
 * @command adaptive_position_off
 * @text Adaptive Position: Off
 * @desc Turn off Adaptive Window Position feature.
 */

/*~struct~windowStylePreset:
 * @param name
 * @text Name
 * @type text
 * @desc The name used in a plugin command to assign this window style.
 * 
 * @param width
 * @text Width
 * @type number
 * @min 0
 * @default 0
 * @desc The window's width in pixels when this preset is assigned.
 * If blank or zero, the default width will be used.
 * 
 * @param lineCount
 * @text Line Count
 * @type number
 * @min 1
 * @default 4
 * @desc The number of lines of text shown in this preset. Default is 4.
 * 
 * @param color
 * @text Color
 * @type struct<rgbTone>
 * @default {"red":"0","green":"0","blue":"0"}
 * @desc The window color in this preset. Leave blank for your game's default.
 * 
 * @param textAlign
 * @text Text Align
 * @type select
 * @option Left
 * @option Center
 * @option Right
 * @default Left
 * @desc Where to align lines of text within the message window.
 * 
 * @param wordWrap
 * @text Word Wrap
 * @type boolean
 * @default true
 * @desc Whether to use text wrapping when this window style is active.
 * 
 * @param adaptivePositionTarget
 * @text Adaptive Position Target
 * @type select
 * @option None
 * @option Active Event
 * @option Player
 * @default None
 * @desc Move bottom window to top, or vice versa,
 * to avoid overlapping the target character.
 * 
 * @param instantText
 * @text Instant Text
 * @type boolean
 * @default false
 * @desc Whether all a page's text should appear in the window instantly.
 * 
 * @param pageBreakBetweenTextCommands
 * @text Page Break Between Text Commands
 * @type boolean
 * @default true
 * @desc Whether each text command starts a new page.
 * Turn OFF to put mulitple commands' text per page.
 */

/*~struct~rgbTone:
 * @param red
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @param green
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @param blue
 * @type number
 * @min -255
 * @max 255
 * @default 0
 */

(() => {
	const pluginName = "McKathlin_MessageControl";

	//============================================================================
	// Parameters and Constants
	//============================================================================
	// Parameter Parsing
	//----------------------------------------------------------------------------

	// Makes JSON array of window style presets into a lookup.
	// The lookup is indexed by both name and numberic index.
	McKathlin.MessageControl.makePresetsLookup = function(defaultPreset, arrayJson) {
		var lookup = {};
		lookup[defaultPreset.name] = defaultPreset;
		var presetArray = JSON.parse(arrayJson);
		for (let i = 0; i < presetArray.length; i++) {
			let preset = this.parsePreset(presetArray[i]);
			lookup[i] = preset;
			lookup[preset.name] = preset;
		}
		return lookup;
	};

	McKathlin.MessageControl.parsePreset = function(presetJson) {
		var preset = JSON.parse(presetJson);
		preset.width = Number(preset.width);
		preset.lineCount = Number(preset.lineCount);
		preset.color = this.parseRgbToneStruct(preset.color);
		preset.wordWrap = ("true" == preset.wordWrap);
		preset.instantText = ("true" == preset.instantText);
		preset.pageBreakBetweenTextCommands =
			("true" == preset.pageBreakBetweenTextCommands);
		return preset;
	};

	// Makes user-friendly color struct into the array form expected by RMMZ code
	McKathlin.MessageControl.parseRgbToneStruct = function(colorStructJson) {
		var colorStruct = JSON.parse(colorStructJson);
		return [
			Number(colorStruct.red),
			Number(colorStruct.green),
			Number(colorStruct.blue)
		];
	};

	//----------------------------------------------------------------------------
	// Parameter Declarations
	//----------------------------------------------------------------------------

	McKathlin.MessageControl.parameters = PluginManager.parameters(pluginName);
	McKathlin.MessageControl.param = McKathlin.MessageControl.param || {};

	// Window style presets
	McKathlin.MessageControl.param.startingDefaultWindowPreset =
		McKathlin.MessageControl.parsePreset(
			McKathlin.MessageControl.parameters['Default Window Style']);
	McKathlin.MessageControl.param.presetsByName =
		McKathlin.MessageControl.makePresetsLookup(
			McKathlin.MessageControl.param.startingDefaultWindowPreset,
			McKathlin.MessageControl.parameters['Window Style Presets']);
	McKathlin.MessageControl.param.autoRevert =
		McKathlin.MessageControl.parameters['Auto-Revert to Default Style'] == 'true';

	// Word Wrap Width Fraction
	McKathlin.MessageControl.defaultWordWrapWidthFraction = 0.995;
	if (McKathlin.MessageControl.parameters['Word Wrap Width Percent']) {
		McKathlin.MessageControl.param.wordWrapWidthFraction = 0.01 * Number(
			McKathlin.MessageControl.parameters['Word Wrap Width Percent']);
		if (McKathlin.MessageControl.param.wordWrapWidthFraction < 0.1) {
			// It's too small. Use the default value.
			McKathlin.MessageControl.param.wordWrapWidthFraction =
				McKathlin.MessageControl.defaultWordWrapWidthFraction;
		}
	} else {
		// It's blank or zero. Use the default value.
		McKathlin.MessageControl.param.wordWrapWidthFraction =
			McKathlin.MessageControl.defaultWordWrapWidthFraction;
	}

	// Word Wrap Help Window
	McKathlin.MessageControl.param.wordWrapHelpWindow =
		McKathlin.MessageControl.parameters['Word Wrap Help Window'] == 'true';

	// Text position adjustments
	McKathlin.MessageControl.param.textYAdjust =
		Number(McKathlin.MessageControl.parameters['Text Y Adjust']);
	McKathlin.MessageControl.param.lineHeightAdjust = 
		Number(McKathlin.MessageControl.parameters['Line Height Adjust']);

	// Margin for all windows
	McKathlin.MessageControl.param.windowMargin =
		Number(McKathlin.MessageControl.parameters['Window Margin']);

	// Dim window style
	McKathlin.MessageControl.param.dimWindowStyle =
		McKathlin.MessageControl.parameters['Dim Window Style'];

	// Back panels for selectable items
	McKathlin.MessageControl.param.showWindowContentsBackPanels =
		(McKathlin.MessageControl.parameters['Show Window Contents Back Panels'] == 'true');

	//============================================================================
	// Plugin Commands
	//============================================================================

	PluginManager.registerCommand(pluginName, "center", args => {
		$gameSystem.setMessagePosition('center');
	});

	PluginManager.registerCommand(pluginName, "left", args => {
		$gameSystem.setMessagePosition('left');
	});

	PluginManager.registerCommand(pluginName, "right", args => {
		$gameSystem.setMessagePosition('right');
	});

	PluginManager.registerCommand(pluginName, "preset", args => {
		const preset = McKathlin.MessageControl.param.presetsByName[args.presetName];
		if (!preset) {
			const warningFormat = "No such preset: %1\nIgnoring preset command.";
			console.warn(warningFormat.format(args.presetName));
			return;
		}
		$gameSystem.applyMessagePreset(preset);
		$gameMessage.requestSizeRefresh();
	});

	PluginManager.registerCommand(pluginName, "default", args => {
		$gameSystem.resetMessageControlToDefault();
	});

	PluginManager.registerCommand(pluginName, "save_preset_as_new_default", args => {
		const preset = McKathlin.MessageControl.param.presetsByName[args.presetName];
		if (!preset) {
			const warningFormat = "No such preset: %1\nIgnoring save_preset_as_new_default command.";
			console.warn(warningFormat.format(args.presetName));
		}
		$gameSystem.setDefaultMessagePreset(preset);
	});

	PluginManager.registerCommand(pluginName, "save_current_settings_as_new_default", args => {
		let preset = $gameSystem.getCurrentSettingsAsMessagePreset();
		$gameSystem.setDefaultMessagePreset(preset);
	});

	PluginManager.registerCommand(pluginName, "word_wrap_off", args => {
		$gameSystem.disableMessageTextWrap();
	});

	PluginManager.registerCommand(pluginName, "word_wrap_on", args => {
		$gameSystem.enableMessageTextWrap();
	});

	PluginManager.registerCommand(pluginName, "adaptive_position_event", args => {
		$gameSystem.setMessageAdaptivePositionTarget("event");
	});

	PluginManager.registerCommand(pluginName, "adaptive_position_player", args => {
		$gameSystem.setMessageAdaptivePositionTarget("player");
	});

	PluginManager.registerCommand(pluginName, "adaptive_position_off", args => {
		$gameSystem.setMessageAdaptivePositionTarget("none");
	});

	//=============================================================================
	// Game_System
	// The Game_System class is in charge of setting up and persisting
	// miscellaneous data that needs saving but isn't variables, switches,
	// or database items.
	// We extend it to keep message window settings.
	//=============================================================================

	//-- init on new game or load game --

	// Extended method
	McKathlin.MessageControl.Game_System_initialize =
		Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		McKathlin.MessageControl.Game_System_initialize.call(this);
		this.resetMessageControlToDefault();
	};

	// New method
	Game_System.prototype.resetMessageControlToDefault = function() {
		if (!this._messageControl) {
			this._messageControl = {};
		}
		
		if (!this._messageControl.isDefault) {
			this.applyMessagePreset(this.defaultMessagePreset());
			this._messageControl.isDefault = true;
		}
	};

	// New method
	Game_System.prototype.applyMessagePreset = function(preset) {
		this.setMessageWidth(preset.width);
		this.setMessageLineCount(preset.lineCount);
		this.setMessageWindowTone(preset.color);
		this.setMessageTextAlign(preset.textAlign);
		this.enableMessageTextWrap(preset.wordWrap);
		this.setMessageAdaptivePositionTarget(preset.adaptivePositionTarget);
		this.enableMessageInstantText(preset.instantText);
		this.enablePageBreakBetweenTextCommands(
			preset.pageBreakBetweenTextCommands);
	};

	//New method
	Game_System.prototype.getCurrentSettingsAsMessagePreset = function() {
		var preset = {
			width: this.messageWidth(),
			lineCount: this.messageLineCount(),
			color: this.messageWindowTone(),
			textAlign: this.messageTextAlign(),
			wordWrap: this.isMessageTextWrapEnabled(),
			adaptivePositionTarget: this.messageAdaptivePositionTarget(),
			instantText: this.isMessageInstantTextEnabled(),
			pageBreakBetweenTextCommands:
				this.isPageBreakBetweenTextCommandsEnabled()
		};
		return preset;
	};

	// New method
	Game_System.prototype.isMessageControlInitialized = function() {
		return !!this._messageControl;
	};

	// Extended method
	McKathlin.MessageControl.DataManager_correctDataErrors =
		DataManager.correctDataErrors;
	DataManager.correctDataErrors = function() {
		McKathlin.MessageControl.DataManager_correctDataErrors.call(this);
		if (!$gameSystem.isMessageControlInitialized() ||
			!$gameSystem.messageTextAlign()) {
			$gameSystem.resetMessageControlToDefault();
		}
	};

	//-- default preset --

	Game_System.prototype.defaultMessagePreset = function() {
		return this._messageControl.defaultPreset ||
			McKathlin.MessageControl.param.startingDefaultWindowPreset;
	};

	Game_System.prototype.setDefaultMessagePreset = function(preset) {
		if (!this._messageControl) {
			this._messageControl = {};
		}
		this._messageControl.defaultPreset = preset;
		// Current preset might not match default.
		this._messageControl.isDefault = false;
	};

	//-- position --

	Game_System.prototype.messagePosition = function() {
		return this._messageControl.position;
	};

	Game_System.prototype.setMessagePosition = function(keyword) {
		this._messageControl.position = keyword.toLowerCase();
		this._messageControl.isDefault = false;
	};

	//-- width --

	Game_System.prototype.messageWidth = function() {
		return this._messageControl.width || Graphics.boxWidth;
	};

	Game_System.prototype.setMessageWidth = function(width=null) {
		this._messageControl.width = width;
		this._messageControl.isDefault = false;
	};

	//-- line count --

	Game_System.prototype.messageLineCount = function() {
		return this._messageControl.lineCount;
	};

	Game_System.prototype.setMessageLineCount = function(count) {
		this._messageControl.lineCount = count;
		this._messageControl.isDefault = false;
	};

	//-- window color --

	Game_System.prototype.messageWindowTone = function() {
		return this._messageControl.windowTone;
	};

	Game_System.prototype.setMessageWindowTone = function(tone) {
		this._messageControl.windowTone = tone;
		this._messageControl.isDefault = false;
	};

	//-- text align --

	Game_System.prototype.messageTextAlign = function() {
		return this._messageControl.textAlign;
	};

	Game_System.prototype.setMessageTextAlign = function(alignString) {
		if (alignString) {
			this._messageControl.textAlign = alignString.toLowerCase();
		} else {
			this._messageControl.textAlign = "Left";
		}
		this._messageControl.isDefault = false;
	};

	//-- adaptive window position

	Game_System.prototype.messageAdaptivePositionTarget = function() {
		return this._messageControl.adaptivePositionTarget;
	};

	Game_System.prototype.setMessageAdaptivePositionTarget = function(value) {
		if ('string' === typeof value) {
			value = value.toLowerCase();
		} else if (!value) {
			value = "none";
		} else if (value == $gamePlayer) {
			value = "player";
		} else { // It's the active event.
			value = "event";
		}

		var target;
		if (value.includes("non")) {
			target = "none";
		} else if (value.includes("player")) {
			target = "player";
		} else if (value.includes("event")) {
			target = "event";
		} else {
			console.warn("Unrecognized adaptive position target: " + value);
			target = "none";
		}
		this._messageControl.adaptivePositionTarget = target;
		this._messageControl.isDefault = false;
	};

	//-- text wrap --

	// New method
	Game_System.prototype.isMessageTextWrapEnabled = function() {
		return !!this._messageControl.textWrapEnabled;
	};

	// New method
	Game_System.prototype.enableMessageTextWrap = function(value = true) {
		this._messageControl.textWrapEnabled = value;
		this._messageControl.isDefault = false;
	};

	// New method
	Game_System.prototype.disableMessageTextWrap = function() {
		this.enableMessageTextWrap(false);
	};

	//-- instant text --

	// New method
	Game_System.prototype.isMessageInstantTextEnabled = function() {
		return !!this._messageControl.instantTextEnabled;
	};

	// New method
	Game_System.prototype.enableMessageInstantText = function(value = true) {
		this._messageControl.instantTextEnabled = value;
		this._messageControl.isDefault = false;
	};

	// New method
	Game_System.prototype.disableMessageInstantText = function() {
		this.enableMessageInstantText(false);
	};

	//-- page break between text commands --

	// New method
	Game_System.prototype.isPageBreakBetweenTextCommandsEnabled = function() {
		return !!this._messageControl.pageBreakBetweenTextCommands;
	};

	Game_System.prototype.enablePageBreakBetweenTextCommands = function(value = true) {
		this._messageControl.pageBreakBetweenTextCommands = value;
		this._messageControl.isDefault = false;
	};

	Game_System.prototype.disablePageBreakBetweenTextCommands = function() {
		this.enablePageBreakBetweenTextCommands(false);
	};

	//=============================================================================
	// Game-wide UI adjustments
	//=============================================================================
	// Text Position Fine Tuning
	//-----------------------------------------------------------------------------
	
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

	//-----------------------------------------------------------------------------
	// Window Margin 
	//-----------------------------------------------------------------------------

	// Alias method
	// This is the least obtrusive place to customize window properties
	// before they're actually used.
	McKathlin.MessageControl.Window_createAllParts = Window.prototype.initialize;
	Window.prototype.createAllParts = function() {
		this._margin = McKathlin.MessageControl.param.windowMargin;
		McKathlin.MessageControl.Window_createAllParts.call(this);
	};

	// Replacement method
	// Identical to RMMZ's, except for boxMargin declaration.
	Scene_Boot.prototype.adjustBoxSize = function() {
		const uiAreaWidth = $dataSystem.advanced.uiAreaWidth;
		const uiAreaHeight = $dataSystem.advanced.uiAreaHeight;
		const boxMargin = McKathlin.MessageControl.param.windowMargin;
		Graphics.boxWidth = uiAreaWidth - boxMargin * 2;
		Graphics.boxHeight = uiAreaHeight - boxMargin * 2;
	};

	//-----------------------------------------------------------------------------
	// Dim Window Style
	//-----------------------------------------------------------------------------

	if (McKathlin.MessageControl.param.dimWindowStyle.startsWith("Hard Edge")) {
		// New method
		// Like RMMZ's, except that gradient edges are removed,
		// and width rules are the same as regular window width rules.
		Window_Base.prototype.refreshDimmerBitmap = function() {
			if (this._dimmerSprite) {
				const bitmap = this._dimmerSprite.bitmap;
				const x = 4; // Makes all margin widths work out, idk why
				const w = this.width > 0 ? this.width + x : 0;
				const h = this.height;
				const c1 = ColorManager.dimColor1();
				bitmap.resize(w, h);
				bitmap.fillRect(x, 0, w, h, c1);
				this._dimmerSprite.setFrame(0, 0, w, h);
			}
		}; // end method refreshDimmerBitmap
	} // endif it's a "Hard Edge" dim window style

	//-----------------------------------------------------------------------------
	// Show Window Contents Back Panels
	//-----------------------------------------------------------------------------
	
	if (!McKathlin.MessageControl.param.showWindowContentsBackPanels) {
		McKathlin.MessageControl.Window_Base_createContents =
			Window_Base.prototype.createContents;
		Window_Base.prototype.createContents = function() {
			McKathlin.MessageControl.Window_Base_createContents.call(this);
			this.contentsBack.paintOpacity = 0;
		};
	}

	//============================================================================
	// Message Window Changes
	//============================================================================
	// Game_Message size refresh signaling
	//----------------------------------------------------------------------------

	// Extended method
	McKathlin.MessageControl.Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() {
		McKathlin.MessageControl.Game_Message_clear.call(this);
		this._needsSizeRefresh = true;
	};

	// New method
	Game_Message.prototype.needsSizeRefresh = function() {
		return this._needsSizeRefresh;
	};

	// New method
	Game_Message.prototype.requestSizeRefresh = function() {
		this._needsSizeRefresh = true;
	};

	// New method
	Game_Message.prototype.markSizeRefreshComplete = function() {
		this._needsSizeRefresh = false;
	};

	//----------------------------------------------------------------------------
	// Window_Message change handling
	//----------------------------------------------------------------------------

	// activeEventCharacter is defined where needed in Tyruswoo/McKathlin plugins.
	if (!Game_Map.prototype.activeEventCharacter) {
		Game_Map.prototype.activeEventCharacter = function() {
			if (this._interpreter) {
				return this.event(this._interpreter.eventId());
			} else {
				return null;
			}
		};
	}

	// TODO: move position constants to somewhere better
	McKathlin.MessageControl.POSITION_TOP = 0;
	McKathlin.MessageControl.POSITION_MIDDLE = 1;
	McKathlin.MessageControl.POSITION_BOTTOM = 2;

	// New method
	// Like RMMZ's Window_Message updatePlacement, except that
	// adaptive positioning is handled, and left-right positioning.
	Window_Message.prototype.updatePlacement = function() {
		var character = null;
		if (this._positionType !== McKathlin.MessageControl.POSITION_MIDDLE &&
			!$gameParty.inBattle() &&
			"none" != $gameSystem.messageAdaptivePositionTarget()) {
			if ("event" == $gameSystem.messageAdaptivePositionTarget()) {
				character = $gameMap.activeEventCharacter();
			} else {
				character = $gamePlayer;
			}
		}
		if (character) {
			const eventY = character.screenY(); // bottom y of character on screen
			const eventHeight = 48; // TODO: account for tall characters
			let bottomOverlap = eventY - (Graphics.boxHeight - this.height);
			bottomOverlap = bottomOverlap.clamp(0, eventHeight);
			let topOverlap = this.height - (eventY - eventHeight);
			topOverlap = topOverlap.clamp(0, eventHeight);

			if (bottomOverlap > topOverlap) {
				this._positionType = McKathlin.MessageControl.POSITION_TOP;
			} else if (topOverlap > bottomOverlap) {
				this._positionType = McKathlin.MessageControl.POSITION_BOTTOM;
			} else {
				// There's either no overlap, or equal overlap.
				this._positionType = $gameMessage.positionType();
			}
		} else {
			this._positionType = $gameMessage.positionType();
		}
		this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;

		const goldWindow = this._goldWindow;
		if (goldWindow) {
			goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - goldWindow.height;
		}

		switch($gameSystem.messagePosition()) {
			case 'left':
				this.x = 0;
				break;
			case 'right':
				this.x = Graphics.boxWidth - this.width;
				break;
			default: // center
				this.x = (Graphics.boxWidth - this.width) / 2;
		}
	};

	// Extended method
	// Instant text option also makes page's text show fast.
	McKathlin.MessageControl.Window_Message_updateShowFast =
		Window_Message.prototype.updateShowFast;
	Window_Message.prototype.updateShowFast = function() {
		McKathlin.MessageControl.Window_Message_updateShowFast.call(this);
		if ($gameSystem.isMessageInstantTextEnabled()) {
			this._showFast = true;
		}
	};

	// Extended method
	McKathlin.MessageControl.Window_Message_startMessage =
		Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() {
		// Message window tone only changes at the start of a message page.
		this._messageTone = $gameSystem.messageWindowTone();
		if ($gameMessage.needsSizeRefresh()) {
			this.updateSize();
			$gameMessage.markSizeRefreshComplete();
		}
		McKathlin.MessageControl.Window_Message_startMessage.call(this);
		this._textState.x = this.findLineStartX(this._textState);
	};

	// New method
	Window_Message.prototype.currentTone = function() {
		return this._messageTone || $gameSystem.windowTone();
	};

	// Override of Window_Base.prototype.updateTone
	Window_Message.prototype.updateTone = function() {
		const tone = this.currentTone();
		this.setTone(tone[0], tone[1], tone[2]);
	};

	// New method
	Window_Message.prototype.updateSize = function() {
		this.width = $gameSystem.messageWidth();
		this.height = this.fittingHeight($gameSystem.messageLineCount()) + 8;
		this.createContents();
	};

	// Extended method
	McKathlin.MessageControl.Window_Message_processNewPage =
		Window_Message.prototype.processNewPage;
	Window_Message.prototype.processNewPage = function(textState) {
		McKathlin.MessageControl.Window_Message_processNewPage.call(
			this, textState);
		textState.x = this.findLineStartX(textState);
	};

	// Extended method
	McKathlin.MessageControl.Window_Message_processNewLine =
		Window_Message.prototype.processNewLine;
	Window_Message.prototype.processNewLine = function(textState) {
		McKathlin.MessageControl.Window_Message_processNewLine.call(
			this, textState);
		textState.x = this.findLineStartX(textState);
	};

	// New method
	Window_Message.prototype.findLineStartX = function(textState) {
		if ('left' == $gameSystem.messageTextAlign()) {
			return textState.startX;
		}
		const nextNewlineIdx = textState.text.indexOf('\n', textState.index);
		var line;
		if (nextNewlineIdx < 0) {
			// No newlines left. Use entire remainder of string.
			line = textState.text.substring(textState.index).trimEnd();
		} else {
			line = textState.text.substring(textState.index, nextNewlineIdx).trimEnd();
		}
		const spareWidth = this.widthForWrappingText() - this.printedTextWidth(line);
		if ('right' == $gameSystem.messageTextAlign()) {
			return textState.startX + spareWidth;
		} else {
			// It's center aligned.
			return textState.startX + (spareWidth / 2);
		}
	};

	// New method
	// Like Window_Base.prototype.textWidth, except that
	// it removes \x1b-escaped characters before measuring width.
	// More precise but requires more processing than textWidth.
	Window_Base.prototype.printedTextWidth = function(text) {
		const ICON_CODE_REGEX = /\x1bI\[\d{1,3}\]/g;
		const COLOR_CODE_REGEX = /\x1bC\[\d{1,3}\]/g;
		const iconWidth = ImageManager.iconWidth + 4;
		const iconCount = [...text.matchAll(ICON_CODE_REGEX)].length;
		var printedText = text.replaceAll(ICON_CODE_REGEX, "");
		printedText = printedText.replaceAll(COLOR_CODE_REGEX, "");
		printedText = printedText.replaceAll(/\x1b./g, "");
		return (iconCount * iconWidth) + this.contents.measureTextWidth(printedText);
	};

	//----------------------------------------------------------------------------
	// Window_NameBox adjustments
	//----------------------------------------------------------------------------

	// Override of Window_Base.prototype.updateTone
	Window_NameBox.prototype.updateTone = function() {
		if (this._messageWindow) {
			const tone = this._messageWindow.currentTone();
			this.setTone(tone[0], tone[1], tone[2]);
		} else {
			Window_Base.prototype.updateTone.call(this);
		}
	};

	//----------------------------------------------------------------------------
	// Window_ChoiceList adjustments
	//----------------------------------------------------------------------------

	// Override of Window_Base.prototype.updateTone
	Window_ChoiceList.prototype.updateTone = function() {
		if (this._messageWindow) {
			const tone = this._messageWindow.currentTone();
			this.setTone(tone[0], tone[1], tone[2]);
		} else {
			Window_Base.prototype.updateTone.call(this);
		}
	};

	// Extended method
	// Handles an edge case where a message window taller than half the screen
	// is placed on the bottom.
	McKathlin.MessageControl.Window_ChoiceList_windowY =
		Window_ChoiceList.prototype.windowY;
	Window_ChoiceList.prototype.windowY = function() {
		var wy = McKathlin.MessageControl.Window_ChoiceList_windowY.call(this);
		if (wy >= Graphics.boxHeight) {
			wy = this._messageWindow.y - this.windowHeight();
		}
		return wy;
	};

	//----------------------------------------------------------------------------
	// Support for more than 4 lines of text per page
	//----------------------------------------------------------------------------

	// Conditionally replaced method
	McKathlin.MessageControl.Game_Interpreter_command101_no_flow =
		Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function(params) {
		if ($gameSystem.isPageBreakBetweenTextCommandsEnabled()) {
			return McKathlin.MessageControl.Game_Interpreter_command101_no_flow.call(
				this, params);
		} else {
			return this.command101_flowPagesTogether(params);
		}
	};

	// New method
	// Like RMMZ's command101, but it collapses consecutive 101s into this one
	// if their parameters are alike.
	Game_Interpreter.prototype.command101_flowPagesTogether = function(params) {
		if ($gameMessage.isBusy()) {
			return false;
		}
		$gameMessage.setFaceImage(params[0], params[1]);
		$gameMessage.setBackground(params[2]);
		$gameMessage.setPositionType(params[3]);
		$gameMessage.setSpeakerName(params[4]);
		var eventCode = this.nextEventCode();
		while (401 === eventCode || 101 === eventCode) {
			if (401 === eventCode) {
				// Text data
				this._index++;
				$gameMessage.add(this.currentCommand().parameters[0]);
			} else if (101 === eventCode) {
				let nextCommand = this._list[this._index + 1];
				let identicalCommand =
					params[0] === nextCommand.parameters[0] &&
					params[1] === nextCommand.parameters[1] &&
					params[2] === nextCommand.parameters[2] &&
					params[3] === nextCommand.parameters[3] &&
					params[4] === nextCommand.parameters[4];
				if (identicalCommand) {
					this._index++;
				} else {
					break;
				}
				
			}
			eventCode = this.nextEventCode();
		}
		switch (this.nextEventCode()) {
			case 102: // Show Choices
				this._index++;
				this.setupChoices(this.currentCommand().parameters);
				break;
			case 103: // Input Number
				this._index++;
				this.setupNumInput(this.currentCommand().parameters);
				break;
			case 104: // Select Item
				this._index++;
				this.setupItemChoice(this.currentCommand().parameters);
				break;
		}
		this.setWaitMode("message");
		return true;
	};

	//----------------------------------------------------------------------------
	// Window style auto-revert
	//----------------------------------------------------------------------------

	if (McKathlin.MessageControl.param.autoRevert) {
		// Extended method
		// End of event processing returns window style to default.
		McKathlin.MessageControl.Game_Interpreter_terminate =
			Game_Interpreter.prototype.terminate;
		Game_Interpreter.prototype.terminate = function() {
			McKathlin.MessageControl.Game_Interpreter_terminate.call(this);
			$gameSystem.resetMessageControlToDefault();
		}
	}

	//============================================================================
	// Word Wrap
	//============================================================================
	// Shared word wrap functionality
	//----------------------------------------------------------------------------

	Window_Base.prototype.applyLineBreakTag = function(text) {
		text = text.replaceAll(/<br ?\/?> ?/gi, '<br>'); // standardize <br>
		text = text.replaceAll('<br>', '\n'); // Treat <br> as line break
		return text;
	};

	// New method
	Window_Base.prototype.wrapText = function(text) {
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
		return this.contents.width *
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
	Window_Message.prototype.createTextState = function(text, x, y, width) {
		var textState = Window_Base.prototype.createTextState.call(
			this, text, x, y, width);
		var textHeightChanged = false;
		if (text.includes('<br')) {
			textState.text = this.applyLineBreakTag(textState.text);
			textHeightChanged = true;
		}
		if ($gameSystem.isMessageTextWrapEnabled()) {
			textState.text = this.wrapText(textState.text);
			textHeightChanged = true;
		}
		if (textHeightChanged) {
			textState.height = this.calcTextHeight(textState);
		}
		return textState;
	};

	// Extended method
	// Window_ScrollText does text wrap the same way as Window_Message.
	// Both refer to the same system text wrap setting.
	Window_ScrollText.prototype.createTextState =
		Window_Message.prototype.createTextState;
	
	
	// Overrides new method defined in this plugin,
	// to account for matters specific to Window_Message.
	Window_Message.prototype.widthForWrappingText = function() {
		var width = this.contents.width;
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
	McKathlin.MessageControl.Game_Interpreter_command101_body =
		Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function(params) {
		if ($gameMessage.isBusy()) {
			return false;
		}
		if ($gameSystem.isMessageTextWrapEnabled()) {
			$gameMessage.startSameLineText();
		}
		var retVal = McKathlin.MessageControl.Game_Interpreter_command101_body.call(this, params);
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
			newText = this.applyLineBreakTag(newText);
			newText = this.wrapText(newText);
			textState.text = newText;
			textState.height = this.calcTextHeight(textState);
			return textState;
		};
	} else {
		Window_Help.prototype.createTextState = function(text, x, y, width) {
			var textState = Window_Base.prototype.createTextState.call(
				this, text, x, y, width);
			if (text.includes('<br')) {
				textState.text = this.applyLineBreakTag(text);
				textState.height = this.calcTextHeight(textState);
			}
			return textState;
		}
	} // end else of if word wrap description
})();