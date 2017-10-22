import config from 'config';
import utils from '~/utils'

class DevConsole {
    static defaultStyles = {
        method: "color: #808080; background: #101010; font-weight: bold; padding: 1px 8px"
    }

    constructor(enabled, styles=null) {
        this.enabled = enabled || config.env.development;
        this.styles = Object.assign({}, this.defaultStyles, styles);
    }

    log() {
        this.enabled && console.log.apply(null, arguments)
    }

    info() {
        this.enabled && console.info.apply(null, arguments)
    }

    warn() {
        this.enabled && console.warn.apply(null, arguments)
    }

    error() {
        this.enabled && console.error.apply(null, arguments)
    }

    method(name, ...args) {
        this.enabled && console.log(`%c::${name}()`, this.styles.method, ...args)
    }
}

global.logger = new DevConsole();

console.highlight = (...args) => {
    for (let arg in args) {
        if (utils.types.isString(arg)) {
            args[arg] = `%c${arg}`
        }
    }

    console.log(`%c[!]`, 'color: #47c27b; background: #44835f; margin: 12px 0', ...args);
}
// console.highlight = (...args) => console.log.apply(null, [`%c[!]`, DevConsole.defaultStyles.method, ...args]);

export default DevConsole
