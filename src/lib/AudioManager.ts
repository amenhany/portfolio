export class AudioManager {
    private static instance: AudioManager;
    private ctx: AudioContext;
    private masterGain: GainNode;
    private musicGain: GainNode;
    private sfxGain: GainNode;
    private currentMusic?: AudioBufferSourceNode;
    private cache = new Map<string, AudioBuffer>();

    private currentPlayId = 0;

    private constructor() {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.connect(this.masterGain);
    }

    static Instance() {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    async load(url: string) {
        if (this.cache.has(url)) return this.cache.get(url)!;

        const arrayBuf = await fetch(url).then((res) => res.arrayBuffer());
        const audioBuf = await this.ctx.decodeAudioData(arrayBuf);
        this.cache.set(url, audioBuf);
        return audioBuf;
    }

    async playSfx(url: string, loop = false) {
        const buffer = await this.load(url);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.sfxGain);
        source.loop = loop;
        source.start(0);

        return source;
    }

    async playRandomSfx(...urls: string[]) {
        this.playSfx(urls[Math.floor(Math.random() * urls.length)]);
    }

    async playMusic(
        url: string,
        callback?: () => void,
        delay?: number,
        loop = false,
        loopStart = 0,
        loopEnd?: number,
    ) {
        const playId = ++this.currentPlayId;

        if (this.currentMusic) {
            this.currentMusic.stop();
        }

        const buffer = await this.load(url);
        if (playId !== this.currentPlayId) return;

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.musicGain);
        source.loop = loop;
        source.loopStart = loopStart;
        if (loopEnd) source.loopEnd = loopEnd;
        source.start(delay ? this.ctx.currentTime + delay : 0);

        this.currentMusic = source;
        source.onended = () => {
            if (this.currentMusic === source) {
                callback?.();
            }
        };
        return source;
    }

    async playPlaylist(playlist: string[], idx = 0) {
        let random = Math.floor(Math.random() * playlist.length);
        while (random === idx) random = Math.floor(Math.random() * playlist.length);
        this.playMusic(playlist[idx], () =>
            setTimeout(
                () => this.playPlaylist(playlist, random),
                4000 + Math.floor(Math.random() * 3000),
            ),
        );
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic = undefined;
        }
    }

    setMasterVolume(volume: number) {
        this.masterGain.gain.value = volume;
    }

    setMusicVolume(volume: number) {
        this.musicGain.gain.value = volume;
    }

    setSfxVolume(volume: number) {
        this.sfxGain.gain.value = volume;
    }
}
