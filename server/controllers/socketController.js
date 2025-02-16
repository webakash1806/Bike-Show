import Contact from "../models/contact.model.js";
import ProductEnquiry from "../models/productEnquiry.model.js";
import TestDrive from "../models/testDriveForm.model.js";


const fetchLiveData = (io) => {
    try {
        const contactChangeStream = Contact.watch();
        const productEnquiryChangeStream = ProductEnquiry.watch();
        const testDriveChangeStream = TestDrive.watch();

        contactChangeStream.on('change', (change) => {

            if (change.operationType === 'insert') {
                io.emit('contactChange', change);
            }

            if (change.operationType === 'update') {
                const updateId = change.documentKey._id
                const updatedFields = change.updateDescription.updatedFields
                const changeDetails = { updateId, updatedFields }
                io.emit('contactUpdate', changeDetails);
            }
        });

        productEnquiryChangeStream.on('change', async (change) => {
            try {

                if (change.operationType === 'insert') {
                    io.emit('productEnquiryChange', change);
                }

                if (change.operationType === 'update') {
                    const updateId = change.documentKey._id
                    const updatedFields = change.updateDescription.updatedFields
                    const changeDetails = { updateId, updatedFields }
                    io.emit('productEnquiryUpdate', changeDetails);
                }
            } catch (error) {
                console.error('Error populating change stream data:', error);
            }
        });

        testDriveChangeStream.on('change', (change) => {

            if (change.operationType === 'insert') {

                io.emit('testDriveChange', change);
            }
            if (change.operationType === 'update') {
                const updateId = change.documentKey._id
                const updatedFields = change.updateDescription.updatedFields
                const changeDetails = { updateId, updatedFields }
                io.emit('testDriveUpdate', changeDetails);
            }
        });

        contactChangeStream.on('change', (change) => {

            if (change.operationType === 'insert') {
                io.emit('contactChange', change);
            }
            if (change.operationType === 'update') {
                const updateId = change.documentKey._id
                const updatedFields = change.updateDescription.updatedFields
                const changeDetails = { updateId, updatedFields }
                io.emit('contactUpdate', changeDetails);
            }
        });

        productEnquiryChangeStream.on('error', (error) => {
            console.error('productEnquiryChangeStream error:', error);
        });

        testDriveChangeStream.on('error', (error) => {
            console.error('testDriveChangeStream error:', error);
        });

    } catch (error) {
        console.error('Error initializing change stream:', error);
    }
};

export { fetchLiveData }