interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
    upload_preset: string;
}

export const cloudinaryConfig: CloudinaryConfig = {
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
    upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'default_preset'
};

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key) {
    console.warn('Cloudinary configuration is incomplete');
}


export const uploadToCloudinary = async (file: File): Promise<{ url: string | null; error: string | null }> => {
    // Validate file
    if (!file) {
        return { url: null, error: 'No file provided' };
    }


    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        return { url: null, error: 'Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.' };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return { url: null, error: 'File size too large. Maximum 5MB allowed.' };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.upload_preset);
    // formData.append('transformation', 'c_limit,w_1200,h_800');

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Upload failed');
        }

        const data = await response.json();
        return { url: data.secure_url, error: null };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return {
            url: null,
            error: error instanceof Error ? error.message : 'Upload failed due to an unknown error'
        };
    }
};