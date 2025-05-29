import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "@/lib/db";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique route key
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      
      // In a real implementation, we would verify the user is authenticated
      // const { userId } = auth();
      // if (!userId) throw new Error("Unauthorized");
      
      // For now, we'll just return some metadata
      return { 
        uploadedBy: "Admin",
        timestamp: new Date().toISOString(),
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.uploadedBy);
      console.log("File URL:", file.url);
      
      // In a real implementation, we would save the file info to the database
      // await db.productImage.create({
      //   data: {
      //     name: file.name,
      //     url: file.url,
      //     size: file.size,
      //     type: "image",
      //     uploadedBy: metadata.uploadedBy,
      //     createdAt: new Date(metadata.timestamp),
      //   },
      // });
      
      // Return the file info to the client
      return { 
        uploadedBy: metadata.uploadedBy,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),
    
  productManual: f({ pdf: { maxFileSize: "16MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      
      // In a real implementation, we would verify the user is authenticated
      // const { userId } = auth();
      // if (!userId) throw new Error("Unauthorized");
      
      // For now, we'll just return some metadata
      return { 
        uploadedBy: "Admin",
        timestamp: new Date().toISOString(),
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.uploadedBy);
      console.log("File URL:", file.url);
      
      // In a real implementation, we would save the file info to the database
      // await db.productManual.create({
      //   data: {
      //     name: file.name,
      //     url: file.url,
      //     size: file.size,
      //     type: "manual",
      //     uploadedBy: metadata.uploadedBy,
      //     createdAt: new Date(metadata.timestamp),
      //   },
      // });
      
      // Return the file info to the client
      return { 
        uploadedBy: metadata.uploadedBy,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
