import { Module } from "@nestjs/common";
import VideoService from "./video.service";
import VideoController from "./video.controller";

@Module({
    imports: [],
    providers: [
        VideoService
    ],
    controllers: [
        VideoController
    ],
    exports: []
})
export class VideoModule {}