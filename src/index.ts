const lg = global.console.log

export enum FGColor {
    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgMagenta = "\x1b[35m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m",
    FgGray = "\x1b[90m",
    STOP = "\x1b[0m"
}

export class Logger {
    constructor(public prefix: string = "", public fgColor = FGColor.FgGray) {

    }

    addPrefix(prefix: string, fgColor?: FGColor) {
        prefix = (fgColor === undefined) ? prefix : `${fgColor}${prefix}${FGColor.STOP}${this.fgColor}`
        this.prefix = `${this.prefix}/${prefix}`
    }

    log = (...args: any) => {
        const _args = [`\x1b[90m[${(new Date().toLocaleString().replace(",", ""))}]${FGColor.STOP}`]
        if (this.prefix) _args.push(`${this.fgColor}[${this.prefix}]${FGColor.STOP}`)
        _args.push(...args)
        lg(..._args)
    }
}


global.console.log = (...args) => {
    (new Logger()).log(...args)
}