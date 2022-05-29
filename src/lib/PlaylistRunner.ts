import { LoadedFile, LoadedFiles } from "types/files";

export class PlaylistRunner {

    private queue: LoadedFiles;
    private index: number = 0;


    public constructor (readonly files: LoadedFiles, private readonly loop: boolean) {
        this.queue = files;
    }

    public next (): LoadedFile | undefined {

        this.index++;

        /**
         * If the queue is empty and we wish to loop then
         * we need to reset the index currently looping
         * over and 
         */
        if (this.index > this.queue.length - 1 && this.loop) {
            this.index = 0;
        }

        return this.queue[this.index];
    }
}