import * as palettes from "./palettes";

/**
 * A registry containing all of the built-in themes for Lurka.
 */
class Registry {
  static themes = {
    'dark': palettes.darkRed,
    'light': palettes.light
  };

  static getTheme(name) {
    if (name in this.themes) {
      return this.themes[name];
    }

    throw new Error(`No theme exists that is called '${name}'`);
  }
}

Registry.defaultTheme = Registry.getTheme(Lurka.defaultTheme);

export default Registry
