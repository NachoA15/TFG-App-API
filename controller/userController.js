const UserService = require('../service/userService')
const userService = new UserService();

const getUsers = async (req, res) => {
    try {
        if (typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== '' && !req.params.id.startsWith(' ')) {
            const user = await userService.findById(req.params.id);
            res.status(200).send({user: user});
        } else if (typeof req.query.name !== 'undefined' && typeof req.query.name !== null) {
            const users = await userService.findByName(req.query.name);
            res.status(200).send({users: users});
        }else {
            const users = await userService.findAll();
            res.status(200).send({users: users});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const addNewUser = async(req, res) => {
    try {
        const user = await userService.create(
            req.body.name,
            req.body.surname,
            req.body.birthDate,
            req.body.disabled
        );
        res.status(201).send({success: true, message: 'User created successfully', user: user});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        if (typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== '' && !req.params.id.startsWith(' ')) {
            if (typeof req.body.latitude !== 'undefined' && req.body.latitude !== null && req.body.latitude !== '') {
                const user = await userService.addLocation(
                    req.params.id,
                    req.body.latitude,
                    req.body.longitude,
                    req.body.timestamp
                );
                if (user) {
                    res.status(200).send({message: `Location added to user ${req.params.id} successfully`});
                } else {
                    res.status(400).send({message: `User ${req.params.id} does not exist`});
                }
            } else {
                const user = await userService.update(
                    req.params.id,
                    req.body.name,
                    req.body.surname,
                    req.body.birthDate,
                    req.body.disabled
                );
                if (user) {
                    res.status(200).send({message: `User ${req.params.id} updated successfully`, user: user});
                } else {
                    res.status(400).send({message: `User ${req.params.id} does not exist`});
                }
            }
        } else {
            res.status(400).send({success: false, message: `Cannot update user. User ${req.params.id} does not exist`});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.delete(req.params.id);
        if (user) {
            res.status(200).send({message: `User ${req.params.id} deleted successfully`, user: user});
        } else {
            res.status(400).send({message: `User ${req.params.id} does not exist`});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {getUsers, addNewUser, updateUser, deleteUser}