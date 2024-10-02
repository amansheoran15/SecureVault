const Data = require('../../models/data');

// Create a new data entry
exports.createData = async (req, res) => {
    try {
        const { data, iv, type, nickname } = req.body;
        const sensitiveData = new Data({
            userId: req.user_id,
            data,
            iv,
            type,
            nickname: nickname || ''  // nickname is optional
        });
        await sensitiveData.save();
        res.status(201).json({ message: 'Data saved successfully', sensitiveData });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
};

// Get all data entries for the user
exports.getData = async (req, res) => {
    try {
        const sensitiveData = await Data.find({userId: req.user_id});
        res.status(200).json(sensitiveData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

// Get a specific data entry by ID
exports.getDataById = async (req, res) => {
    try {
        const sensitiveData = await Data.findById(req.params.id);
        if (!sensitiveData || sensitiveData.userId.toString() !== req.user_id) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(sensitiveData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

// Get all data of a specific type for the user (e.g., credit cards)
exports.getDataByType = async (req, res) => {
    try {
        const { type } = req.params;
        const sensitiveData = await Data.find({ userId: req.user_id, type });
        if (!sensitiveData.length) {
            return res.status(404).json({ message: `No ${type} found for the user` });
        }
        res.status(200).json(sensitiveData);
    } catch (error) {
        res.status(500).json({ message: `Error fetching ${type} data`, error });
    }
};

// Update a data entry
exports.updateData = async (req, res) => {
    try {
        const { data, iv, type, nickname } = req.body;
        const sensitiveData = await Data.findById(req.params.id);

        if (!sensitiveData || sensitiveData.userId.toString() !== req.user_id) {
            return res.status(404).json({ message: 'Data not found' });
        }

        sensitiveData.data = data || sensitiveData.data;
        sensitiveData.iv = iv || sensitiveData.iv;
        sensitiveData.type = type || sensitiveData.type;
        sensitiveData.nickname = nickname !== undefined ? nickname : sensitiveData.nickname;

        await sensitiveData.save();
        res.status(200).json({ message: 'Data updated successfully', sensitiveData });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error });
    }
};

// Delete a data entry
exports.deleteData = async (req, res) => {
    try {
        const sensitiveData = await Data.findByIdAndDelete(req.params.id);

        if (!sensitiveData || sensitiveData.userId.toString() !== req.user_id) {
            return res.status(404).json({message: 'Data not found'});
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
};
