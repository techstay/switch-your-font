# Switch your font

![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/techstay1989.switch-your-font?style=for-the-badge&color=%2341BC13)
![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/d/techstay1989.switch-your-font?style=for-the-badge)
![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/stars/techstay1989.switch-your-font?style=for-the-badge)

This extension allows you to configure editor and terminal fonts quickly in a quickPick menu.

## Config

Some fonts have their own ligatures, now you can set them in `switch-your-font.ligaturesMapping`. When switching fonts, the corresponding ligatures also apply.

Here are some examples.

```json
{
  "switch-your-font.ligaturesMapping": {
    "Cascadia Code": "'ss02', 'ss03', 'ss19', 'ss20'",
    "Iosevka Nerd Font Mono": "'ss12', 'calt', 'dlig'",
    "Jetbrains Mono": "'ss02'",
    "Monaspace Argon": "'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'ss10', 'liga', 'cv62'",
    "Monaspace Neon": "'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'ss10', 'liga', 'cv62', 'cv10'",
    "Victor Mono Medium": "'ss01', 'ss06', 'ss07', 'ss08'"
  }
}
```

## Commands

### > Switch Font

![live preview menu in action for editor font](https://i.ibb.co/WvvtwrkF/switch-font.webp)

### > Switch Terminal Font

![live preview menu in action for terminal font](https://i.ibb.co/cSCNTvZF/switch-terminal-font.webp)

### > Font Size

![changing editor font size](https://i.ibb.co/mFCvBnL3/set-font-size.webp)

### > Terminal Font Size

![changing terminal font size](https://i.ibb.co/JjscMqhD/set-terminal-font-size.webp)

## Extension Commands

This extension contributes the following commands:

- `font-switcher.switchFont`: Show a quickPick menu of the user defined editor font families.
- `font-switcher.setFontSize`: Show an input dialog for setting the font size
- `font-switcher.switchTerminalFont`: Show a quickPick menu of the user defined integrated terminal font families
- `font-switcher.setTerminalFontSize`: Show an input dialog for setting the terminal font size

## Thanks

This extension is based on [font-switcher](https://github.com/evan-buss/font-switcher), thanks for the great work.
