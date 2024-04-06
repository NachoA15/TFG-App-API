const User = require('../db/model/user')
class ServiceUser {
    constructor() {}
    
    async findAll() {
        const res = await User.find();
        return res;
    }
    
    async findById(id) {
        const res = await User.findById(id);
        return res;
    }

    async findByName(name) {
        const res = await User.find(
            {
                name: {
                    '$regex': name,
                    '$options': 'i'
                }
            }
        );
        return res;
    }

    async create(name, surname, birthDate, disabled) {
        const res = await User.create(
            {
                name: name,
                surname: surname,
                birthDate: birthDate,
                disabled: disabled,
                locations: []
            }
        );
        return res;
    }

    async update(userId, name, surname, birthDate, disabled) {
        const res = await User.findByIdAndUpdate(userId,
            {
                name: name,
                surname: surname,
                birthDate: birthDate,
                disabled: disabled
            },
            {
                returnOriginal: false
            }
        );
        return res;
    }

    async addLocation(userId, latitude, longitude, timestamp) {
        const user = await User.findById(userId);
        const userLocations = user.locations;
        const newLocation = {
            latitude: latitude,
            longitude: longitude,
            timestamp: timestamp
        };
        userLocations.push(newLocation);
        const res = await User.findByIdAndUpdate(userId,
            {
                locations: userLocations
            }
        );
        return res;
    }

    async delete(userId) {
        const res = await User.findByIdAndDelete(userId);
        return res;
    }
}

module.exports = ServiceUser