import config from 'config';

const defaultStyles = {
    method: "color: #808080; background: #101010; font-weight: bold; padding: 1px 8px"
}

class DevConsole {
    constructor(enabled, styles) {
        this.enabled = enabled || config.env.development;
        this.styles = Object.assign({}, defaultStyles, styles);
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

global.logger = new DevConsole()
