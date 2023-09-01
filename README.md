## WARNING: This is an older version!
It lacks the features and improvements of this plugin's later versions.
To get the latest version for free, visit
[Tyruswoo.com](https://www.tyruswoo.com).

# McKathlin Message Control 1.1.1 for RPG Maker MZ

## Compatibility

We've done our best to make Message Control work easily with other plugins
regardless of plugin list order, particularly our plugins, as well as any
plugins that provide new escape characters.

However, conflicts are possible with other developers' plugins if they
heavily alter Game_Message, Window_Base, Window_Message, or Window_Help.

## Plugin Commands

- **Turn Word Wrap OFF**: Disables word wrap in this event's message window.
  When word wrap is off, editor newlines are honored.
- **Turn Word Wrap ON**: Enables word wrap in this event's message window.
  When word wrap is turned on, line breaks from the editor are ignored.
  To force a line break in a specific place, use the text code `<br>`

## Text Adjustment

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

## Word Wrap

When word wrap is turned on, line breaks entered in the editor are ignored,
as the message window instead puts line breaks whenever a line
is out of space for text.
To make the message window insert a line break in word wrap mode,
use the text code `<br>`

### Word Wrap Width Percent
Word wrap relies on JavaScript's text width measurement feature, which
behaves differently depending on the font you use. If you've turned on
word wrap but text overflows the right side of the message window,
decrease the plugin parameter Word Wrap Width Percent slightly
until it looks better. A fraction of a point may be enough.

If your text stops too far short of the right edge of the window,
increase Word Wrap Width Percent slightly.

### Word Wrap Help Window
Use this plugin parameter to turn word wrap ON or OFF for text shown
in menus' help window.

To turn word wrap ON or OFF in the message window, use the plugin command
`Turn Word Wrap ON` or `Turn Word Wrap OFF`, or customize the window style
preset to have word wrap on or off.

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

**v1.1.1** - 8/31/2023
- This older plugin version is now free and open source under the [MIT license](https://opensource.org/license/mit/).

> Happy storytelling!
> 
> -McKathlin
