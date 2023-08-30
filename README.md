# McKathlin Message Control for RPG Maker MZ

## Compatibility

We've done our best to make Message Control work easily with other plugins
regardless of plugin list order, particularly our plugins, as well as any
plugins that provide new escape characters.

However, conflicts are possible with other developers' plugins if they
heavily alter Game_Message, Window_Base, Window_Message, or Window_Help.

## How to Start Using This Plugin

1. Be aware that this plugin enables word wrap by default. You can now type
   paragraphs in your text commands without thinking about line lengths.
   When word wrap is on, normal line breaks in editor will be ignored.
   To make a line break in your message text, use the text code `<br>`
2. Look over Default Window Style and adjust its properties to your liking.
   For more details, look in this help text for the Plugin Parameters
   section, Window Style Presets subsection.
3. If your game sometimes needs a message window with a different size,
   dimensions, or other properties, define a preset for each style in the
   plugin parameter called Window Style Presets. You can call and apply
   these presets in your events with the Use Preset plugin command.
4. By default, changes made by calling Use Preset, Turn Word Wrap ON/OFF,
   or Adaptive Position plugin commands will automatically reset to default
   after each event finishes. If you want these changes to be permanent for
   each game save, find the plugin parameter Auto-Revert to Default Style
   and turn it OFF.
5. As needed, adjust the remaining plugin parameters to make your game's
   message windows and choice lists to look the way you want. For more info,
   refer to the Plugin Parameters section of this help text.
6. To learn all the ways you can alter the message window as the game runs,
   refer to the Plugin Commands section below.

## Plugin Commands

- **Position Center**: Start centering the message window horizontally.
- **Position Left**: Start positioning the message window on the
  left side of the screen.
- **Position Right**: Start positioning the message window on the
  right side of the screen.
- **Use Preset**: Start using the window style defined in the preset named
  in the Preset Name argument. For info on setting up presets,
  see this help text's Plugin Paramters section for Window Style Presets.
- **Reset to Default**: Reset the window style to default settings.
- **Save Preset as New Default**: The preset named in this command's Preset Name
  will be the new default window style, preserved in the current game's save data.
- **Save Current Settings as New Default**: The current message window style settings
  (color, size, word wrap, etc.) will be the new default window style, preserved in the current game's save data.
- **Turn Word Wrap OFF**: Disables word wrap in this event's message window.
  When word wrap is off, editor newlines are honored.
- **Turn Word Wrap ON**: Enables word wrap in this event's message window.
  When word wrap is turned on, line breaks from the editor are ignored.
  To force a line break in a specific place, use the text code `<br>`
- **Adaptive Position: Player**: Start making the message window adapt to the
  position of the player.
    * If a bottom-positioned message window would overlap the player,
      it's top-positioned instead.
    * If a top-positioned message window would overlap the player,
      it's put on the bottom instead.
    * A middle-positioned messsage window stays where it is regardless of overlap.
    * An Adaptive Position call lasts until the end of the active event's processing.
- **Adaptive Position: Event**: Start making the message window avoid overlapping the
  event that contains this plugin command call. As with Adaptive Position: Player,
  bottom may shift to top, or top to bottom, but middle stays where it is.
- **Adaptive Position: Off**: Disable the Adaptive Position feature until the active
  event's processing ends. Message Windows will show up exactly where their text
  commands dictate, regardless of the position of any on-screen sprite.

## Plugin Parameters

### Default Window Style
Use this to customize the width, number of lines of text, color, text
alignment, word wrap, etc. The message window will return to these settings
whenever the "Reset to Default" plugin command is called.
See Window Style Presets below for more info on properties.

### Window Style Presets
Define message window styles here, and you can call them in events with the
Use Preset plugin command. Each window style preset is a bundle of message
window properties, as follows:
- **Name**: A unique name for this preset. Use this to reference a preset
  in the Use Preset plugin command.
- **Width**: Message window width in pixels. If blank or zero, RMMZ's default
  message window width applies.
- **Line Count**: Message window is tall enough for this many lines of text.
- **Color**: This preset's message window color. Leave blank to use the game's
  default window color. Name box and choice list also take on the message color,
  but field menu and other in-game windows are unaffected.
- **Text Align**: Align message window text lines Left, Center, or Right.
   * DISCLAIMER: Using the text size change codes `\{` and `\}` may throw off
     line length calculations used by word wrap and center and right text alignment.
     Other RMMZ text codes have full Message Control support.
- **Word Wrap**: Whether to use text wrapping.
  When word wrap is on, editor line breaks are ignored.
  Use `<br>` to insert a line break into message text.
