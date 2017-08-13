import React, { Component } from 'react';
import connect from './connect'

const { apiBackoff } = window.appSettings;


export class Watcher extends Component {

    constructor(props) {
        super(props);

        this.register = {}
        this.timeoutRegister = {}
        this.updateRegister = {}

        this.delays = apiBackoff

        if (props.queue.length) {
            this.mapEntities()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.queue.length !== nextProps.queue.length;
    }

    componentDidUpdate(prevProps, prevState) {
        this.mapEntities()
    }

    mapEntities() {
        this.registerNewEntities()
        this.cleanupRegister()
    }

    registerNewEntities() {
        this.props.queue.map( entity => {
            if (!this.isRegistered(entity)) {
                console.log("Registering new entity", entity.id)
                this.registerEntity(entity);
                this.scheduleEntity(entity);
            }
        })
    }

    cleanupRegister() {
        for (let id in this.register) {
            if (!this.register.hasOwnProperty(id)) {
                return
            }

            let exists = false;
            this.props.queue.map( entity => {
                if (entity.id === id)
                    exists = true
            })

            if (!exists) {
                console.info(`Cleaning up registery...`)
                this.deregisterEntity(id);
                this.deregisterTimeout(id);
            }
        }
    }

    scheduleEntity(entity) {
        const delay = this.calculateEntityDelay(entity)
        var ref = setTimeout(() => this.update(entity.id), delay);
        this.registerTimeout(entity.id, ref)
    }

    registerTimeout(id, ref) {
        this.timeoutRegister[id] = ref
    }

    deregisterTimeout(id) {
        clearTimeout(this.timeoutRegister[id]);
        delete this.timeoutRegister[id]
    }

    calculateEntityDelay(entity) {
        const updateCount = this.updateRegister[entity.id];

        if (updateCount >= this.delays.length) {
            // Use max delay
            return this.delays[this.delays.length-1] * 1000
        }

        return this.delays[updateCount] * 1000
    }

    update(id) {
        this.props.updateWatchEntity(this.register[id], this.onUpdate)
    }

    onUpdate = ({ id, didUpdate, error }) => {
        // TODO: Do something with error...?
        console.log(`Watcher.onUpdate: Did '${id}' update? ${didUpdate}`)

        if (error) {
            console.error(error);
            this.deregisterEntity(id);
        } else {
            const entity = this.register[id]

            this.updateRegister[entity.id]++
            this.scheduleEntity(entity);
        }
    }

    registerEntity(entity) {
        this.updateRegister[entity.id] = 0
        this.register[entity.id] = entity;
    }

    deregisterEntity(id) {
        delete this.register[id]
    }

    isRegistered(entity) {
        return !!this.register[entity.id]
    }

    render() { return null }
}

export default connect(Watcher);
