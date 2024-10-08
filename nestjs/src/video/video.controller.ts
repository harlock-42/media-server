import { Controller, Get, HttpException, HttpStatus, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";

@Controller('media')
export default class VideoController {
    @Get('video/:filename')
    getVideo(@Param('filename') filename: string, @Res() res: Response) {
        try {
            const mediaPath = process.env.MEDIA_PATH || '/app/media';
            const videoPath = join(mediaPath, "videos" , filename);
            console.log("videoPath", videoPath)
            const videoStream = createReadStream(videoPath);
    
            videoStream.on('open', () => {
                res.set({
                    'Content-Type': 'video/mp4',
                    'Content-Disposition': `inline; filename="${filename}"`,
                });
                videoStream.pipe(res);
            });
    
            videoStream.on('error', () => {
                res.status(404).json({ message: 'Video not found' });
            });    
        } catch (error) {
            console.error('Error serving video:', error.message);
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}