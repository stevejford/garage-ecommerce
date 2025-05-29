import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique route key
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const authResult = await auth();
      const userId = authResult.userId;
 
      // If you throw, the user will not be able to upload
      if (!userId) throw new Error("Unauthorized");
      
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // Return data that is passed to the client
      return { uploadedBy: metadata.userId as string };
    }),

  // PDF uploads for product manuals
  productManual: f({ pdf: { maxFileSize: "16MB", maxFileCount: 3 } })
    .middleware(async () => {
      const authResult = await auth();
      const userId = authResult.userId;

      if (!userId) throw new Error("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId as string };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
