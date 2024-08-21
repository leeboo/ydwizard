export default class Ydwizard {
    static setLang(lang: string): void;
    /**
     * 开启设置模式
     */
    static startSetting(): void;
    /**
     * 开启向导模式
     *
     * @param setting
     * @param quitCallback
     */
    static start(setting: any, quitCallback?: null): void;
}
