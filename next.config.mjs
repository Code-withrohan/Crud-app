/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DB_URL : "mongodb+srv://ahmed:ahmed@edify.9anuaq1.mongodb.net/rohanform?retryWrites=true&w=majority&appName=edify",
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME : "dxjrn1fao" ,
        NEXT_PUBLIC_CLOUDINARY_API_KEY : '656592824741554',
        NEXT_PUBLIC_CLOUDINARY_API_SECRET : "QHtPwLvY2oPeaEPPAFFD6rAp6ao",
        NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET : "Crud app",
    },
};


export default nextConfig;
