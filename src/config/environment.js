/**
 * Runtime environment flags
 */
process.env.ELECTRON = process && process.versions && process.versions['electron']
process.env.CHROME = !!window.chrome
