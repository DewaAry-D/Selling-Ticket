const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let targetFolder = 'public/others';

        if (file.fieldname === 'foto_profile') {
            targetFolder = 'public/foto_profile';
        } else if (file.fieldname === 'file_application') {
            targetFolder = 'public/file_application';
        } else if (file.fieldname === 'foto_event') {
            targetFolder = 'public/foto_event';
        }

        const fullPath = path.join(__dirname, '../../', targetFolder);

        if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        }

        cb(null, fullPath);
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

module.exports = upload;