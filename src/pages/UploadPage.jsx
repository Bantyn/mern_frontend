import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2, UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = `${window.location.protocol}//${window.location.hostname}:5000`;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setUploadedUrl("");
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(`${"https://mern-backend-f5oi.onrender.com"|| API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedUrl(`${"https://mern-backend-f5oi.onrender.com"|| API_URL}/uploads/${res.data.filename}`);
      handleClear();
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed! Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/30 shadow-xl 
                   rounded-3xl p-15 text-center"
      >
        <h2 className="text-3xl font-bold text-white/30 tracking-wide mb-6">
          Upload File
        </h2>

        {/* Upload Area */}
        <label
          className="w-full h-66 flex flex-col items-center justify-center border-2 border-dashed 
                     border-gray/20 rounded-2xl cursor-pointer hover:bg-white/5 transition-all
                     text-gray-500"
        >
          {!preview ? (
            <div className="flex flex-col items-center">
              <UploadCloud size={50} className="opacity-70 mb-3" />
              <p className="text-lg font-medium">Drag & Drop or Click to Upload</p>
              <p className="text-sm opacity-70 mt-1">PNG, JPG, PDF allowed</p>
            </div>
          ) : (
            <div className="relative w-full h-full ">
              <img
                src={preview}
                className="w-full h-full object-cover rounded-lg relative"
              />

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClear();
                }}
                className="absolute top-0 right-0 rounded-lg items-center justify-center flex w-full h-full  bg-gray-600/50 text-white border-black p-2  
                           hover:bg-black/50 transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}

          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`mt-6 w-full py-3 rounded-xl text-lg font-semibold transition-all 
          ${loading || !file
            ? "bg-black cursor-not-allowed text-white/60"
            : "bg-white text-black border border-gray-400 hover:bg-black hover:text-white duration-500 shadow-lg"
          }`}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>

        {/* Uploaded Link */}
        {uploadedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-green-600/20 border border-green-500/30 
                       rounded-xl text-green-500 break-all"
          >
            <p className="font-semibold mb-2">Uploaded Successfully!</p>
            <a href={uploadedUrl} target="_blank" className="underline hover:text-green-700">
              {uploadedUrl}
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