- **Adaptive Position Target**:  Active Event, Player, or None.
  Move bottom window to top, or top window to bottom, to avoid overlapping the
  target character, if any. Middle windows stay in the middle always.
- **Instant Text**: If true, each page of text appears in the window instantly.
- **Page Break Between Text Commands**:
   * If true, each text command starts a new page. This is default RMMZ behavior.
   * If false, consecutive text commands flow together onto the same page if
     there's room, and if text command properties (name, position, etc.)
     match from one command to the next.
   * Turning off the page break can be useful for presets that have large line counts.

### Auto-Revert to Default Style
If this plugin parameter is turned ON, the window style will automatically
return to the Default Window Style at the end of processing any event.
If the auto-revert parameter is turned OFF, the last window style used
is permanent for the current save, until another Use Preset command or the
Reset to Default command runs.

### Word Wrap Width Percent
Word wrap relies on JavaScript's text width measurement feature, which
behaves differently depending on the font you use. If you've turned on
word wrap but text overflows the right side of the message window,
decrease the plugin parameter Word Wrap Width Percent slightly
until it looks better. A fraction of a point may be enough.

If your text stops too far short of the right edge of the window,
increase Word Wrap Width Percent slightly.

Leaving Word Wrap Width Percent blank, or entering a value smaller than
10, will cause the game to use the default value, which is 99.5%.

### Word Wrap Help Window
Use this plugin parameter to turn word wrap ON or OFF for text shown
in menus' help window.

To turn word wrap ON or OFF in the message window, use the plugin command
`Turn Word Wrap ON` or `Turn Word Wrap OFF`, or customize the window style
preset to have word wrap on or off.

### Text Y Adjust
Text Y Adjust alters where text sits on its line. If you notice the font
you've chosen sits too high on its line, a positive Text Y Adjust can
improve its appearance. Or if the text sits too low, a negative Text Y
Adjust can correct it.

### Line Height Adjust
Line Height Adjust increases or decreases line height by a given number of
pixels. If the text in the font and size you've chosen looks cramped, a
positive Line Height adjust can give it vertical space. Lines per window
will remain the same, so increasing Line Height Adjust makes the message
window and other text-holding windows taller. A negative Line Height Adjust
makes windows more compact; each contained line takes less vertical space.

### Window Margin
The parameter Window Margin alters the distance from the edge of UI
windows, to the edge of the map or background on all sides.
RMMZ's default is 4; a 4-pixel-wide sliver of background shows beyond
window edges.
Increase Window Margin to show a wider band of background.
Decrease Window Margin to 0 to put the window's edge flush with the edge
of the game's display, a look typical of retro games.

### Dim Window Style
RPG Maker MZ's text commands provide three background options:
Window, Dim, and Transparent. When the background is Dim, by default
RMMZ puts a gradient on the top and bottom of the message area.
If you want your game's dim message area to have a hard edge,
set the Dim Window Style parameter to Hard Edge.

Hard Edge dim windows use the exact same margins as standard windows.
Gradient Edge dim windows extend 4px outside standard window margins.
Dim windows of either style use all attributes of the active Window Style
Preset, except for color.

### Show Window Contents Back Panels
By default, RPG Maker MZ puts a gradient panel behind each selectable item
on choice lists and on every selectable list or menu in the game.
If you don't your game's UI to show these back panels, set the parameter
"Show Window Contents Back Panels" to OFF (false).

### For more help using the Message Control plugin, see [Tyruswoo.com](https://www.tyruswoo.com).

## Version History:

**v1.0** - 6/19/2021
- Word wrap
- Text line adjustments

**v1.1** - 9/10/2021
- Fixed bug where words longer than a whole line of text sometimes
  caused the game to freeze when word wrap was on.
- Words longer than 1 line now wrap mid-word.
- Added "Word Wrap Width Percent" parameter, which can be adjusted
  so that word wrap works correctly for your game's font.

**v2.0** - 12/12/2021
- Presets can adjust message window width, line count, align, etc.
  all at once with a single plugin command.
- Window style auto-reverts when each event stops running.
- Dim windows may have gradient edge or hard edge.
- Message windows can position dynamically to avoid overlapping
  the player or the active event.

**v2.1** - 12/27/2021
- Fixed crash at start of random battles when adaptive window
  placement is set to active event.

**v2.1.1** - 8/30/2023
- This plugin is now free and open source under the [MIT license](https://opensource.org/license/mit/).

> Happy storytelling!
> 
> -McKathlin
