const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadVideo() {
  try {
    // Make sure you have BLOB_READ_WRITE_TOKEN in your environment
    const videoPath = './src/videos/scioscribe-short-demo.mov';
    const videoBuffer = fs.readFileSync(videoPath);
    
    const blob = await put('scioscribe-short-demo.mov', videoBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log('✅ ScioScribe video uploaded successfully!');
    console.log('🔗 Blob URL:', blob.url);
    console.log('\n📝 Copy this URL to use in your HTML:');
    console.log(blob.url);
    
    return blob.url;
  } catch (error) {
    console.error('❌ Error uploading video:', error);
  }
}

uploadVideo(); 