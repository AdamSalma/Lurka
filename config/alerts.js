module.exports = module.exports.default = {
    watchEntityAlreadyRemoved: (entityId) => {
        return {
            'message': `Entity '${entityId}' is already removed from watch list.`,
            'type': 'warning',
            'duration': 5000
        }
    },

}
