module.exports = class EventBus {
    constructor () {
        this._eventHandlers = {}
    }

    on (event, handler) {
        if (!handler || typeof handler !== 'function') {
            console.warn('EventBus.on() handler is required and it has to be a function')
            return
        }

        let handlers = this._eventHandlers[event]
        if (handlers) {
            handlers.push(handler)
        } else {
            this._eventHandlers[event] = [handler]
        }
    }

    off (event, handler) {
        if (arguments.length === 1) {
            this._eventHandlers[event] = null
        } else {
            this._eventHandlers[event] = (this._eventHandlers[event] || []).filter(h => {
                return h !== handler
            })
        }
    }

    once (event, handler) {
        handler.__eventBus__once = true
        this.on(event, handler)
    }

    emit (event, payload) {
        this._eventHandlers[event] = (this._eventHandlers[event] || []).filter(handler => {
            handler && handler.call(null, payload)
            return !handler.__eventBus__once
        })
    }
}