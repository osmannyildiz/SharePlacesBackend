import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const MIME_TYPES_MAP = {
	"image/jpeg": "jpg",
	"image/jpg": "jpg",
	"image/png": "png",
};

const imageUpload = multer({
	limits: 500_000, // 500 KB
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "static/uploads");
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPES_MAP[file.mimetype];
			const fn = uuidv4() + "." + ext;
			cb(null, fn);
		},
	}),
	fileFilter: (req, file, cb) => {
		let isValid = !!MIME_TYPES_MAP[file.mimetype];
		let error = isValid ? null : new Error("Invalid mime type.");
		cb(error, isValid);
	},
});

export default imageUpload;
