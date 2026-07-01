const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }

        const result = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload_stream(

                {
                    folder: "farmfresh"
                },

                (error, result) => {

                    if (error) reject(error);
                    else resolve(result);

                }

            ).end(req.file.buffer);

        });

        return res.status(200).json({

            success: true,
            imageUrl: result.secure_url

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message,
            error

        });

    }

};

module.exports = {
    uploadImage
};